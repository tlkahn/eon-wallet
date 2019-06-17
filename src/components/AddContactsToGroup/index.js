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
//lodash
import {debounce} from 'lodash';

//TODO: to be removed
import randomWords from 'random-words';

export default class AddContactsToGroup extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
            checked: []
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

    toggleSelectContact(uid) {
        console.log("uid: ", uid);
        if (this.state.checked.includes(uid)) {
            this.state.checked = this.state.checked.filter((a)=>a!==uid);
        }
        else {
            this.state.checked.push(uid);
        }
    };

    isCheckMarkVisible(uid) {
        return this.state.checked.includes(uid);
    }

    render() {
        return (
            <Page>
                <Toolbar>
                    <div className="left">
                        <BackButton />
                    </div>
                    <div className="center add-group-submit-btn">
                        <Button modifier="quiet">
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
                                                        <div className="name-wrapper">{name.firstName} {name.lastName}</div>
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

