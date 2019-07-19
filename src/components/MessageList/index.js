import React, { Component } from 'react';
import {debounce, throttle} from 'lodash';
import { connect } from 'react-redux';
//components
import Compose from '../Compose';
import Message from '../Message';
import moment from 'moment';
import {Page, Dialog, ToolbarButton, List, ListItem, Button, AlertDialog, AlertDialogButton, Range} from 'react-onsenui';
import './MessageList.css';
import "ionicons/dist/css/ionicons.css";
import 'emoji-mart/css/emoji-mart.css';
import { Picker} from 'emoji-mart';
import {MESSAGE_FORM} from "../../config/constants";
import ReactCardFlip from 'react-card-flip';
import GroupChatMemberPanel from '../GroupChatMemberPanel';
//selectors
import {getConversationID} from '../../reducers/goToConversation';
import {getSelectedEmoji} from '../../reducers/selectEmoji';
import {getGroupChatUsrIds} from '../../reducers/goToGroupChat';
import {getSendTextStatus} from "../../reducers/sendText";
import {getSendCryptoToHubResult} from "../../reducers/sendCryptoToHub";
import {getWallets} from "../../reducers/createNewWallet";
//action creators
import {selectEmoji} from '../../actions/actionCreators/selectEmoji';
import {sendLocation} from '../../actions/actionCreators/sendLocation';
import {sendText} from '../../actions/actionCreators/sendText';
import {sendCryptoToHub} from '../../actions/actionCreators/sendCryptoToHub';
//services
import {MY_USER_ID} from '../../services/myUserInfo';
//constants
//utils
import '../../utils/aux';
import bnet from '../../services/network';

const CONVERSATION_TYPES = Object.freeze({
    individual: Symbol("individual"),
    groupChat: Symbol("groupChat"),
});

