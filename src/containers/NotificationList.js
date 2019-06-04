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

export default class NotificationList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
        };
        //TODO: stub here. to be replaced with real feed (through mapStateToProps).
        this.notifications = [
            {category: "transactions", content: "You received 10 BTC."},
            {category: "transactions", content: "You received 10 BTC."},
            {category: "transactions", content: "You received 10 BTC."},
            {category: "transactions", content: "You received 10 BTC."},
            {category: "transactions", content: "You received 10 BTC."},
            {category: "system", content: "You are friends with Alice."},
            {category: "system", content: "You are friends with Bob."},
            {category: "system", content: "You are friends with Carol."},
            {category: "system", content: "You are friends with Dylan."},
        ];
        this.splitterSideItems = this.notifications.reduce((result, n)=>{
            if (result.indexOf(n.category) == -1) {
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
        }).map(obj=>obj.content);
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
                        Notifications
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

