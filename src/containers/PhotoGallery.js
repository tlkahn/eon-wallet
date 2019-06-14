import React from 'react';
import { connect } from 'react-redux';
import {
    Page,
} from 'react-onsenui';

import GalleryItem from '../components/GalleryItem'
import Spinner from '../components/Spinner'
import moment from 'moment'

import './styles/PhotoGallery.css'

class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);
        this.posts = [{
            photoUrl: "https://via.placeholder.com/150/",
            caption: "text",
            userId: 1,
            createdAt: moment("20180101", "YYYYMMDD"),
            updatedAt: moment("20180101", "YYYYMMDD"),
            address: "Shanghai China",
            lat: 0,
            lng: 0,
            likesCount: 108,
            comments_count: 2,
            user: {
                username: 'toeinriver',
                avatarUrl: 'https://via.placeholder.com/150/'
            },
            comments: [{
                id: 1,
                username: 'toeinriver',
                body: 'yay'
            },
                {
                id: 2,
                username: 'someone',
                body: 'hahaha'
            },
            ],
            commentPagination: {
                nextPage: null,
                currentPage: null
            }
            }, {
            photoUrl: "https://via.placeholder.com/150/",
            caption: "text",
            userId: 1,
            createdAt: moment("20180101", "YYYYMMDD"),
            updatedAt: moment("20180101", "YYYYMMDD"),
            address: "Shanghai China",
            lat: 0,
            lng: 0,
            likesCount: 108,
            comments_count: 2,
            user: {
                username: 'toeinriver',
                avatarUrl: 'https://via.placeholder.com/150/'
            },
            comments: [{
                id: 1,
                username: 'toeinriver',
                body: 'yay'
            },
                {
                id: 2,
                username: 'someone',
                body: 'hahaha'
            },
            ],
            commentPagination: {
                nextPage: null,
                currentPage: null
            }
        },
        ];
        this.likedPostIds = [1,2,3];
        this.currentUser = {
            username: 'toeinriver',
            avatarUrl: 'https://via.placeholder.com/150/'
        };
        this.isFetching = true;
    }
    render() {
        const { posts, isFetching, likedPostIds, currentUser } = this;
        return (
        <Page>
            <div className="PhotoGallery__root">
                {posts.map((post, idx) => (
                    <GalleryItem
                        key={idx}
                        {...post}
                    />
                ))}
                {isFetching ? (
                    <div className="PhotoGallery__spinner-container">
                        <Spinner />
                    </div>
                ) : null}
            </div>
        </Page>
        )
    }
}

const mapStateToProps = (state) => ({
  // posts: getAllPosts(state),
  // isFetching: getIsFetchingPosts(state),
  // likedPostIds: getCurrentUsersLikedPostIds(state),
  // currentPage: getPostsCurrentPage(state),
  // totalPages: getPostsTotalPages(state),
  // currentUser: getCurrentUser(state),
});

export default connect(
  mapStateToProps,
  { /*fetchPosts, likePost, dislikePost, addComment, deleteComment, fetchMoreComments*/ }
)(PhotoGallery);
