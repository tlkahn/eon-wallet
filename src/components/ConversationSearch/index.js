import React, { Component } from 'react';
import './ConversationSearch.css';
import { connect } from 'react-redux';
import {searchMessageText} from '../../actions/actionCreators/searchMessageText';

class ConversationSearch extends Component {

    constructor(props) {
        super(props);
    }

    onSearchTextChange(ev) {
        this.props.searchMessageText(ev.target.value);
    }

  render() {
    return (
      <div className="conversation-search">
        <input
          type="search"
          className="conversation-search-input"
          placeholder="Search Messages"
          onChange={this.onSearchTextChange.bind(this)}
        />
      </div>
    );
  }
}

export default connect(
  null,
  { searchMessageText }
)(ConversationSearch);