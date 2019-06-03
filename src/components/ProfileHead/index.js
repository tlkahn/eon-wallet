import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router';
// import NewPostButton from '../components/NewPostButton';
// import NewPostModal from '../components/NewPostModal';
// import Spinner from '../components/Spinner';
// import FollowButton from '../components/FollowButton';
// import LoadMoreButton from '../components/LoadMoreButton';
// import ConfirmationModal from '../components/ConfirmationModal';
// import UsersModalContainer from '../containers/UsersModalContainer';
// import PhotoGrid from '../containers/PhotoGrid';
// import NotificationCardsContainer from '../containers/NotificationCardsContainer';
// import NotFoundPage from './NotFoundPage';
// import {
//   userSignOut,
//   fetchPublicProfile,
//   fetchPostsByUsername,
//   followUser,
//   unfollowUser,
// } from '../actions';
// import {
//   getPublicProfileByUsername,
//   getPostsByUsername,
//   getIsFetchingPublicProfile,
//   getPublicProfileErrors,
//   getCurrentUser,
//   getCurrentUsersFollowingIds,
//   getIsFetchingPosts,
//   getPaginationByUsername
// } from '../store/rootReducer';
// import { getAvatarUrl, pluralize } from '../utils/helpers';
import {Button} from 'react-onsenui';
import Spinner from '../Spinner';
import './ProfileHead.css';

export default class ProfileHead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logoutModalIsOpen: false,
      modalUserType: null,
    };
  }

  render() {
    const { username, avatarUrl } = this.props.user;
    return (
      <div className="Profile__root container">
        <div className="row Profile__user-info-container">
          <div className="four columns">
            <div className="Profile__avatar-img-wrapper">
              <img
                src={avatarUrl}
                className="Profile__avatar-img"
                alt={`${username} profile`}
              />
            </div>
          </div>
          <div className="five columns">
              <h3 className="Profile__username">{username}</h3>
          </div>
            <Button className="Profile__edit-button">
                Edit Profile
            </Button>
        </div>
      </div>
    )
  }
}
