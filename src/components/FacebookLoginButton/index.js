import React from 'react';
import { connect } from 'react-redux';
// import { facebookLogin } from '../actions';
// import { statusChangeCallback } from '../utils/facebookAuth';
// import { getIsLoggingInWithFB } from '../store/rootReducer';
import {Button} from 'react-onsenui';
import './FacebookLoginButton.css';

export default class FacebookLoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClick() {

    }

    render() {
        return (
            <div className="FacebookLoginButton__root">
                <Button modifier="quiet"
                    className="FacebookLoginButton__button"
                    onClick={this.handleClick}>
                    {this.props.isLoggingWithFB ?
                        (<i className="fa fa-spinner fa-pulse fa-3x fa-fw FacebookLoginButton__spinner"/>) :
                        (<div><i className="fa fa-facebook-official FacebookLoginButton__icon"/> Log in with Facebook</div>)}
                </Button>
            </div>
        );
    }


}
