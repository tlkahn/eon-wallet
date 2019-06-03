import React from 'react';

import {
    Page,
    BackButton
} from 'react-onsenui';

import LikeButton from './components/LikeButton'
import CommentBox from "./components/CommentBox";
import CommentItem from './components/CommentItem'
import GalleryItem from './components/GalleryItem'
import ProfileHead from './components/ProfileHead'
import moment from 'moment'

export default class Setting extends React.Component {
    constructor(props) {
        super(props);
        this.post = {
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
            place_id: 1,
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
        };
        this.likedPostIds = [1,2,3];
        this.currentUser = {
            username: 'toeinriver',
            avatarUrl: 'https://via.placeholder.com/150/'
        };
    }
    render() {
        return (
            <Page>
                <div>
                    {/*<BackButton>*/}
                    {/*    Press me*/}
                    {/*</BackButton>*/}
                    {/*<LikeButton />*/}
                    {/*<CommentBox />*/}
                    {/*<CommentItem username="toeinriver" body="hello world!" deletable={true} onDelete={()=>console.log('deleting item')} modalIsOpen={false}/>*/}
                    {/*<GalleryItem*/}
                    {/*    key="gallery-item-1"*/}
                    {/*    {...this.post}*/}
                    {/*    liked={this.likedPostIds.indexOf(this.post.id) >= 0}*/}
                    {/*    currentUser={this.currentUser}*/}
                    {/*    onCommentSubmit={(commentBody) => this.props.addComment(this.post.id, commentBody)}*/}
                    {/*    onCommentDelete={(commentId) => this.props.deleteComment(this.post.id, commentId)}*/}
                    {/*    onLike={() => this.props.likePost(this.post.id)}*/}
                    {/*    onDislike={() => this.props.dislikePost(this.post.id)}*/}
                    {/*    onFetchMoreComments={() => this.props.fetchMoreComments(this.post.id)}*/}
                    {/*    onLikersClick={() => this.openLikersModal(this.post.id)}*/}
                    {/*/>*/}
                    <ProfileHead user={this.currentUser}/>
            </div>
            </Page>
        )
    }
}