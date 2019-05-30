import React, {Component} from 'react';
import * as Ons from 'react-onsenui';
import './App.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Pokemon from './Pokemon';
import DappStore from "./components/DappStore";
import Setting from "./Setting"
import "ionicons/dist/css/ionicons.css";

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
                                  content: <DappStore key="dappstore" />,
                                  tab: <Ons.Tab label="DappStore" icon="md-apps" key="dappstore"/>
                              },
                              {
                                  content: <Setting key="setting"/>,
                                  tab: <Ons.Tab label="Setting" icon="ion-logo-instagram" key="setting" />
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
