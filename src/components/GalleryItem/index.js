import React from 'react';
import moment from 'moment';
import LikeButton from '../LikeButton';
import CommentBox from '../CommentBox';
import CommentItem from '../CommentItem';

import './GalleryItem.css';

/*
GalleryItem is for rending one single gallery item in a cascading form. Example usage:
  <GalleryItem
    key={idx}
    {...post}
    onLike={() => this.props.likePost(post.id)}
    onDislike={() => this.props.dislikePost(post.id)}
    liked={likedPostIds.indexOf(post.id) >= 0}
    onCommentSubmit={(commentBody) => this.props.addComment(post.id, commentBody)}
    onCommentDelete={(commentId) => this.props.deleteComment(post.id, commentId)}
    currentUser={currentUser}
    onFetchMoreComments={() => this.props.fetchMoreComments(post.id)}
    onLikersClick={() => this.openLikersModal(post.id)}
  />

A post typically would have fields assigned to GalleryItem above:
    photo: string
    caption: text
    user_id: integer
    created_at: datetime
    updated_at: datetime
    filter: string
    address: string
    lat: float
    lng: float
    likes_count: integer
    comments_count: integer
    place_id: string
    user: {user}
    likes: [{like}]
    likers: [{liker}]
    comments: [{comment}]
    taggings: [{tagging}]
    tags: [{tag}]

 */
class GalleryItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderLikes() {
    const { likesCount } = this.props;
    if (likesCount > 0) {
      return (
        <div className="GalleryItem__likes" onClick={this.props.onLikersClick}>
          {likesCount} {likesCount === 1 ? 'like' : 'likes'}
        </div>
      );
    }
  }

  renderCaption() {
    const { caption, user: { username } } = this.props;
    if (caption) {
      return (
        <CommentItem username={username} body={caption} />
      )
    }
  }

  renderViewMoreComments() {
    const { nextPage, currentPage } = this.props.commentPagination;
    if (nextPage !== null) {
      return (
        <div
          className="GalleryItem__fetch-comments-link"
          onClick={this.props.onFetchMoreComments}>
          {currentPage === 1
          ? `View all ${this.props.commentsCount} comments`
          : 'View more comments'}
          View more comments
        </div>
      );
    }
  }

  renderComments() {
    return (
      <div className="GalleryItem__comments">
        {this.props.comments.map(comment => (
          <CommentItem
            key={comment.id}
            username={comment.username}
            body={comment.body}
            deletable={this.props.currentUser.username === comment.username}
            onDelete={() => this.props.onCommentDelete(comment.id)}
          />
        ))}
      </div>
    );
  }

  render() {
    const {
      photoUrl,
      createdAt,
      filter,
      address,
      user: {
        username,
        avatarUrl
      }
    } = this.props;

    return (
      <article className="GalleryItem__root">
        <div className="GalleryItem-header">
          <div className="GalleryItem-header__avatar-container">
            <img
              src={avatarUrl}
              className="GalleryItem-header__avatar-img"
              alt={`${username} profile`}
            />
          </div>
          <div className="GalleryItem-header__metadata-container">
            <div className="GalleryItem-header__username">
              <span>{username}</span>
            </div>
            {{address} ?
            (<div className="GalleryItem-header__address">
              <span>{address}</span>
            </div>) : null}
          </div>
          <div className="GalleryItem-header__timestamp">
            {moment(createdAt).fromNow()}
          </div>

        </div>
        <div
          onDoubleClick={this.onImageDoubleClick}
          className={`GalleryItem__body ${filter || ''}`}
          >
          <img src={photoUrl} role="presentation" />
        </div>
        <div className="GalleryItem__footer">
          {this.renderLikes()}

          {this.renderCaption()}
          {this.renderViewMoreComments()}
          {this.renderComments()}
          <div className="GalleryItem__action-box">
            <div className="GalleryItem__like-button">
              <LikeButton
                onLike={this.props.onLike}
                onDislike={this.props.onDislike}
                liked={this.props.liked}
              />
            </div>
            <div className="GalleryItem__comment-box">
              <CommentBox onSubmit={this.props.onCommentSubmit} />
            </div>
          </div>
        </div>
      </article>
    );
  }
}

export default GalleryItem;
