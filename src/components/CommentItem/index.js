import React from 'react';
import PropTypes from 'prop-types';
import './CommentItem.css';
import {
  Modal,
  Button
} from 'react-onsenui';
import ConfirmationModal from '../ConfirmationModal'

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.modal = null;
    this.closeModal = () => this.setState({ modalIsOpen: false });
    this.openModal = () => this.setState({ modalIsOpen: true });
  }
  renderBody() {
    const words = this.props.body.split(/\s+/);
    return (
      <span>
        {words.map((word, idx) => {
          if (word.indexOf('#') === 0) {
            return (
              <span>{word}</span>
            );
          } else if (word.indexOf('@') === 0) {
            return (
              <span>{word}</span>
            )
          } else {
            return ` ${word}`;
          }
        })}
      </span>
    )
  }

  render() {
    const { username } = this.props;
    return (
      <div className="CommentItem__root">
        <strong><span className="CommentItem__username">{username}: </span></strong> {this.renderBody()}
        {this.props.deletable === true
        ? (
          <span className="CommentItem__delete-button" onClick={this.openModal}>
            <i className="fa fa-times"/>
          </span>
          )
        : null}
        {this.props.deletable === true
        ? (
                <ConfirmationModal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    onConfirmClick={()=>{this.props.onDelete(); this.closeModal()}}
                    confirmText="Delete Comment"
                />
            )
        : null}
      </div>
    );
  }
}



export default CommentItem;

CommentItem.propTypes = {
  username: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  deletable: PropTypes.bool.isRequired,
  onDelete: PropTypes.func,
};

CommentItem.defaultProps = {
  deletable: false,
};
