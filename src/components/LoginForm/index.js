import React, { Component } from 'react';
import {Page, Input, Icon, ToolbarButton} from 'react-onsenui';
import FacebookLoginButton from '../FacebookLoginButton';
import FormDivider from '../FormDivider';
import './LoginForm.css'
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import logInUser from '../../services/logInUser';
import {ETHWallet} from '../../services/ETHWallet';
import { connect } from 'react-redux';
import {logInCurrentUser} from "../../actions/actionCreators/logInCurrentUser";
import {createNewWallet} from "../../actions/actionCreators/createNewWallet";

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            password: ''
        };
        //TODO: remove in production
        window.Wallet = ETHWallet;
    }

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };
    
    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.phone !== this.props.phone) {
            this.setState({
                phone: nextProps.phone
            })
        }
    }
    
    onSubmit() {
        let {phone, password} = this.state;
        logInUser({
            phone,
            password
        }).then((wallets)=>{
            console.log({wallets});
            const wallet = wallets[0];
            this.props.logInCurrentUser();
            //TODO: should be a separate action like useExisitngWallets(wallets)
            this.props.createNewWallet(wallet);
            const { cookies } = this.props;
            cookies.set('pwdHash', wallet.pwdHash, { path: '/' });
            cookies.set('phone', phone, { path: '/' });
        }, (error)=>{
            console.log("signed up error", error);
        });
    }
    
    componentDidMount() {
        const { cookies } = this.props;
        if (cookies.get('phone') !== 'undefined') {
            this.phoneInputEl.value = cookies.get('phone');
        }
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
                    <input type="phone" className="text-input--underbar" placeholder="Phone" ref={el=>this.phoneInputEl = el} onChange={(ev)=>this.setState({
                            phone: ev.target.value
                        })}/>
                    <input type="password" className="text-input--underbar" placeholder="Password" onChange={(ev)=>this.setState({
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

export default connect(null, {logInCurrentUser, createNewWallet})(withCookies(LoginForm));