import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import Message from '../Message';
import moment from 'moment';
import {Dialog, ToolbarButton, List, ListItem} from 'react-onsenui';
import './MessageList.css';
import "ionicons/dist/css/ionicons.css";
import 'emoji-mart/css/emoji-mart.css';
import { Picker} from 'emoji-mart'

import { connect } from 'react-redux';
//selectors
import {getConversationID} from '../../reducers/goToConversation';
import {getSendCryptoStatus} from '../../reducers/sendCrypto';
import {getSelectedEmoji} from '../../reducers/selectEmoji';

//action creators
import {sendCryptos} from '../../actions/actionCreators/sendCryptos';
import {selectEmoji} from '../../actions/actionCreators/selectEmoji';

//TODO: mock stub. to be replaced.
//TODO: put all mocks into service
const MY_USER_ID = 'apple';
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
          emojiDialogOpen: false
      };
      this.emojiPickerEl = {
          offsetParent: null
      };
  }

  postNewComposedContent(composedContents) {
      let id = this.state.messages.length+1;
      this.setState({
        ...this.state,
        messages: this.state.messages.concat([{
          id,
          author: MY_USER_ID,
          message: composedContents,
          timestamp: new Date().getTime()
        }])
      })
  }

  componentDidMount() {
    this.messageListContainer.scrollIntoView(false);
  }

  getMessages({conversationId}) {
      //TODO: mock stub. to be replaced by websock connected array.
      let messages = [
          {
              id: 1,
              author: '1',
              recipient: 'apple',
              message: 'hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 2,
              author: '2',
              recipient: 'apple',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 3,
              author: '2',
              recipient: 'apple',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 4,
              author: 'apple',
              recipient: '1',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 5,
              author: 'apple',
              recipient: '2',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 6,
              author: 'apple',
              recipient: '3',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 7,
              author: '2',
              recipient: 'apple',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 8,
              author: '3',
              recipient: 'apple',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 9,
              author: 'apple',
              recipient: '1',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              messageForm: 'text',
              timestamp: new Date().getTime()
          },
          {
              id: 10,
              author: '3',
              recipient: 'apple',
              messageForm: 'text',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
      ];
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

      console.log("nextProps", nextProps);
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

  render() {
    return(
      <div className="message-list">
        <Toolbar
          title=""
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
            <ToolbarButton key="audio" icon="ion-ios-images" />
            <ToolbarButton key="photo" icon="ion-ios-camera" />
            <ToolbarButton key="emoji" icon="ion-md-happy" onClick={this.toggleEmojiDialog.bind(this)}/>
            <ToolbarButton key="games" icon="ion-ios-location" />
            <ToolbarButton key="image" icon="ion-logo-bitcoin" onClick={this.toggleSendCryptoDialog.bind(this)} />
            <ToolbarButton key="person" icon="ion-ios-person" />
            <ToolbarButton key="document" icon="ion-ios-document" />
        </Dialog>

          <Dialog isOpen={this.state.emojiDialogOpen} onCancel={this.toggleEmojiDialog.bind(this)} cancelable >
              <Picker set='apple' onClick={(emoji) => this.selectEmoji.bind(this)(emoji)} title='Pick your emoji…' emoji='point_up'/>
          </Dialog>

          <Dialog isOpen={this.state.sendCryptoDialogOpen} onCancel={this.toggleSendCryptoDialog.bind(this)} cancelable>
              <ons-list>
                  {
                      Object.keys(CRYPTO_PORTFOLIO).map(crypto=>{
                          return (
                              <div>
                              <ons-list-header>{crypto}</ons-list-header>
                              {CRYPTO_PORTFOLIO[crypto].map((account, idx)=>{
                                  return (
                                      <ons-list-item key={"send-crypto-"+crypto+idx} onClick={()=>this.props.sendCryptos(crypto, account)}>
                                          <div className="center">
                                              {account.addr}
                                          </div>
                                          <div className="right">
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

const mapStateToProps = (state, {params}) => {
    console.log("state ", state);
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