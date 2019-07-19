import React, { Component } from 'react';
import {Page, Input, Icon, ToolbarButton} from 'react-onsenui';
import { connect } from 'react-redux';
import FacebookLoginButton from '../FacebookLoginButton';
import FormDivider from '../FormDivider';
import './SignUpForm.css'
import signUpUser from '../../services/signUpUser';
import { withCookies, Cookies } from 'react-cookie';
import {logInCurrentUser} from '../../actions/actionCreators/logInCurrentUser';
import {createNewWallet} from '../../actions/actionCreators/createNewWallet';
import {ETHWallet} from '../../services/ETHWallet';

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: "",
            lname: "",
            phone: "",
            password: ""
        };
        //TODO: remove in production
        window.Wallet = ETHWallet;
    }

    onSubmit() {
        let {fname, lname, phone, password} = this.state;
        signUpUser({
            fname, lname, phone, password
        }).then((wallet)=>{
            this.props.logInCurrentUser();
            this.props.createNewWallet(wallet);
            const { cookies } = this.props;
            cookies.set('pwdHash', wallet.pwdHash, { path: '/' });
            cookies.set('phone', wallet.phone, { path: '/' });
        }, (error)=>{
            console.log("signed up error", error);
        });
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
                        <input type="text" className="text-input--underbar width-half" placeholder="First" onChange={(ev)=>this.setState({
                            ...this.state,
                            fname: ev.target.value
                        })}/>
                        <input type="text" className="text-input--underbar width-half" placeholder="Last" style={{'borderWidthLeft': '1px'}} onChange={(ev)=>this.setState({
                            ...this.state,
                            lname: ev.target.value
                        })}/>
                    </div>

                    <div className="form-row">
                        <input type="text" className="text-input--underbar width-full" placeholder="Phone" onChange={(ev)=>this.setState({
                            ...this.state,
                            phone: ev.target.value
                        })}/>
                    </div>

                    <div className="form-row">
                        <input type="password" className="text-input--underbar width-full" placeholder="Password" onChange={(ev)=>this.setState({
                            ...this.state,
                            password: ev.target.value
                        })}/>
                    </div>

                    <div className="lucent">
                        <p className="note">Password - 6 characters or more</p>
                    </div>

                    <div className="vspc form-row">
                        <ons-button modifier="large" onClick={this.onSubmit.bind(this)}>Sign up</ons-button>
                    </div>
                </div>

                <FormDivider />
                <FacebookLoginButton />

            </ons-page>
        );
    }
}



export default connect(null, {logInCurrentUser, createNewWallet})(withCookies(SignUpForm));