class MessageList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          messages: [],
          filteredMessages:[],
          dialogOpen: false,
          sendCryptoDialogOpen: false,
          cryptoRangeDialogOpen: false,
          emojiDialogOpen: false,
          locationDialogOpen: false,
          locationPickedP: false,
          locationPickedObj: {},
          cryptoToBeSentCoinName: 0,
          cryptoToBeSentFromAddr: 0,
          cryptoToBeSentMax: 0,
          cryptoToBeSent: 0,
          currentWalletIdx: null,
          cryptoToBeSentRecipient: null,
          sendCryptoDialogFlipped: false,
          conversationType: CONVERSATION_TYPES.individual,
          infoDialogOpen: false
      };
      window.addEventListener('message', (event)=> {
          var loc = event.data;
          if (loc && loc.module == 'locationPicker') {
              console.log('location', loc);
              this.setState({
                  ...this.state,
                  locationPickedObj: loc,
                  locationPickedP: true
              })
          }
      }, false);
  }

  _appendMessageToQueue(message, cb) {
      let messages = this.state.messages.concat([message]);
      let filteredMessages = this._filterMessages(messages, this.props.conversationId);
      window.localStorage.setItem("messages", JSON.stringify(messages));
      this.setState({
          ...this.state,
          messages,
          filteredMessages
      }, cb);
  }

  postNewComposedContent(composedContents) {
      let id = this.state.messages.length+1;
      if (composedContents.trim().length > 1) {
          const message = {
              id,
              author: MY_USER_ID,
              recipient: this.props.conversationId,
              message: composedContents,
              timestamp: new Date().getTime(),
              messageForm: MESSAGE_FORM.text
          };
          this._appendMessageToQueue(message);
          this.props.sendText({
              id,
              author: MY_USER_ID,
              recipient: this.props.conversationId,
              conversationId: this.props.conversationId,
              message: composedContents,
              timestamp: new Date().getTime(),
              messageForm: MESSAGE_FORM.text
          });
      }
  }

  postLocationContent(){
      let id = this.state.messages.length+1;
      let messages = this.state.messages.concat([{
          id,
          author: MY_USER_ID,
          location: this.state.locationPickedObj,
          timestamp: new Date().getTime(),
          messageForm: MESSAGE_FORM.location,
          message: "You just shared a location.",
          recipient: this.props.conversationId,
      }]);
      let filteredMessages = this._filterMessages(messages, this.props.conversationId);
      this.setState({
          ...this.state,
          id,
          author: MY_USER_ID,
          recipient: this.props.conversationId,
          locationPickedP: false,
          locationDialogOpen: false,
          dialogOpen: false,
          messages,
          filteredMessages
      });
      this.props.sendLocation({
          id,
          author: MY_USER_ID,
          location: this.state.locationPickedObj,
          timestamp: new Date().getTime(),
          messageForm: MESSAGE_FORM.location,
          message: "You just shared a location.",
          recipient: this.props.conversationId,
          conversationId: this.props.conversationId
      });
  }

  postImageContent = debounce((imageFileUrl) => {
      let id = this.state.messages.length+1;
      let messages = this.state.messages.concat([{
              id,
              author: MY_USER_ID,
              recipient: this.props.conversationId,
              imageUrl: imageFileUrl,
              timestamp: new Date().getTime(),
              messageForm: MESSAGE_FORM.image,
              message: "You just sent an image"
          }]);
      let filteredMessages = this._filterMessages(messages, this.props.conversationId);
      this.setState({
          ...this.state,
          id,
          dialogOpen: false,
          messages,
          filteredMessages
      })});

  componentDidMount() {
    this.messageListContainer.scrollIntoView(false);
    this.wallets = this.props.wallets || {};
  }

  _filterMessages(messages, f) {
    if (!f) {
        return messages;
    } else {
      return messages.filter(m=>(m.author == f &&
        m.recipient == MY_USER_ID)||
        (m.recipient == f &&
            m.author == MY_USER_ID));
    }
  };

  getMessages(conversationId) {
      let messages = JSON.parse(window.localStorage.getItem('messages'));
      let filteredMessages = this._filterMessages(messages, conversationId);
      this.setState(prevState => {
          return {
              ...prevState,
              messages,
              filteredMessages
          }
      });
  }

  componentDidUpdate() {
    this.messageListContainer.scrollIntoView(false);
    window.localStorage.setItem('messages', JSON.stringify(this.state.messages));
    console.log("this.props.wallets", this.props.wallets);
  }

  componentWillReceiveProps(nextProps, nextContext) {
      this.getMessages(nextProps.conversationId, MY_USER_ID);
      if (!this.props.groupChatUsrIds && nextProps.groupChatUsrIds || this.props.groupChatUsrIds !== nextProps.groupChatUsrIds) {
          let sessionId = nextProps.groupChatUsrIds+'';
          this.setState({
              conversationType: CONVERSATION_TYPES.groupChat,
              messages: [...this.state.messages, {
                  id: this.state.messages.length + 1,
                  type: 'update',
                  updateText: 'You entered into group chat with ' + nextProps.groupChatUsrIds.join(' '),
                  recipient: MY_USER_ID,
                  author: sessionId,
                  groupMembers: nextProps.groupChatUsrIds,
                  timestamp: new Date().getTime(),
                  message: 'You entered into group chat with ' + nextProps.groupChatUsrIds.join(' '),
              }]
          });
          let filteredMessages = this._filterMessages(this.state.messages);
          this.setState({
              filteredMessages
          });
          this.props.msg.updateSessionId({currentSessionId: sessionId});
      }
      
      if (!this.props.sendCryptoToHubResult && nextProps.sendCryptoToHubResult || this.props.sendCryptoToHubResult !== nextProps.sendCryptoToHubResult) {
        console.log("sendCryptoToHubResult", nextProps.sendCryptoToHubResult);
      }
  }
  
  get cryptoPortfolio() {
    let wallets = this.props.wallets || [];
    let coinTypes = wallets.map(w=>w.__coinType).uniq();
    let result = {};
    for (let ct of coinTypes) {
      result[ct] = wallets.filter({coinType: ct}).map(async w=>{
        let coins = await w.coins();
        return {
          addr: w.address,
          balance: coins
        };
      });
    }
    return result;
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.filteredMessages.length;
    let messages = [];
    while (i < messageCount) {
      let previous = this.state.filteredMessages[i - 1];
      let current = this.state.filteredMessages[i];
      if (typeof current.type == 'undefined') {
          let next = this.state.filteredMessages[i + 1];
          let isMine = current.author === MY_USER_ID;
          let currentMoment = moment(current.timestamp);
          let prevBySameAuthor = false;
          let nextBySameAuthor = false;
          let startsSequence = true;
          let endsSequence = true;
          let showTimestamp = true;

          if (previous) {
              let previousMoment = moment(previous.timestamp);
              let previousDuration = moment.duration(currentMoment.diff(previousMoment));
              prevBySameAuthor = previous.author === current.author;

              if (prevBySameAuthor && previousDuration.as('hours') < 1) {
                  startsSequence = false;
              }

              if (previousDuration.as('hours') < 1) {
                  showTimestamp = false;
              }
          }

          if (next) {
              let nextMoment = moment(next.timestamp);
              let nextDuration = moment.duration(nextMoment.diff(currentMoment));
              nextBySameAuthor = next.author === current.author;

              if (nextBySameAuthor && nextDuration.as('hours') < 1) {
                  endsSequence = false;
              }
          }

          messages.push(
              <Message
                  key={i+"@"+this.state.messages.length}
                  isMine={isMine}
                  startsSequence={startsSequence}
                  endsSequence={endsSequence}
                  showTimestamp={showTimestamp}
                  data={current}
              />
          )
      }
      else if (current.type === 'update') {
          messages.push(
              <div className="update-text" key={`update-text-${i}`}>
                  {current.updateText}
              </div>
          );
      }
      i += 1;
    }

    return messages;
  }

  toggleDialog() {
    this.setState({
      dialogOpen: !this.state.dialogOpen
    });
  }

  toggleSendCryptoDialog() {
      this.setState({
          ...this.state,
          dialogOpen: false,
          sendCryptoDialogFlipped: false,
          sendCryptoDialogOpen: !this.state.sendCryptoDialogOpen,
          cryptoToBeSent: 0
      })
  }

  closeSendCryptoDialog() {
      this.setState({
          ...this.state,
          dialogOpen: false,
          sendCryptoDialogOpen: false,
          sendCryptoDialogFlipped: false,
          cryptoToBeSent: 0
      });
  }

  flipSendCryptoDialog(crypto, account, idx) {
      this.setState({
          sendCryptoDialogFlipped: !this.state.sendCryptoDialogFlipped,
          cryptoToBeSentMax: account.balance,
          cryptoToBeSentCoinName: crypto,
          cryptoToBeSentFromAddr: account.addr,
          currentWalletIdx: idx
      });
  }

  toggleEmojiDialog() {
    this.setState({
          ...this.state,
          dialogOpen: false,
          emojiDialogOpen: !this.state.emojiDialogOpen
      })
  }

  selectEmoji(emoji) {
    this.props.selectEmoji(emoji);
  }

  toggleLocationDialog() {
      this.setState({
          ...this.state,
          locationDialogOpen: !this.state.locationDialogOpen
      });
  }

  toggleInfoDialog() {
      this.setState({
          infoDialogOpen: !this.state.infoDialogOpen,
          dialogOpen: false
      })
  }

  closeInfoDialog() {
      this.setState({
          dialogOpen: false,
          infoDialogOpen: false
      })
  }

  handleAlertDialogCancel() {
      this.setState({
          ...this.state,
          locationPickedP: !this.state.locationPickedP
      })
  }

  handleAlertDialogOk() {
      this.postLocationContent();
  }

  openCamera() {
      this.imageInput = document.querySelector('#camera-input');
      this.imageInput.addEventListener('change', (ev)=>{
          ev.preventDefault();
          let imageFile = ev.target.files[0];
          console.log(imageFile);
          this.postImageContent(URL.createObjectURL(imageFile));
      });
      this.imageInput.click();
  }
  
  getCryptoSendingFee(coinType) {
    switch (coinType) {
      case 'BTC':
        return new Promise((resolve, reject)=> {
          bnet.api.getFee().then((fee) => {
            resolve(fee);
          }).catch((e) => {
            reject(e);
          });
      });
      default:
        break
    }
  }

  async sendCrypto() {
      const message = {
          id: this.state.messages.length + 1,
          author: MY_USER_ID,
          recipient: this.props.conversationId,
          conversationId: this.props.conversationId,
          message: `You sent ${this.state.cryptoToBeSent * this.state.cryptoToBeSentMax / 100} ${this.state.cryptoToBeSentCoinName} to ${this.props.conversationId}`,
          timestamp: new Date().getTime(),
          messageForm: MESSAGE_FORM.text
      };
      this.props.sendText(message);
      let fee = await this.getCryptoSendingFee(this.state.cryptoToBeSentCoinName);
      this.props.sendCryptoToHub({
        amount: this.state.cryptoToBeSent * this.state.cryptoToBeSentMax / 100,
        coinType: this.state.cryptoToBeSentCoinName,
        wallet: this.props.wallets[this.state.currentWalletIdx],
        fee
      });
      
      this._appendMessageToQueue(message, this.closeSendCryptoDialog.bind(this));
  }
  
  render() {
    return(
    <Page key={"message-list-with-len-"+this.state.messages.length}>
      <div className="message-list">
        <div className="message-list-container" ref={(messageListContainer)=>{
          this.messageListContainer = messageListContainer;
        }}>{this.renderMessages()}</div>

        <Compose
            onSubmit={this.postNewComposedContent.bind(this)}
            more={this.toggleDialog.bind(this)}
            receivedEmoji={this.props.selectedEmoji}
            stopReceivingEmoji={!this.state.emojiDialogOpen}
        />

        {/*Dialogus below*/}

          <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={this.toggleDialog.bind(this)}
          cancelable>
            <ons-row>
                <ons-col width="20%">
                    <ToolbarButton key="photo" icon="ion-ios-camera" onClick={this.openCamera.bind(this)} >
                        <input id="camera-input" type="file" accept="image/*" style={{display:"none"}}/>
                    </ToolbarButton>
                </ons-col>
                <ons-col width="20%">
                    <ToolbarButton key="emoji" icon="ion-md-happy" onClick={this.toggleEmojiDialog.bind(this)}/>
                </ons-col>
                <ons-col width="20%">
                    <ToolbarButton key="location" icon="ion-ios-location" onClick={this.toggleLocationDialog.bind(this)}/>
                </ons-col>
                <ons-col width="20%">
                    <ToolbarButton key="image" icon="ion-logo-bitcoin" onClick={this.toggleSendCryptoDialog.bind(this)} />
                </ons-col>
                <ons-col width="20%">
                    <ToolbarButton key="person" icon="ion-ios-person" />
                </ons-col>
            </ons-row>
            <ons-row>
                <ons-col>
                    <ToolbarButton width="20%" key="document" icon="ion-ios-document" />
                </ons-col>
                <ons-col>
                    <ToolbarButton width="20%" key="info" icon="ion-ios-information-circle-outline" onClick={this.toggleInfoDialog.bind(this)}/>
                </ons-col>
                <ons-col>
                    <ToolbarButton width="20%" key="video" icon="ion-ios-videocam" />
                </ons-col>
                <ons-col>
                    <ToolbarButton width="20%" key="phone" icon="ion-ios-call" />
                </ons-col>
                <ons-col>
                    <ToolbarButton width="20%" key="voice" icon="ion-ios-pulse" />
                </ons-col>
            </ons-row>
          </Dialog>

          <Dialog isOpen={this.state.emojiDialogOpen} onCancel={this.toggleEmojiDialog.bind(this)} cancelable >
              <Picker set='apple' onClick={(emoji) => this.selectEmoji.bind(this)(emoji)} title='Pick your emoji…' emoji='point_up'/>
          </Dialog>

          <Dialog className="sendLocationDialog" isOpen={this.state.locationDialogOpen} onCancel={this.toggleLocationDialog.bind(this)} cancelable >
              <iframe id="mapPage" width="100%" height="100%" frameBorder="0"
                      src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=2GTBZ-QOKKD-7GR4W-PTM6I-5D53E-CFBNA&referer=myapp">
                    </iframe>
          </Dialog>

          <AlertDialog isOpen={this.state.locationPickedP} onCancel={this.handleAlertDialogCancel.bind(this)} cancelable>
              <div className="alert-dialog-title">Confirm</div>
              <div className="alert-dialog-content">
                  Send {this.state.locationPickedObj.poiname} to {this.props.conversationId}?
              </div>
              <div className="alert-dialog-footer">
                  <Button onClick={this.handleAlertDialogCancel.bind(this)} className="alert-dialog-button">
                      Cancel
                  </Button>
                  <Button onClick={this.handleAlertDialogOk.bind(this)} className="alert-dialog-button">
                      Ok
                  </Button>
              </div>
          </AlertDialog>

          <Dialog isOpen={this.state.sendCryptoDialogOpen} onCancel={this.closeSendCryptoDialog.bind(this)} cancelable>
              <ReactCardFlip isFlipped={this.state.sendCryptoDialogFlipped} flipDirection="vertical">
                  <div key="front" className="crypto-list-wrapper">
                      <ons-list>
                          {
                              Object.keys(this.cryptoPortfolio).map((crypto, idx)=>{
                                  return (
                                      <div key={"crypto-wrapper-"+idx}>
                                          <ons-list-header>{crypto}</ons-list-header>
                                          {this.cryptoPortfolio[crypto].map((account, idx)=>{
                                              return (
                                                  <ons-list-item key={"send-crypto-"+crypto+idx} onClick={()=>this.flipSendCryptoDialog(crypto, account, idx)}>
                                                      <div className="center" key={"send-crypto-"+crypto+idx+"-div-center"}>
                                                          {account.addr}
                                                      </div>
                                                      <div className="right" key={"send-crypto-"+crypto+idx+"-div-right"}>
                                                          {account.balance}
                                                      </div>
                                                  </ons-list-item>
                                              )
                                          })}
                                      </div>
                                  )
                              })
                          }
                      </ons-list>
                  </div>
                  <div key="back" className="crypto-slider-wrapper">
                      <Range modifier="material"
                             value={this.state.cryptoToBeSent}
                             onChange={
                                 debounce((event) => {
                                     this.setState({cryptoToBeSent: parseInt(event.target.value)});
                                     }, 300, {trailing: true}
                                 )
                             }
                      />
                      <div>
                          <span className="crypto-span">
                              {this.state.cryptoToBeSent * this.state.cryptoToBeSentMax / 100}
                          </span>
                          <span>
                              {this.state.cryptoToBeSentCoinName} from {this.state.cryptoToBeSentFromAddr}
                          </span>
                      </div>
                      <div>
                          <Button modifier='quiet' onClick={this.sendCrypto.bind(this)}>
                              Send
                          </Button>
                      </div>
                       <div className="send-crypto-status">
                          <div  className="send-crypto-status-start"
                                style={{display: typeof this.props.sendCryptoStatus !== 'undefined' &&
                                    this.props.sendCryptoStatus.status !== 'success' ? 'inline-block' : 'none'}}>
                              Loading...
                              <ons-icon
                                  icon="ion-ios-refresh" spin />
                          </div>

                      </div>
                  </div>
              </ReactCardFlip>
          </Dialog>

          <Dialog isOpen={this.state.infoDialogOpen} onCancel={this.closeInfoDialog.bind(this)}>
              <div>
                  {
                      this.state.conversationType === CONVERSATION_TYPES.individual ?
                      this.props.conversationId:
                      <GroupChatMemberPanel memberIds={this.props.groupChatUsrIds} />
                  }

              </div>
          </Dialog>

        {/* Dialogs end   */}

      </div>
    </Page>
    );
  }
}

const mapStateToProps = (state) => {
    // console.log("state ", state);
    const conversationId = getConversationID(state);
    const selectedEmoji = getSelectedEmoji(state);
    const groupChatUsrIds = getGroupChatUsrIds(state);
    // const sendTextStatus = getSendTextStatus(state);
    const sendCryptoToHubResult = getSendCryptoToHubResult(state);
    const wallets = getWallets(state).wallets;
    return {
        conversationId,
        selectedEmoji,
        groupChatUsrIds,
        sendCryptoToHubResult,
        wallets
    }
};

const mapDispatchToProps = {
  selectEmoji,
  sendLocation,
  sendText,
  sendCryptoToHub,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageList);