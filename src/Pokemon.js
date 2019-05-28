import React from 'react';
import {
    Navigator
} from 'react-onsenui';

import Messenger from "./components/Messenger";

export default class Pokemon extends React.Component {


  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
            <Navigator
                initialRoute={{comp: Messenger, props: { key: 'messenger' }}}
                renderPage={this.renderPage}
            />
    );
  }
}