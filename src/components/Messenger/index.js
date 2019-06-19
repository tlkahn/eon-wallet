import React, { Component } from 'react';
import ConversationList from '../ConversationList';
import MessageList from '../MessageList';
import './Messenger.css';
import {Splitter, SplitterSide, Page, SplitterContent, Toolbar, ToolbarButton, Icon, Dialog} from 'react-onsenui';
import ContactList from '../ContactList';
import AddContactsToGroup from '../AddContactsToGroup';
import { connect } from 'react-redux';
import {goToConversation} from "../../actions/actionCreators/goToConversation";

class Messenger extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: true,
            hidden: true,
            contactListDialogOpen: false,
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

    updateSessionId(config) {
        let currentSessionId = config && config.currentSessionId;
        if (currentSessionId) {
            this.setState({
                currentSessionId
            });
            this.props.goToConversation(currentSessionId);
        }
    }

    pushContactList() {
        this.props.navigator.pushPage({comp: ContactList, props: {key: "ContactList", navigator: this.props.navigator}});
    }

    pushAddContactsToGroup() {
        this.props.navigator.pushPage({comp: AddContactsToGroup, props: {key: "AddContactsToGroup", navigator: this.props.navigator}});
    }

    render() {
        return (
            <Page>
            <Toolbar>
                <div className='center'>
                    Messenger
                </div>
                <div className="left hidden messenger-back-btn" ref={this.backBtn}>
                    <ToolbarButton onClick={()=>this.toggle()} icon="ion-ios-arrow-back">
                    </ToolbarButton>
                </div>
                <div className="right">
                    <ToolbarButton onClick={this.pushContactList.bind(this)} modifier="quiet" style={{display: this.state.isOpen ? 'inline-block' : 'none'}}>
                        <Icon icon="ion-ios-contacts" />
                    </ToolbarButton>
                </div>
                <div className="right add-group-btn">
                    <ToolbarButton onClick={this.pushAddContactsToGroup.bind(this)} modifier="quiet" style={{display: !this.state.isOpen ? 'inline-block' : 'none'}}>
                        <Icon icon="ion-ios-plus" />
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
                    <Page>  <ConversationList msg={this} currentSessionId={this.state.currentSessionId} /> </Page>
                </SplitterSide>
                <SplitterContent>
                    <Page>  <MessageList msg={this}/> </Page>
                </SplitterContent>
            </Splitter>
            </Page>
        );
    }
}

export default connect(
  null,
  {
    goToConversation,
  }
)(Messenger);

