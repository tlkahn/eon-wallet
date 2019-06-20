import React, { Component } from 'react';
import shave from 'shave';
import './ConversationListItem.css';
import { connect } from 'react-redux';
import {goToConversation} from "../../actions/actionCreators/goToConversation";
import {sendCryptos} from "../../actions/actionCreators/sendCryptos";

class ConversationListItem extends Component {
  componentDidMount() {
    shave('.conversation-snippet', 20);
  }

    gotoMessages() {
        let id = this.props.data.id;
        if (typeof this.props.goToConversation !== 'undefined') {
            this.props.goToConversation(id);
        }
        let ev = new CustomEvent("openSideMenu", this.props.data);
        document.dispatchEvent(ev);

    }

    render() {
    const { photo, name, text } = this.props.data;
    return (
      <div className="conversation-list-item" onClick={this.gotoMessages.bind(this)}>
        <img className="conversation-photo" src={photo} alt="conversation" />
        <div className="conversation-info">
          <h1 className="conversation-title">{ name }</h1>
          <p className="conversation-snippet">{ text }</p>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  {
    goToConversation,
      sendCryptos
  }
)(ConversationListItem);
