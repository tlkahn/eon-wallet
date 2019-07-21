import React from 'react';
import { connect } from 'react-redux';
import {
    Page,
    Navigator,
    ListItem,
    List,
} from 'react-onsenui';
import ProfileHead from '../components/ProfileHead';
import NotificationList from './NotificationList';
import AddressBook from './AddressBook';
import ContactList from './ContactList';
import './styles/Profile.css';
import { instanceOf } from 'prop-types';
// import { withCookies, Cookies } from 'react-cookie';
// import {signOutCurrentUser} from '../actions/actionCreators/signOutCurrentUser';
import {signOutCurrentUser} from '../actions/actionCreators/signOutCurrentUser';
import { withCookies, Cookies } from 'react-cookie';

class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        //TODO: mock stub here. to connect to the backend when ready
        this.currentUser = {
            username: 'toeinriver',
            avatarUrl: 'https://via.placeholder.com/150/'
        };
        //TODO: hard coding. refactor this into config-based or read from db
        this.pageItems = ["Notifications", "Wallet", "Settings", "Feedback"];
        this.pageItemsIcons = ["ion-ios-notifications", "ion-ios-wallet", "ion-ios-settings", "ion-ios-happy"];
    }

    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    gotoComponent(component, propsObj) {
        if (typeof component !== 'undefined') {
            this.props.navigator.pushPage({comp: component, props: { ...propsObj }});
        }
    }

    static _getViewArray() {
        return [NotificationList, AddressBook];
    }

    onLogOut() {
        const { cookies } = this.props;
        cookies.remove('loggedIn');
        this.props.signOutCurrentUser();
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
                                <ons-icon icon={this.pageItemsIcons[idx]} class="list-item__icon"/>
                            </div>
                            <div className="center">
                                <span className="list-item__title" onClick={()=>{this.gotoComponent(ProfilePage._getViewArray()[idx], {navigator: this.props.navigator})}}>{this.pageItems[idx]||""}</span>
                            </div>
                        </ListItem>
                    }
                />
                <div className="splitter"/>
                <List>
                    <ListItem onClick={this.onLogOut.bind(this)} key={Math.random()*100}>
                        <div className="left">
                            <ons-icon icon="ion-ios-log-out" class="list-item__icon"/>
                        </div>
                        <div className="center">
                            Sign out
                        </div>
                    </ListItem>
                </List>
            </Page>
        )
    }
}

class Profile extends React.Component {


  static renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;
    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
        <Navigator
            initialRoute={{comp: connect(
                    null,
                    { signOutCurrentUser }
                )(withCookies(ProfilePage)), props: { key: 'profile-page'}}}
            renderPage={Profile.renderPage}
        />
    );
  }
}


export default Profile;
