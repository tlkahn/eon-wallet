import React from 'react';

import {
    Page,
    BackButton
} from 'react-onsenui';

import LikeButton from './components/LikeButton'
import CommentBox from "./components/CommentBox";
import CommentItem from './components/CommentItem'

export default class Setting extends React.Component {

    render() {
        return (
            <Page>
                <div>
                    <BackButton>
                        Press me
                    </BackButton>
                    <LikeButton />
                    <CommentBox />
                    <CommentItem username="toeinriver" body="hello world!" deletable={true} onDelete={()=>console.log('deleting item')} modalIsOpen={false}/>
            </div>

            </Page>

        )
    }
}