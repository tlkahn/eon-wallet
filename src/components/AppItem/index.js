import React from 'react';
import {
    Card
} from 'react-onsenui';
import "./AppItem.css";
import DappWrapper from "../DappWrapper";

export default class AppItem extends React.Component {
    gotoComponent(component, key, name, url) {
        this.props.navigator.pushPage({comp: component, props: { key, name, url }});
    }
    render() {
        return (
            <Card><div className="element" onClick={()=>{
                this.gotoComponent(DappWrapper, "dapp-wrapper", this.props.name, this.props.url)
            }}>
                <h3>{this.props.name}</h3>
                <p>{this.props.subtitle}</p>
                <img alt="" src={this.props.coverimg} />
            </div></Card>
        )
    }
}