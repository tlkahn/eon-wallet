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
//TODO: to be removed
import randomWords from 'random-words';
import './ContactList.css';
//redux
import { connect } from 'react-redux';
import {goToConversation} from "../../actions/actionCreators/goToConversation";
import {debounce} from 'lodash';

class ContactList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
        };
        //TODO: stub here. to be replaced with real feed (through mapStateToProps).
        let firstNames = randomWords(100);
        let lastNames = randomWords(100);
        this.names = firstNames.map((fname, idx)=>{
            return {
                uid: idx,
                firstName: fname,
                lastName: lastNames[idx]
            }
        });
        //TODO: using latin letters. Other lang needs alphabet mapping like below:
        //const alphabetMapping = {'å':'a', 'ü':u ...}
        this.splitterSideItems = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s", "t","u","v","w","x","y","z"];
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            lastNameAlphabet: 'a'
        })
    }

    toggleSplitterSide() {
        this.setState({
            ...this.state,
            collapsed: !this.state.collapsed
        })
    }

    closeSplitterSide(){
        this.setState({
            ...this.state,
            collapsed: true
        })
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


    toggleConversation(uid) {
        this.props.goToConversation(uid);
        if (typeof this.props.navigator !== 'undefined') {
            this.props.navigator.popPage().then(page=>{
                let ev = new CustomEvent("openSideMenu", this.props.data);
                document.dispatchEvent(ev);
            });
        }

    };

    render() {
        return (
            <Page>
                <Toolbar>
                    <div className="left">
                        <BackButton>
                            Back
                        </BackButton>
                    </div>
                    <div className="center">
                        Last name starts with {this.state.lastNameAlphabet}
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
                            <List
                                dataSource={this.getContactsByLastNameAlphabet(this.state.lastNameAlphabet)}
                                renderRow={(row, idx) =>
                                    <ListItem key={"splitter-content-item-" + idx} tappable onClick={(ev)=>{
                                        this.toggleConversation(idx);
                                    }}>
                                        {
                                            (()=>{
                                                let name = this.getContactsByLastNameAlphabet(this.state.lastNameAlphabet)[idx];
                                                return (
                                                    <div className="center list-item__center" key={"splitter-content-item-" + idx + "-div"}>{name.firstName} {name.lastName}</div>
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
        goToConversation,
    }
)(ContactList);

