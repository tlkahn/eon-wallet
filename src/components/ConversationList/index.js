import React, { Component } from 'react';
import ConversationListItem from '../ConversationListItem';
import { connect } from 'react-redux';
import './ConversationList.css';
import {getSearchMessageText} from '../../reducers/searchMessageText';
import {MY_USER_ID}  from '../../services/myUserInfo';
import fetchUsrInfo from '../../services/fetchUsrInfo';
import {orderBy, uniq} from 'lodash';
import fetchMessagesFromUser from "../../services/fetchMessagesFromUser";

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
    }
  }

   _getLastMessageBy(sessionId) {
    return this.messages && this.messages.filter(m=>m.author == sessionId ||
        m.recipient == sessionId).orderBy('timestamp')[0].message;
  }

  componentDidMount() {
    this.messages = JSON.parse(window.localStorage.getItem("messages"));
    if  (!this.messages || !this.messages.length) {
      this.messages =  fetchMessagesFromUser();
      window.localStorage.setItem("messages", JSON.stringify(this.messages));
    }
    this._getConversations().then(conversations=>{
      this.setState({
        conversations
      });
    });
  }

  _getConversations() {
    let sessionIds = [];
    if (this.messages) {
      for (let m of this.messages) {
        if (m.author !== this.MY_USER_ID) {
          sessionIds.push(m.author);
        }
        if (m.recipient !== this.MY_USER_ID) {
          sessionIds.push(m.recipient);
        }
      }

      let usrPromises = sessionIds.uniq().map((sessionId)=>{
          return fetchUsrInfo(sessionId);
      });

      return Promise.all(usrPromises).then(usrs=>{
        return usrs.map(u=>{
          const {photo, name, id} = u;
          let text = this._getLastMessageBy(u.id) || "";
          return {
            photo,
            name,
            id,
            text
          }
        })
      })
    }
  };

  render() {
    return (
      <div className="conversation-list">
        {/*TODO: make search bar trigger by pull down*/}
        {/*<ConversationSearch />*/}
        {
          this.state.conversations && this.state.conversations.map(conversation =>
              // .filter(conversation=>conversation.text.match(this.props.searchMessageText))
            <ConversationListItem
              key={conversation.id}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchMessageText: getSearchMessageText(state)
});

export default connect(
  mapStateToProps,
  {}
)(ConversationList);