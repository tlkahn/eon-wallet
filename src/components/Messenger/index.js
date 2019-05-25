import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {Splitter, SplitterSide, Page, SplitterContent, Button} from 'react-onsenui';

export default class Messenger extends Component {
    render() {
        return (

            <Splitter>
                <SplitterSide
                    side="left"
                    width={"100%"}
                    isSwipeable={true}>
                    <Page>  <ConversationList /> </Page>
                </SplitterSide>
                <SplitterContent>
                    <Page>  <MessageList /> </Page>
                </SplitterContent>
            </Splitter>
            // <div className="messenger">
            //
            //     <div className="scrollable sidebar">
            //
            //     </div>
            //
            //     <div className="scrollable content">
            //
            //     </div>
            // </div>
        );
    }
}
