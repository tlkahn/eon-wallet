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
    //TODO: mock stub here
    this.USERSURL='http://localhost:3001/users.json';
    this.getConversations();
  }

  //TODO: mock stub
  getConversations = () => {
    axios.get(this.USERSURL).then(response => {
      this.setState(prevState => {
        let conversations = response.data.map(result => {
          return {
            photo: result.photo,
            name: `${result.name}`,
            id: result.id,
            text: randomWords(Math.floor(Math.random()*100)).join(" ")
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
              key={conversation.name}
              data={conversation}
            />
          )
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  // posts: getAllPosts(state),
  // isFetching: getIsFetchingPosts(state),
  // likedPostIds: getCurrentUsersLikedPostIds(state),
  // currentPage: getPostsCurrentPage(state),
  // totalPages: getPostsTotalPages(state),
  // currentUser: getCurrentUser(state),
  searchMessageText: getSearchMessageText(state)
});

export default connect(
  mapStateToProps,
  {}
)(ConversationList);