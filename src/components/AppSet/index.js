import React from 'react';
import HorizontalScroller from 'react-horizontal-scroll-container';
import {
    Button
} from 'react-onsenui';
import AppItem from '../AppItem';
import './AppSet.css'
import DappList from '../DappList';

export default class Appset extends React.Component {
    gotoComponent(component, key, data) {
        this.props.navigator.pushPage({comp: component, props: { key, data }});
    }

    render() {
        if (typeof this.props.data != 'undefined') {
            return (
                <div className="app-set-container">
                    <div className="horizontal-scroller-tool-bar">
                        <div>
                            <div className="left">
                                <h3>{this.props.category_name}</h3>
                            </div>
                            <div className='right'>
                                <Button onClick={() => {this.gotoComponent(DappList, "dapp-list-" + this.props.index, this.props.data)}} modifier="quiet">
                                See all
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="horizontal-scroller-container">
                        <HorizontalScroller>
                            {
                                this.props.data.map((app) => {
                                    return <AppItem name={app.name} subtitle={app.subtitle} coverimg={app.coverimg} key={app.name} url={app.url} navigator={this.props.navigator}/>
                                })
                            }
                        </HorizontalScroller>
                    </div>
                </div>)
        }
        else
            return "";

    }
}


