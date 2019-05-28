import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {Splitter, SplitterSide, Page, SplitterContent, Toolbar, ToolbarButton, Icon} from 'react-onsenui';

export default class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            hidden: true
        };
        this.backBtn = React.createRef();
        document.addEventListener("openSideMenu", ()=>{
            this.toggle();
        });
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        if (!nextState.hidden) {
            this.backBtn.current.classList.remove("hidden");
        }
        else {
            this.backBtn.current.classList.add("hidden");
        }
    }

    toggle(){
        this.setState({
            isOpen: !(this.state.isOpen),
            hidden: !(this.state.hidden),
            hideStatus: this.state.hidden ? 'hidden' : ''
        });
    }
    render() {
        return (
            <Page>
            <Toolbar>
                <div className='center'>
                    Messenger
                </div>
                <div className="left hidden" ref={this.backBtn}>
                    <ToolbarButton onClick={()=>this.toggle()}>
                        <Icon icon='ion-chevron-left' />
                    </ToolbarButton>
                </div>
            </Toolbar>
            <Splitter>
                <SplitterSide
                    side="left"
                    width={"100%"}
                    // onClose={this.hide.bind(this)}
                    // onOpen={this.show.bind(this)}
                    collapse={true}
                    swipeable={true}
                    isOpen={this.state.isOpen}
                >
                    <Page>  <ConversationList msg={this}/> </Page>
                </SplitterSide>
                <SplitterContent>
                    <Page>  <MessageList /> </Page>
                </SplitterContent>
            </Splitter>
            </Page>
        );
    }
}
