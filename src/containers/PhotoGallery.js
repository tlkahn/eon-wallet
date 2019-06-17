import React from 'react';
import { connect } from 'react-redux';
import {
    Page, Toolbar, ToolbarButton
} from 'react-onsenui';

import GalleryItem from '../components/GalleryItem'
import Spinner from '../components/Spinner'
import moment from 'moment'

import './styles/PhotoGallery.css'

//TODO: mock stub
const posts = [{
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


class PhotoGallery extends React.Component {
    constructor(props) {
        super(props);
        //TODO: mock stub
        this.state = {
            posts,
            likedPostIds: [1,2,3],
            currentUser: {
                username: 'toeinriver',
                avatarUrl: ''
            }
        };
    }
    render() {
        const { posts, isFetching, likedPostIds, currentUser } = this.state;
        return (
        <Page>
            {posts.map((post, idx) => (
                <GalleryItem
                    key={idx}
                    {...post}
                />
            ))}
        </Page>
        )
    }
}

const mapStateToProps = (state) => ({
});

export default connect(
  mapStateToProps,
  { }
)(PhotoGallery);
