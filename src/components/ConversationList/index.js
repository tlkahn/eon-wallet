import React, { Component } from 'react';
import ConversationListItem from '../ConversationListItem';
import { connect } from 'react-redux';
import './ConversationList.css';
import {getSearchMessageText} from '../../reducers/searchMessageText';
import {MY_USER_ID}  from '../../services/myUserInfo';
import fetchUsrInfo from '../../services/fetchUsrInfo';
import {orderBy, uniq, head} from 'lodash';
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
    };
    Array.prototype.head = function () {
      return head(this);
    }
  }

   _getLastMessageBy(sessionId) {
    debugger
    this.messages.forEach(m=>{
      m.timestamp = new Date(m.timestamp);
    });
    return this.messages && this.messages.filter(m=>m.author == sessionId ||
        m.recipient == sessionId).orderBy('timestamp', 'desc').head().message;
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
          let text = this._getLastMessageBy(u.id) || "";
          return {
            photo,
            name,
            id,
            text
          }
        });
        let groupChatResults = groupChatSessionIds.map(g=>{
          //TODO: change
          let text = this._getLastMessageBy(g) || "";
          return {
            id: g,
            name: "Group chat",
            photo: "https://image.flaticon.com/icons/svg/115/115935.svg",
            text
          }
        });
        return oneToOneResults.concat(groupChatResults);
      });
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