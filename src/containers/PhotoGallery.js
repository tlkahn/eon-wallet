import React from 'react';
import { connect } from 'react-redux';
import {
    Page, Toolbar, ToolbarButton
} from 'react-onsenui';

import GalleryItem from '../components/GalleryItem'

import './styles/PhotoGallery.css'
import {posts} from '../services/getPosts';

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
