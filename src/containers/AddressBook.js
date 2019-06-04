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
import './styles/NotificationList.css'

export default class AddressBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
        };
        //TODO: stub here. to be replaced with real feed (through mapStateToProps).
        this.notifications = [
            {category: "BTC", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "BTC", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "BTC", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "ETH", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "ETH", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "ETH", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "ETH", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "EOS", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
            {category: "EOS", address: "1MaJwAyMFS3wq3hpXrpxnRvYSJGiP7aipy"},
        ];
        this.splitterSideItems = this.notifications.reduce((result, n)=>{
            if (result.indexOf(n.category) === -1) {
                result.push(n.category)
            }
            return result;
        }, []);
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            notificationCategory: this.notifications[0].category
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

    getNotificationsByCategory(category) {
        if (typeof category !== 'undefined') {
            return this.notifications.filter((obj)=>{
            if (obj.category === category) {
                return obj;
            }
        }).map(obj=>obj.address);
        }
        return [];

    }

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
                        AddressBook
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
                        collapse={this.state.collapsed}>
                        <Page>
                            <List
                                dataSource={this.splitterSideItems}
                                renderRow={(row, idx) =>
                                    <ListItem key={"splitter-side-item-" + idx} tappable onClick={()=>{
                                        this.setState({
                                            ...this.state,
                                            notificationCategory: this.splitterSideItems[idx]
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
                                dataSource={this.getNotificationsByCategory(this.state.notificationCategory)}
                                renderRow={(row, idx) =>
                                    <ListItem key={"splitter-content-item-" + idx} tappable >
                                        <div className="center list-item__center"> {this.getNotificationsByCategory(this.state.notificationCategory)[idx]}</div>
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

