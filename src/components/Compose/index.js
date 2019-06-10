import React, { Component } from 'react';
import './Compose.css';
import {ToolbarButton} from 'react-onsenui';
import Emoji from 'react-emoji-render';

export default class Compose extends Component {

    constructor(props) {
        super(props);
        this.state = {
            composedContents: '',
            emojiSelected: false
        };
        this.onCommentChange = (event) => this.setState({ composedContents: event.target.value });
        this.handleKeyDown = this._handleKeyDown.bind(this);
    }

    _handleKeyDown(event) {
        if (event.which === 13 && this.state.composedContents.trim().length > 0 && this.props.onSubmit) {
            this._submit();
        }
    }

    _submit() {
        this.props.onSubmit(this.state.composedContents);
        this.setState({ composedContents: '' });
        this.composedInput.blur();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (typeof nextProps.receivedEmoji !== 'undefined' && typeof nextProps.receivedEmoji.colons !== 'undefined' && !nextProps.stopReceivingEmoji) {
            if (document.querySelector(".emoji-mart") && document.querySelector(".emoji-mart").offsetParent /*TODO: dirty hack. you shouldn't do this.*/) {
                this.setState({
                composedContents: this.state.composedContents + nextProps.receivedEmoji.colons
            });
            }
        }
    }

    render() {
    return (
      <div className="compose">
        <input
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          value={this.state.composedContents}
          onChange={this.onCommentChange}
          onKeyDown={this.handleKeyDown}
          ref={(ref) => {this.composedInput = ref}}
        />

        <ToolbarButton key="send" icon="ion-ios-send" onClick={this._submit.bind(this)}/>
        <ToolbarButton key="more" icon="ion-ios-more" MsgLst={this} onClick={this.props.more} />
      </div>
    );
  }
}