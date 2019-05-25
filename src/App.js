import React, {Component} from 'react';
import logo from './logo.svg';
import * as Ons from 'react-onsenui';
import * as ons from 'onsenui';
import './App.css';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import Pokemon from './Pokemon';
import Detail from "./Detail";
import Setting from "./Setting";

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
                          renderTabs={(activeIndex, tabbar) => [
                              {
                                  content: <Pokemon key="pokemon"/>,
                                  tab: <Ons.Tab label="Pokemon" icon="md-home" key="pokemon" />
                              },
                              {
                                  content: <Setting key="setting" />,
                                  tab: <Ons.Tab label="Settings" icon="md-settings" key="setting"/>
                              }]
                          }
                      />
                  </Ons.Page>
            </div>
            </Ons.Page>
        );
    }
}
