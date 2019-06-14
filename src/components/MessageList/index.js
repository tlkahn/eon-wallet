import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import Message from '../Message';
import moment from 'moment';
import {Dialog, ToolbarButton, List, ListItem, Button, AlertDialog, AlertDialogButton} from 'react-onsenui';
import './MessageList.css';
import "ionicons/dist/css/ionicons.css";
import 'emoji-mart/css/emoji-mart.css';
import { Picker} from 'emoji-mart';
import {MESSAGE_FORM} from "../../config/constants";
//redux
import { connect } from 'react-redux';
//selectors
import {getConversationID} from '../../reducers/goToConversation';
import {getSendCryptoStatus} from '../../reducers/sendCrypto';
import {getSelectedEmoji} from '../../reducers/selectEmoji';
//action creators
import {sendCryptos} from '../../actions/actionCreators/sendCryptos';
import {selectEmoji} from '../../actions/actionCreators/selectEmoji';
import {debounce} from 'lodash';
import {MY_USER_ID} from '../../services/myUserInfo';
import {fetchMessagesFromUser} from "../../services/fetchMessagesFromUser";

//TODO: mock stub. to be replaced.
//TODO: put all mocks into service
const CRYPTO_PORTFOLIO = {
    'BTC':[
        {
            addr: 'btcaddr1',
            balance: 100
        },
        {
            addr: 'btcaddr2',
            balance: 200
        }

    ],
    'ETH':[
        {
            addr: 'ethaddr1',
            balance: 100
        },
        {
            addr: 'ethaddr2',
            balance: 200
        },
    ]
};

class MessageList extends Component {
  constructor(props) {
      super(props);
      this.state = {
          messages: [],
          dialogOpen: false,
          sendCryptoDialogOpen: false,
          emojiDialogOpen: false,
          locationDialogOpen: false,
          locationPickedP: false,
          locationPickedObj: {}
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

  postNewComposedContent(composedContents) {
      if (composedContents.trim().length > 1) {
          let id = this.state.messages.length+1;
          this.setState({
              ...this.state,
              messages: this.state.messages.concat([{
                  id,
                  author: MY_USER_ID,
                  message: composedContents,
                  timestamp: new Date().getTime(),
                  messageForm: MESSAGE_FORM.text
              }])
          })
      }
  }

  postLocationContent(){
      let id = this.state.messages.length+1;
      this.setState({
          ...this.state,
          id,
          locationPickedP: false,
          locationDialogOpen: false,
          dialogOpen: false,
          messages: this.state.messages.concat([{
              id,
              author: MY_USER_ID,
              location: this.state.locationPickedObj,
              timestamp: new Date().getTime(),
              messageForm: MESSAGE_FORM.location
          }])
      });
  }

  postImageContent = debounce((imageFileUrl) => {
      let id = this.state.messages.length+1;
      this.setState({
          ...this.state,
          id,
          dialogOpen: false,
          messages: this.state.messages.concat([{
              id,
              author: MY_USER_ID,
              imageUrl: imageFileUrl,
              timestamp: new Date().getTime(),
              messageForm: MESSAGE_FORM.image
          }])
      })});

  componentDidMount() {
    this.messageListContainer.scrollIntoView(false);
  }

  getMessages({conversationId}) {
      //TODO: mock stub. to be replaced by websock connected array.
      let messages = fetchMessagesFromUser(conversationId);
      let filterMessages = (messages, f) => {
          if (!f) {
              return messages;
          } else {
              return messages.filter((m) => {
                  if ((m.author === (f+'') && m.recipient === MY_USER_ID)||(m.recipient === (f+'') && m.author === MY_USER_ID)) {
                      return m;
                  }
              });
          }
      };
      let filteredMessages = filterMessages(messages, conversationId);
      this.setState(prevState => {
          return {
              ...prevState,
              messages: filteredMessages
          }
      });
  }

  componentDidUpdate() {
    this.messageListContainer.scrollIntoView(false);
  }

  componentWillReceiveProps(nextProps) {
      this.getMessages({conversationId: nextProps.conversationId});
  }

  renderMessages() {
    let i = 0;
    let messageCount = this.state.messages.length;
    let messages = [];

    while (i < messageCount) {
      let previous = this.state.messages[i - 1];
      let current = this.state.messages[i];
      let next = this.state.messages[i + 1];
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
          key={i}
          isMine={isMine}
          startsSequence={startsSequence}
          endsSequence={endsSequence}
          showTimestamp={showTimestamp}
          data={current}
        />
      );

      // Proceed to the next message.
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
          sendCryptoDialogOpen: !this.state.sendCryptoDialogOpen
      })
  }

