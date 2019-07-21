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
import {getWallets} from "../reducers/createNewWallet";
import { connect } from 'react-redux';

class AddressBook extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: true,
        };
        
        this.wallets = this._transform(this.props.wallets);
        this.splitterSideItems = this.wallets.reduce((result, n)=>{
            if (result.indexOf(n.category) === -1) {
                result.push(n.category)
            }
            return result;
        }, []);
    }
    
    _transform = wallets => wallets.map(w => {
        return {
            category: w.coinType,
            address: w.address
        }
    });

    componentDidMount() {
        this.setState({
            ...this.state,
            notificationCategory: this.wallets[0].category
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
            return this.wallets.filter((obj)=>{
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
                                        <div key={"splitter-content-item-" + idx + "-div"} className="center list-item__center"> {this.getNotificationsByCategory(this.state.notificationCategory)[idx]}</div>
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

const mapStateToProps = (state) => {
    const wallets = getWallets(state).wallets;
    return {
        wallets
    }
};

export default connect(
  mapStateToProps,
  null
)(AddressBook);

