import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as Ons from 'react-onsenui';
import './App.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Pokemon from './Pokemon';
import DappStore from "./components/DappStore";
import "ionicons/dist/css/ionicons.css";
import PhotoGallery from "./containers/PhotoGallery";
import Profile from './containers/Profile';
import UserAuth from './containers/UserAuth';
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import {getLoggedInStatus} from "./reducers/logInCurrentUser";

class App extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            loggedIn: this.props.loggedIn
        };
        document.ontouchmove = function(event){
            event.preventDefault();
        }
    }

    componentDidMount() {
        const { cookies } = this.props;
        // let name = 'josh';
        // cookies.set('name', name, { path: '/' });
        // if  (cookies.get('userId')) {
        // }
        let loggedIn = cookies.get('loggedIn');
        if (loggedIn) {
            this.setState({
                loggedIn: true
            })
        }
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.loggedIn !== this.props.loggedIn) {
            const { cookies } = this.props;
            this.setState({
                loggedIn: this.props.loggedIn
            });
            cookies.set('loggedIn', this.props.loggedIn, { path: '/' });
        }
    }
    
    render() {
        return (
            <Ons.Page>
            <div className="App">
                {(()=>{
                    return (

                        (()=>{
                            if(this.state.loggedIn) {
                                return (
                                    <Ons.Page>
                                        <Ons.Tabbar key={"tabbar-logged-in-" + this.state.loggedIn}
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
                                        <UserAuth key={"user-auth-logged-in-" + this.state.loggedIn}/>
                                    </Ons.Page>
                                )}})())})()}
            </div>
            </Ons.Page>
        );
    }
}

const mapStateToProps = (state) => ({
  loggedIn: getLoggedInStatus(state).loggedIn,
});

export default connect(
  mapStateToProps,
  {  }
)(withCookies(App));