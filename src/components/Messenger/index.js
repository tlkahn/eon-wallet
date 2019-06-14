import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {Splitter, SplitterSide, Page, SplitterContent, Toolbar, ToolbarButton, Icon, Dialog} from 'react-onsenui';
import ContactList from '../ContactList';

export default class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            hidden: true,
            contactListDialogOpen: false
        };
        this.backBtn = React.createRef();
        document.addEventListener("openSideMenu", (ev)=>{
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
            hideStatus: this.state.hidden ? 'hidden' : '',
        });
    }

    pushContactList() {
        this.props.navigator.pushPage({comp: ContactList, props: {key: "ContactList", navigator: this.props.navigator}});
    }

    render() {
        return (
            <Page>
            <Toolbar>
                <div className='center'>
                    Messenger
                </div>
                <div className="left hidden" ref={this.backBtn}>
                    <ToolbarButton onClick={()=>this.toggle()} icon="ion-ios-arrow-back">
                    </ToolbarButton>
                </div>
                <div className="right">
                    <ToolbarButton onClick={this.pushContactList.bind(this)} modifier="quiet">
                        <Icon icon="ion-ios-contacts" />
                    </ToolbarButton>
                </div>
            </Toolbar>

            <Splitter>
                <SplitterSide
                    side="left"
                    width={"100%"}
                    collapse={true}
                    swipeable={true}
                    isOpen={this.state.isOpen}
                >
                    <Page>  <ConversationList msg={this}/> </Page>
                </SplitterSide>
                <SplitterContent>
                    <Page>  <MessageList msg={this}/> </Page>
                </SplitterContent>
            </Splitter>
            </Page>
        );
    }
}
