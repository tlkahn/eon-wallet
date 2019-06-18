import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import axios from 'axios';
import { connect } from 'react-redux';
import './ConversationList.css';
import {getSearchMessageText} from '../../reducers/searchMessageText';
import randomWords from 'random-words';


class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
    //TODO: mock stub here. Read from local db. should be sessions.json
    this.SESSION_URL='http://localhost:3001/users.json';
    this.getConversations();
  }

  //TODO: mock stub
  getConversations = () => {
    axios.get(this.SESSION_URL).then(response => {
      this.setState(prevState => {
        let conversations = response.data.map(session => {
          return {
            photo: session.photo,
            name: `${session.name}`,
            id: session.id,
            text: randomWords(Math.floor(Math.random()*100)).join(" ") // most recent message in a session
          };
        });

        return { ...prevState, conversations };
      });
    });
  };

  render() {
    return (
      <div className="conversation-list">
        {/*TODO: make search bar trigger by pull down*/}
        {/*<ConversationSearch />*/}
        {
          this.state.conversations.filter(conversation=>conversation.text.match(this.props.searchMessageText)).map(conversation =>
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