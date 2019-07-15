import React from 'react';
import {
    Page,
    SplitterContent,
    SplitterSide,
    Splitter,
    Button,
    List,
    ListItem,
    BackButton,
    Toolbar,
    ToolbarButton,
    Icon
} from 'react-onsenui';
import './AddContactsToGroup.css';
//redux
import { connect } from 'react-redux';
import {goToGroupChat} from '../../actions/actionCreators/goToGroupChat';
import GroupChatMemberPanel from '../GroupChatMemberPanel';
//lodash
import {debounce} from 'lodash';

//TODO: to be removed
import randomWords from 'random-words';

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class AddContactsToGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            checked: []
        };
        //TODO: stub here. to be replaced with real feed (through mapStateToProps).
        let firstNames = randomWords(100);
        let lastNames = randomWords(100).map(capitalizeFirstLetter);
        this.names = firstNames.map((fname, idx)=>{
            return {
                uid: idx,
                firstName: capitalizeFirstLetter(fname),
                lastName: capitalizeFirstLetter(lastNames[idx])
            }
        });
        //TODO: using latin letters. Other lang needs alphabet mapping like below:
        //const alphabetMapping = {'å':'a', 'ü':u ...}
        this.splitterSideItems = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S", "T","U","V","W","X","Y","Z"];
        this._mounted = false;
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            lastNameAlphabet: 'A'
        })
        this._mounted = true;
    }
    
    componentWillUnmount() {
        this._mounted = false;
    }
    
    toggleSplitterSide() {
        if  (this._mounted) {
            this.setState({
                ...this.state,
                collapsed: !this.state.collapsed
            })
        }
    }
    
    closeSplitterSide(){
        if (this._mounted) {
            this.setState({
                ...this.state,
                collapsed: true
            })
        }
    }

    getContactsByLastNameAlphabet(lastNameAlphabet) {
        if (typeof lastNameAlphabet !== 'undefined') {
            return this.names.filter((name)=>{
            if (name.lastName[0] === lastNameAlphabet) {
                return name;
            }
        });
        }
        return [];

    }

    toggleSelectContact(uid) {
        if (this.state.checked.includes(uid)) {
            this.state.checked = this.state.checked.filter((a)=>a!==uid);
        }
        else {
            this.state.checked.push(uid);
        }
        this.forceUpdate();
    };

    isCheckMarkVisible(uid) {
        return this.state.checked.includes(uid);
    }

    goToGroupConversation() {
        this.props.navigator.popPage({
            data: {
                groupUsrIds: this.state.checked
            }
        }).then(el=>{
            this.props.goToGroupChat(this.state.checked);
        });
    }

    render() {
        return (
            <Page>
                <Toolbar>
                    <div className="left">
                        <BackButton />
                    </div>
                    <div className="center add-group-submit-btn">
                        <Button modifier="quiet" onClick={this.goToGroupConversation.bind(this)}>
                            <Icon icon="ion-ios-checkmark" />
                        </Button>
                    </div>
                    <div className="right notification-menu">
                        <ToolbarButton onClick={()=>this.toggleSplitterSide()} modifier="quiet">
                            <Icon icon="md-menu" />
                        </ToolbarButton>
                    </div>
                </Toolbar>
                <Splitter>
                    <SplitterSide
                        side="right"
                        width={200}
                        swipeable={true}
                        collapse={true}
                        isOpen={!this.state.collapsed}
                    >
                        <Page>
                            <List
                                dataSource={this.splitterSideItems}
                                renderRow={(row, idx) =>
                                    <ListItem key={"splitter-side-item-" + idx} tappable onClick={()=>{
                                        this.setState({
                                            ...this.state,
                                            lastNameAlphabet: this.splitterSideItems[idx]
                                        });
                                    }}>
                                        {this.splitterSideItems[idx]}
                                    </ListItem>
                                }
                            />
                        </Page>
                    </SplitterSide>
                    <SplitterContent onClick={this.closeSplitterSide.bind(this)}>
                        <Page>
                            <div className="selected-uids-wrapper">
                                {!!this.state.checked ?  <GroupChatMemberPanel memberIds={this.state.checked} /> : ""}
                            </div>
                            <List
                                dataSource={this.getContactsByLastNameAlphabet(this.state.lastNameAlphabet)}
                                renderRow={(row, idx) =>
                                    <ListItem key={"splitter-content-item-" + idx} tappable onClick={(ev)=>{
                                        this.toggleSelectContact(row.uid);
                                    }}>
                                        {
                                            (()=>{
                                                let name = this.getContactsByLastNameAlphabet(this.state.lastNameAlphabet)[idx];
                                                return (
                                                    <div className="center list-item__center list-item-contact-name" key={"splitter-content-item-" + idx + "-div"}>
                                                        <div className="icon-checkmark-wrapper">
                                                            <Icon icon="ion-ios-checkmark-circle"
                                                              style={{display: this.isCheckMarkVisible(row.uid) ? "inline-block" : "none"}}/>
                                                        </div>
                                                        <div className="name-wrapper">{name.firstName} <b>{name.lastName}</b></div>
                                                    </div>
                                                )
                                            })()
                                        }
                                    </ListItem>
                                }
                            />
                        </Page>
                    </SplitterContent>
                </Splitter>
            </Page>
            )
    }
}

export default connect(
        null,
    {
        goToGroupChat,
    }
)(AddContactsToGroup);