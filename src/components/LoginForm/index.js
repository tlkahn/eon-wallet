import React, { Component } from 'react';
import {Page, Input, Icon, ToolbarButton} from 'react-onsenui';
import FacebookLoginButton from '../FacebookLoginButton';
import FormDivider from '../FormDivider';
import './LoginForm.css'

export default class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    render() {
        return (
            <ons-page>
                <ons-toolbar>
                    <div className="center">Log In</div>
                    <div className="right">
                        <ToolbarButton modifier="quiet" onClick={()=>this.props.toggleSplitterSide()}>
                            <Icon icon="md-more" />
                        </ToolbarButton>
                    </div>
                </ons-toolbar>
                <div className="login-form">
                    <input type="email" className="text-input--underbar" placeholder="Email" value="" />
                    <input type="password" className="text-input--underbar" placeholder="Password" value="" />
                    <br/><br/>
                    <ons-button modifier="large" className="login-button">Log In</ons-button>
                    <br/><br/>
                    <ons-button modifier="quiet" className="forgot-password">Forgot password?</ons-button>
                </div>
                <FormDivider />
                <FacebookLoginButton />
            </ons-page>
        );
    }
}