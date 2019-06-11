import React, { Component } from 'react';
import ConversationSearch from '../ConversationSearch';
import ConversationListItem from '../ConversationListItem';
import axios from 'axios';

import './ConversationList.css';

export default class ConversationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: []
    };
    //TODO: mock stub here
    this.USERSURL='http://localhost:3001/users.json';
    this.getConversations();
  }

  getConversations = () => {
    axios.get(this.USERSURL).then(response => {
      this.setState(prevState => {
        let conversations = response.data.map(result => {
          return {
            photo: result.photo,
            name: `${result.name}`,
            id: result.id,
            text: 'Hello world! This is a long message that needs to be truncated.'
          };
        });

        return { ...prevState, conversations };
      });
    });
  };

  render() {
    return (
      <div className="conversation-list">
        <ConversationSearch />
        {
          this.state.conversations.map(conversation =>
            <ConversationListItem
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}