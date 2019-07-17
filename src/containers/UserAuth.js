import React, {Component} from 'react';
import Flipcard from '@kennethormandy/react-flipcard'
import '@kennethormandy/react-flipcard/dist/Flipcard.css'
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';
import {getCook} from '../utils/cookie';
import './styles/UserAuth.css'

export default class UserAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount() {
      if (getCook('phone') || getCook('pwdHash') || getCook('loggedIn')) {
        this.setState({
          isFlipped: true,
          loginFormPhoneField: getCook('phone') || ""
        })
      }
    }
  
  handleClick(e) {
        this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
    }

    render() {
        return (
            <div>
                <Flipcard flipped={this.state.isFlipped} type="revolving-door">
                        <SignUpForm key="sign-up-form" toggleSplitterSide={this.handleClick.bind(this)}/>
                        <LoginForm phone={this.state.loginFormPhoneField} key="log-in-form" toggleSplitterSide={this.handleClick.bind(this)}/>
                </Flipcard>
            </div>
        )
    }
}