import React from 'react';
import './LikeButton.css';

export default class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: this.props.liked || false
    };
  }

  handleClick(event) {
    event.preventDefault();
    //TODO: dispatch to redux to post the like. If failed, rollback the below operation.
    this.setState({
      ...this.state,
      liked: !this.state.liked
    })
    if (this.props.onLike) {
      this.props.onLike({
        liked: this.state.liked
      });
    }
  }

  render() {
    return (
      <button
        className="LikeButton__root"
        onClick={this.handleClick.bind(this)}>
        {this.state.liked ?
        (<i className="fa fa-heart LikeButton__icon LikeButton__icon--liked"/>) :
        (<i className="fa fa-heart-o LikeButton__icon"/>)}
      </button>
    );
  }
}
