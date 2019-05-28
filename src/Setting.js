import React from 'react';

import ons from 'onsenui';

import {
    Page,
    Toolbar,
    Button,
    Navigator
} from 'react-onsenui';
import Detail from "./Detail";

export class SettingContent extends React.Component {

    gotoComponent(component, key) {
        return this.props.navigator.pushPage({comp: component, props: { key }});
    }

    render() {
        return (
            <Page>
                <div>
                    <Button onClick={
                        () => {
                            this.gotoComponent(Detail, "detail");
                        }
                    }>
                        Press me
                    </Button>
                </div>
            </Page>

        )
    }
}

export default class Setting extends React.Component {


  renderPage(route, navigator) {
    route.props = route.props || {};
    route.props.navigator = navigator;

    return React.createElement(route.comp, route.props);
  }

  render() {
    return (
            <Navigator
                initialRoute={{comp: SettingContent, props: { key: 'setting_content' }}}
                renderPage={this.renderPage}
            />
    );
  }
}