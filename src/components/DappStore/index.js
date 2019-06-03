import React from 'react';
import {
    Navigator
} from 'react-onsenui';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DappStore.css";
import DappStoreComponent from './DappStoreComponent';


export default class DappStore extends React.Component {


  static renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
            <Navigator
                initialRoute={{comp: DappStoreComponent, props: { key: 'dapp-store-component' }}}
                renderPage={DappStore.renderPage}
            />
    );
  }
}