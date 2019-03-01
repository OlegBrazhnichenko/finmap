import React, {Component} from 'react';
import AuthComponent from './components';
import PropTypes from 'prop-types';

import {
  login,
  passwordRemind,
  resetNotifications,
  registration
} from '../../reducers/API/actions';

import {connect} from 'react-redux';

class Auth extends Component {

  static propTypes = {
    onLogin: PropTypes.func,
    onRegistration: PropTypes.func,
    onPasswordRemind: PropTypes.func,
    onResetNotifications: PropTypes.func,

    loginNotification: PropTypes.object,
    registrationNotification: PropTypes.object,
    passwordRemindNotification: PropTypes.object,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  constructor() {
    super();

    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleSwitchToLogin = this.handleSwitchToLogin.bind(this);
    this.handlePasswordRemind = this.handlePasswordRemind.bind(this);
    this.handleSwitchToRegistration = this.handleSwitchToRegistration.bind(this);
    this.handleSwitchToForgotPassword = this.handleSwitchToForgotPassword.bind(this);
  }

  handleSwitchToLogin() {
    this.context.router.push('/login');
  }

  handleSwitchToRegistration() {
    this.context.router.push('/registration')
  }

  handleSwitchToForgotPassword() {
    this.context.router.push('/forgot-password')
  }

  handleLogin(values) {
    const data = {
      password: values.password,
    };
    if (values.login.indexOf('@') === -1) {
      data['phone'] = values.login;
      data['email'] = '';
    }
    else {
      data['email'] = values.login;
      data['phone'] = '';
    }
    this.props.onLogin(data);
  }

  handlePasswordRemind(email) {
    this.props.onPasswordRemind(email);
  }

  handleRegistration(data) {
    this.props.onRegistration(data);
  }

  render() {

    return (
      <AuthComponent authStep={this.context.router.getCurrentLocation().pathname}
                     onLogin={this.handleLogin}
                     onRegistration={this.handleRegistration}
                     onPasswordRemind={this.handlePasswordRemind}
                     onResetNotifications={this.props.onResetNotifications}
                     loginNotification={this.props.loginNotification}
                     registrationNotification={this.props.registrationNotification}
                     passwordRemindNotification={this.props.passwordRemindNotification}
                     switchToLogin={this.handleSwitchToLogin}
                     switchToRegistration={this.handleSwitchToRegistration}
                     switchToForgotPassword={this.handleSwitchToForgotPassword}/>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    loginNotification: state.API.loginNotification,
    registrationNotification: state.API.registrationNotification,
    passwordRemindNotification: state.API.passwordRemindNotification,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (data) => {
      dispatch(login(data))
    },
    onRegistration: (data) => {
      dispatch(registration(data))
    },
    onPasswordRemind: (email) => {
      dispatch(passwordRemind(email))
    },
    onResetNotifications: (notificationObjectName) => {
      dispatch(resetNotifications(notificationObjectName))
    }
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);