  closeSendCryptoDialog() {
      this.setState({
          ...this.state,
          dialogOpen: false,
          sendCryptoDialogOpen: false
      })
  }

  sendCrypto(crypto, account) {
    this.closeSendCryptoDialog();
    this.props.sendCryptos(crypto, account, this.props.conversationId);
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

  getUserName(conversationId) {
      //TODO: use service to fetch username
      return conversationId;
  }

  render() {
    return(
      <div className="message-list">
        <Toolbar
          title={this.getUserName(this.props.conversationId)}
          rightItems={[
            <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />,
            <ToolbarButton key="video" icon="ion-ios-videocam" />,
            <ToolbarButton key="phone" icon="ion-ios-call" />,
            <ToolbarButton key="voice" icon="ion-ios-pulse" />
          ]}
        />

        <div className="message-list-container" ref={(messageListContainer)=>{
          this.messageListContainer = messageListContainer;
        }}>{this.renderMessages()}</div>

        <Compose
            onSubmit={this.postNewComposedContent.bind(this)}
            more={this.toggleDialog.bind(this)}
            receivedEmoji={this.props.selectedEmoji}
            stopReceivingEmoji={!this.state.emojiDialogOpen}
        />

        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={this.toggleDialog.bind(this)}
          cancelable>
            <ToolbarButton key="photo" icon="ion-ios-camera" onClick={this.openCamera.bind(this)} >
                <input id="camera-input" type="file" accept="image/*" style={{display:"none"}}/>
            </ToolbarButton>
            <ToolbarButton key="emoji" icon="ion-md-happy" onClick={this.toggleEmojiDialog.bind(this)}/>
            <ToolbarButton key="location" icon="ion-ios-location" onClick={this.toggleLocationDialog.bind(this)}/>
            <ToolbarButton key="image" icon="ion-logo-bitcoin" onClick={this.toggleSendCryptoDialog.bind(this)} />
            <ToolbarButton key="person" icon="ion-ios-person" />
            <ToolbarButton key="document" icon="ion-ios-document" />
        </Dialog>

          <Dialog isOpen={this.state.emojiDialogOpen} onCancel={this.toggleEmojiDialog.bind(this)} cancelable >
              <Picker set='apple' onClick={(emoji) => this.selectEmoji.bind(this)(emoji)} title='Pick your emoji…' emoji='point_up'/>
          </Dialog>

          <Dialog className="sendLocationDialog" isOpen={this.state.locationDialogOpen} onCancel={this.toggleLocationDialog.bind(this)} cancelable >
              <iframe id="mapPage" width="100%" height="100%" frameBorder="0" src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=2GTBZ-QOKKD-7GR4W-PTM6I-5D53E-CFBNA&referer=myapp">
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



          <Dialog isOpen={this.state.sendCryptoDialogOpen} onCancel={this.toggleSendCryptoDialog.bind(this)} cancelable>
              <ons-list>
                  {
                      Object.keys(CRYPTO_PORTFOLIO).map((crypto, idx)=>{
                          return (
                              <div key={"crypto-wrapper-"+idx}>
                              <ons-list-header>{crypto}</ons-list-header>
                              {CRYPTO_PORTFOLIO[crypto].map((account, idx)=>{
                                  return (
                                      <ons-list-item key={"send-crypto-"+crypto+idx} onClick={()=>this.props.sendCryptos(crypto, account)}>
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
          </Dialog>
      </div>


    );
  }
}

const mapStateToProps = (state) => {
    // console.log("state ", state);
    const conversationId = getConversationID(state);
    const sendCryptoStatus = getSendCryptoStatus(state);
    const selectedEmoji = getSelectedEmoji(state);
    return {
        conversationId,
        sendCryptoStatus,
        selectedEmoji
    }
};

export default connect(
    mapStateToProps,
    {
        sendCryptos,
        selectEmoji,
    }
)(MessageList);