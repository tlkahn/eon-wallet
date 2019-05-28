import React from 'react';
import {
    Card
} from 'react-onsenui';
import "./AppItem.css";

export default class AppItem extends React.Component {
    render() {
        return (
            <Card><div className="element">
                <h3>{this.props.name}</h3>
                <p>{this.props.subtitle}</p>
                <img alt="" src={this.props.coverimg} />
            </div></Card>
        )
    }
}