import React, { Component } from 'react';
import moment from 'moment';
import './Message.css';
import Emoji from 'react-emoji-render';
import {MESSAGE_FORM} from '../../config/constants';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.bubbleContent='';
  }

  render() {
    const {
      data,
      isMine,
      startsSequence,
      endsSequence,
      showTimestamp
    } = this.props;
    if (data.messageForm === MESSAGE_FORM.text) {
        this.bubbleContent = (
            <Emoji
                text={data.message}
            />
        );
    } else if (data.messageForm === MESSAGE_FORM.location) {
        this.bubbleContent = (
            <div>
                {data.location.poiname}
            </div>
        );
    } else if (data.messageForm === MESSAGE_FORM.image) {
        this.bubbleContent = (
            <div>
                <img src={data.imageUrl} className="message-bubble-thumbnail"/>
            </div>
        );
    } else if (data.messageForm === MESSAGE_FORM.crypto) {
        this.bubbleContent = (
            <div>
                {data.crypto}
            </div>
        );
    }
    const friendlyTimestamp = moment(data.timestamp).format('LLLL');
    return (
        <div className={[
          'message',
          `${isMine ? 'mine' : ''}`,
          `${startsSequence ? 'start' : ''}`,
          `${endsSequence ? 'end' : ''}`
        ].join(' ')}>
          {
            showTimestamp &&
            <div className="timestamp">
              { friendlyTimestamp }
            </div>
          }

          <div className="bubble-container">
            <div className="bubble" title={friendlyTimestamp}>
              {this.bubbleContent}
            </div>
          </div>
        </div>
    );
  }
}