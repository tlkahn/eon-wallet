import React, {Component} from 'react';
import ReactCardFlip from 'react-card-flip';
import {Page, Card} from 'react-onsenui';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import './styles/UserAuth.css'

export default class UserAuth extends Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return (
            <div>
                <ReactCardFlip isFlipped={this.state.isFlipped} flipDirection="vertical">
                    <div key="front" className="sign-up-form-wrapper">
                        <SignUpForm key="sign-up-form" toggleSplitterSide={this.handleClick.bind(this)}/>
                    </div>
                    <div key="back" className="log-in-form-wrapper">
                        <LoginForm key="log-in-form" toggleSplitterSide={this.handleClick.bind(this)}/>
                    </div>
                </ReactCardFlip>
            </div>
        )
    }

}