import React, { Component } from 'react';
import ConversationListItem from '../ConversationListItem';
import { connect } from 'react-redux';
import {orderBy, uniq, head, find} from 'lodash';

import './ConversationList.css';

import {getSearchMessageText} from "../../reducers/searchMessageText";
import {getSendLocationStatus} from '../../reducers/sendLocation';
import {getSendCryptoStatus} from '../../reducers/sendCrypto';
import {getSendTextStatus} from '../../reducers/sendText';

import {MY_USER_ID}  from '../../services/myUserInfo';
import fetchUsrInfo from '../../services/fetchUsrInfo';

import fetchMessagesFromUser from "../../services/fetchMessagesFromUser";
import letterGIconUrl from "../../services/letterGIconUrl";

class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
    this.MY_USER_ID = MY_USER_ID;
    Array.prototype.uniq = function() {
      return uniq(this);
    };
    Array.prototype.orderBy = function (...cond) {
      return orderBy(this, ...cond);
    };
    Array.prototype.head = function () {
      return head(this);
    };
    Array.prototype.find = function (...args) {
      return find(this, ...args);
    };
  }

   _getLastMessageAndTimeStampBy(sessionId) {
    this.messages.forEach(m=>{
      m.timestamp = new Date(m.timestamp);
    });
    let lastMessage = this.messages && this.messages.filter(m=>m.author == sessionId ||
        m.recipient == sessionId).orderBy('timestamp', 'desc').head();
    return [lastMessage.message, lastMessage.timestamp];
  }

  componentDidMount() {
    this.messages = JSON.parse(window.localStorage.getItem("messages"));
    if  (!this.messages || !this.messages.length) {
      //TODO: mock stub
      this.messages =  fetchMessagesFromUser();
      window.localStorage.setItem("messages", JSON.stringify(this.messages));
    }
    this._getConversations().then(conversations=>{
      this.setState({
        conversations
      });
    });
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (JSON.stringify(nextProps.sendTextStatus) !== JSON.stringify(this.props.sendTextStatus)) {
      let conversations = this.state.conversations;
      let c = conversations.find(['id', nextProps.sendTextStatus.conversationId]);
      if (c) {
        c.text = nextProps.sendTextStatus.latestMessage;
        c.timestamp = nextProps.sendTextStatus.timestamp;
        this.setState({
          conversations
        });
      } else if (nextProps.sendTextStatus.conversationId)  {
        const {conversationId, latestMessage, timestamp} = nextProps.sendTextStatus;
        this.setState({
          conversations: [
              ...conversations, {
              photo: letterGIconUrl,
              name: 'Group Chat',
              id: conversationId,
              text: latestMessage,
              timestamp,
            }
          ]
        })
      }
    }

  }

  _getConversations() {
    let sessionIds = [];
    if (this.messages) {
      for (let m of this.messages) {
        if (m.author != this.MY_USER_ID) {
          sessionIds.push(m.author+'');
        }
        if (m.recipient != this.MY_USER_ID) {
          sessionIds.push(m.recipient+'');
        }
      }

      //TODO: add group chat icons
      //sessionIds == ["1", "2", "2", "1", "2", "3", "2", "3", "1", "3", "1", "1", "2", "2", "2", "3", "3", "1", "1", "1", "1", "1", "3,30,88", "3,30,88"]

      let oneToOneSessionIds = sessionIds.uniq().filter(s=>{
        return s.split(',').length === 1
      });

      let groupChatSessionIds = sessionIds.uniq().filter(s=>{
        return s.split(',').length > 1
      });

      let usrPromises = oneToOneSessionIds.map((sessionId)=>{
          return fetchUsrInfo(sessionId);
      });

      let results = [];

      return Promise.all(usrPromises).then(usrs=>{
        let oneToOneResults = usrs.map(u=>{
          const {photo, name, id} = u;
          let text = this._getLastMessageAndTimeStampBy(u.id)[0] || "";
          let timestamp = this._getLastMessageAndTimeStampBy(u.id)[1] || "";
          return {
            photo,
            name,
            id,
            text,
            timestamp
          }
        });
        debugger
        let groupChatResults = groupChatSessionIds.map(g=>{
          //TODO: change
          let text = this._getLastMessageAndTimeStampBy(g)[0] || "";
          let timestamp = this._getLastMessageAndTimeStampBy(g)[1] || "";
          return {
            id: g,
            name: "Group chat",
            photo: letterGIconUrl,
            text,
            timestamp
          }
        });
        return oneToOneResults.concat(groupChatResults);
      });
    }
  };

  render() {
    return (
      <div className="conversation-list" key={"conversation-list"+ this.state.conversations.length + this.props.sendTextStatus.latestMessage + this.props.sendTextStatus.timestamp } >
        {/*TODO: make search bar trigger by pull down*/}
        {/*<ConversationSearch />*/}
        {
          this.state.conversations && this.state.conversations.orderBy('timestamp', 'desc').map(conversation => {
            // .filter(conversation=>conversation.text.match(this.props.searchMessageText))
             return (
               <ConversationListItem
                 key={conversation.id+conversation.text}
                 data={conversation}
                 conversations={this.state.conversations}
               />
             )
          }
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchMessageText: getSearchMessageText(state),
  locationStatus: getSendLocationStatus(state),
  sendCryptoStatus: getSendCryptoStatus(state),
  sendTextStatus: getSendTextStatus(state)
});

export default connect(
  mapStateToProps,
  {}
)(ConversationList);