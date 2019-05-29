import React, { Component } from 'react';
import './ToolbarButton.css';
import {Icon} from "react-onsenui";

export default class ToolbarButton extends Component {
  render() {
    const { icon } = this.props;
    return (
        <Icon
            className="toolbar-button"
            size={{default: 32, material: 40}}
            icon={{default: `${icon}`, material: `${icon}`}}
            tappable
            onClick={
                ()=>{
                    if (this.props.fn && this.props.fn === 'more') {
                        return this.props.MsgLst.toggleDialog.call(this.props.MsgLst)
                    }
                }
            }
        />
      // <i className={`toolbar-button ${icon}`} />
    );
  }
}