import React, {Component} from 'react';
import * as Ons from 'react-onsenui';
import './App.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Pokemon from './Pokemon';
import DappStore from "./components/DappStore";
import Setting from "./Setting"
import "ionicons/dist/css/ionicons.css";
import PhotoGallery from "./containers/PhotoGallery";
import Profile from './containers/Profile'
import NotificationList from './containers/NotificationList'

export default class App extends Component {
    constructor() {
        super();
        this.state = {
            index: 0
        }

    }

    render() {
        return (
            <Ons.Page>
            <div className="App">
                  <Ons.Page>
                      <Ons.Tabbar
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
            </div>
            </Ons.Page>
        );
    }
}
