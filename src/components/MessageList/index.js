import React, { Component } from 'react';
import Compose from '../Compose';
import Toolbar from '../Toolbar';
import Message from '../Message';
import moment from 'moment';
import {Dialog, ToolbarButton} from 'react-onsenui';
import './MessageList.css';
import "ionicons/dist/css/ionicons.css";

import { connect } from 'react-redux';
import {getConversationID} from '../../reducers/goToConversation';

//TODO: mock stub. to be replaced.
const MY_USER_ID = 'apple';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      dialogOpen: false,
    };
  }

  postNewComposedContent(composedContents) {
      let id = this.state.messages.length+1;
      this.setState({
        ...this.state,
        messages: this.state.messages.concat([{
          id,
          author: 'apple',
          message: composedContents,
          timestamp: new Date().getTime()
        }])
      })
  }

  componentDidMount() {
    this.messageListContainer.scrollIntoView(false);
  }



    //TODO: mock stub. to be replaced.
  getMessages({conversationId}) {
      //TODO: mock stub. to be replaced by websock connected array.
      let messages = [
          {
              id: 1,
              author: '1',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              timestamp: new Date().getTime()
          },
          {
              id: 2,
              author: '2',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
          {
              id: 3,
              author: '2',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              timestamp: new Date().getTime()
          },
          {
              id: 4,
              author: 'apple',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
          {
              id: 5,
              author: 'apple',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              timestamp: new Date().getTime()
          },
          {
              id: 6,
              author: 'apple',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
          {
              id: 7,
              author: '2',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              timestamp: new Date().getTime()
          },
          {
              id: 8,
              author: '3',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
          {
              id: 9,
              author: 'apple',
              message: 'Hello world! This is a long message that will hopefully get wrapped by our message bubble component! We will see how well it works.',
              timestamp: new Date().getTime()
          },
          {
              id: 10,
              author: '3',
              message: 'It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!',
              timestamp: new Date().getTime()
          },
      ];
      let filterMessages = (messages, filter) => {
          if (!filter) {
              return messages;
          } else {
              return messages.filter((m) => {
                  if (m.author == filter) {
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
        />

        <Dialog
          isOpen={this.state.dialogOpen}
          onCancel={this.toggleDialog.bind(this)}
          cancelable>
            <ToolbarButton key="audio" icon="ion-ios-images" />
            <ToolbarButton key="photo" icon="ion-ios-camera" />
            <ToolbarButton key="emoji" icon="ion-md-happy" />
            <ToolbarButton key="games" icon="ion-ios-location" />
            <ToolbarButton key="image" icon="ion-logo-bitcoin" />
            <ToolbarButton key="person" icon="ion-ios-person" />
            <ToolbarButton key="document" icon="ion-ios-document" />

        </Dialog>
      </div>


    );
  }
}

const mapStateToProps = (state, {params}) => {
    const conversationId = getConversationID(state);
    return {
        conversationId
    }
};

export default connect(
  mapStateToProps
)(MessageList);