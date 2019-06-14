import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as Ons from 'react-onsenui';
import './App.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Pokemon from './Pokemon';
import DappStore from "./components/DappStore";
import Setting from "./Setting"
import "ionicons/dist/css/ionicons.css";
import PhotoGallery from "./containers/PhotoGallery";
import Profile from './containers/Profile';
import NotificationList from './containers/NotificationList';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import UserAuth from './containers/UserAuth';
import ContactList from './containers/ContactList';
import { instanceOf } from 'prop-types';
// import { withCookies, Cookies } from 'react-cookie';
import {getSignedOutStatus} from './reducers/signOutCurrentUser';
import {getLoggedInStatus} from "./reducers/logInCurrentUser";

class App extends Component {

    // static propTypes = {
    //     cookies: instanceOf(Cookies).isRequired
    // };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }

    componentDidMount() {
        // const { cookies } = this.props;
        // let name = 'josh';
        // cookies.set('name', name, { path: '/' });
        // if  (cookies.get('userId')) {
        // }
    }

    render() {
        return (
            <Ons.Page>
            <div className="App">
                {(()=>{
                    console.log("signedOut", this.props.signedOut);
                    console.log("loggedIn", this.props.loggedIn);
                    return (

                        (()=>{
                            if(this.props.loggedIn && !this.props.signedOut) {
                                return (
                                    <Ons.Page>
                                        <Ons.Tabbar
                                            style={{display:
                                                    this.props.loggedIn && !this.props.signedOut ? 'block' : 'none'
                                            }}
                                            renderTabs={() => [
                                                {
                                                    content: <Pokemon key="pokemon"/>,
                                                    tab: <Ons.Tab label="Pokemon" icon="md-home" key="pokemon" />
                                                },
                                                {
                                                    content: <DappStore key="dapp-store" />,
                                                    tab: <Ons.Tab label="DappStore" icon="md-apps" key="dapp-store"/>
                                                },
                                                {
                                                    content: <PhotoGallery key="photo-gallery"/>,
                                                    tab: <Ons.Tab label="Wall" icon="ion-logo-instagram" key="photo-gallery" />
                                                },
                                                {
                                                    content: <Profile key="profile"/>,
                                                    tab: <Ons.Tab label="Profile" icon="ion-ios-person" key="profile" />
                                                }
                                            ]
                                            }
                                        />
                                    </Ons.Page>
                                )
                            }
                            else {
                                return (
                                    <Ons.Page>
                                        <UserAuth style={{display:
                                                !this.state.loggedIn && this.props.signedOut ? 'block' : 'none'
                                        }}/>
                                    </Ons.Page>
                                )}})())})()}
            </div>
            </Ons.Page>
        );
    }
}

const mapStateToProps = (state) => ({
  signedOut: getSignedOutStatus(state).signedOut,
  loggedIn: getLoggedInStatus(state).loggedIn,
});

export default connect(
  mapStateToProps,
  {  }
)(App);