import React, { Component } from 'react';
import {Page, Input, Icon, ToolbarButton} from 'react-onsenui';
import FacebookLoginButton from '../FacebookLoginButton';
import FormDivider from '../FormDivider';
import './SignUpForm.css'

export default class SignUpForm extends Component {
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
                    <div className="right">
                        <ToolbarButton onClick={()=>this.props.toggleSplitterSide()} modifier="quiet">
                            <Icon icon="md-more" />
                        </ToolbarButton>
                    </div>
                    <div className="center">Sign up</div>
                </ons-toolbar>

                <div className="formarea">
                    <div className="form-row">
                        <input type="text" className="text-input--underbar width-half" placeholder="First" value="" />
                        <input type="text" className="text-input--underbar width-half" placeholder="Last" value="" style={{'border-width-left': '1px'}} />
                    </div>

                    <div className="form-row">
                        <input type="text" className="text-input--underbar width-full" placeholder="Email" value="" />
                    </div>

                    <div className="form-row">
                        <input type="password" className="text-input--underbar width-full" placeholder="Password" value="" />
                    </div>

                    <div className="lucent">
                        <p className="note">Password - 6 characters or more</p>
                    </div>

                    <div className="vspc form-row">
                        <ons-button modifier="large">Sign up</ons-button>
                    </div>
                </div>

                <FormDivider />
                <FacebookLoginButton />

            </ons-page>
        );
    }
}