import React from 'react';
import {
    Page,
    Navigator,
    ListItem,
    List,
} from 'react-onsenui';
import ProfileHead from '../components/ProfileHead';
import NotificationList from './NotificationList';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        //TODO: mock stub here. to connect to the backend when ready
        this.currentUser = {
            username: 'toeinriver',
            avatarUrl: 'https://via.placeholder.com/150/'
        };
        //TODO: hard coding. refactor this into config-based or read from db
        this.pageItems = ["Notifications", "Addressbook", "Wallet Management", "Settings", "Feedback"];
        this.pageItemsIcons = ["ion-ios-notifications", "ion-ios-contacts", "ion-ios-wallet", "ion-ios-settings", "ion-ios-happy"];
    }

    gotoComponent(component, propsObj) {
        if (typeof component !== 'undefined') {
            this.props.navigator.pushPage({comp: component, props: { ...propsObj }});
        }
    }

    _getViewArray() {
        return [NotificationList,];
    }
    render() {
        return (
            <Page>
                <ProfileHead user={this.currentUser}/>
                <List
                    dataSource={this.pageItems}
                    renderRow={(row , idx) =>
                        <ListItem key={"prifile-item-" + idx} tappable modifier="chevron">
                            <div className="left">
                                <ons-icon icon={this.pageItemsIcons[idx]} class="list-item__icon"></ons-icon>
                            </div>
                            <div className="center">
                                <span className="list-item__title" onClick={()=>{this.gotoComponent(this._getViewArray()[idx], {navigator: this.props.navigator})}}>{this.pageItems[idx]||""}</span>
                            </div>
                        </ListItem>
                    }
                />
            </Page>
        )
    }
}

export default class Profile extends React.Component {


  static renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
            <Navigator
                initialRoute={{comp: ProfilePage, props: { key: 'profile-page'}}}
                renderPage={Profile.renderPage}
            />
    );
  }
}