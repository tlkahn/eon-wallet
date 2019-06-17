import React, {Component} from 'react';
import Flipcard from '@kennethormandy/react-flipcard'
import '@kennethormandy/react-flipcard/dist/Flipcard.css'
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import './styles/UserAuth.css'

export default class UserAuth extends Component {
    constructor(props) {
        super(props);
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
                <Flipcard flipped={this.state.isFlipped} type="revolving-door">
                        <SignUpForm key="sign-up-form" toggleSplitterSide={this.handleClick.bind(this)}/>
                        <LoginForm key="log-in-form" toggleSplitterSide={this.handleClick.bind(this)}/>
                </Flipcard>
            </div>
        )
    }
}