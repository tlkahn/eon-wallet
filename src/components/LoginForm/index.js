import React, { Component } from 'react';
import {Page, Input, Icon, ToolbarButton} from 'react-onsenui';
import FacebookLoginButton from '../FacebookLoginButton';
import FormDivider from '../FormDivider';
import './LoginForm.css'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import logInUser from '../../services/logInUser';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        };
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    onSubmit() {
        const { cookies } = this.props;
        let {email, password} = this.state;
        logInUser({
            email, password
        }).then((result)=>{
            const {userId} = result;
            cookies.set('userId', userId, { path: '/' });
        }, (error)=>{
            console.log("signed up error", error);
        });
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
                    <input type="email" className="text-input--underbar" placeholder="Email" onChange={(ev)=>this.setState({
                            ...this.state,
                            email: ev.target.value
                        })}/>
                    <input type="password" className="text-input--underbar" placeholder="Password" onChange={(ev)=>this.setState({
                            ...this.state,
                            password: ev.target.value
                        })}/>
                    <br/><br/>
                    <ons-button modifier="large" className="login-button" onClick={this.onSubmit.bind(this)}>Log In</ons-button>
                    <br/><br/>
                    <ons-button modifier="quiet" className="forgot-password">Forgot password?</ons-button>
                </div>
                <FormDivider />
                <FacebookLoginButton />
            </ons-page>
        );
    }
}

export default withCookies(LoginForm);