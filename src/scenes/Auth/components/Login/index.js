import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form'

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Input from '../Input';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import {required} from "../../../../services/Validation";

import SnackBar from '../SnackBar';

const styles = theme => ({
  link: {
    margin: theme.spacing.unit,
    color:"#29A5BB",
  },
  title: {
    fontWeight: "900",
    color: "#343434",
    fontSize: "34px",
    textTransform: "uppercase",
  },
  button: {
    background: 'linear-gradient(0deg, #009AB0 , #00EE8C )',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    textTransform: "Capitalize",
    fontWeight: "900"
  },
  description: {
    color: "#6A6B6B",
  },
});

class Login extends Component {

  static propTypes = {
    classes: PropTypes.object,
    loginNotification: PropTypes.object,

    onLogin: PropTypes.func,
    onResetNotifications: PropTypes.func,
    onSwitchToRegistration: PropTypes.func,
    onSwitchToForgotPassword: PropTypes.func,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.handleSwitchToRegistration = this.handleSwitchToRegistration.bind(this);
    this.handleSwitchToForgotPassword = this.handleSwitchToForgotPassword.bind(this);
  }

  handleSwitchToRegistration() {
    this.props.onSwitchToRegistration();
  }

  handleSwitchToForgotPassword() {
    this.props.onSwitchToForgotPassword();
  }


  handleSubmit(values){
    this.props.onLogin(values)
  }

  handleSnackBarClose() {
    // notification object name from API reducer initial state
    this.props.onResetNotifications("loginNotification");
  }

  render() {

    const {classes, loginNotification} = this.props;

    return (
      <Grid container >
        <Grid item>
          <Typography variant={"h4"} paragraph align={"center"} className={classes.title}>
            Вход в систему
          </Typography>
          <Typography paragraph align={"center"}>
            <Link href={"javascript:void(0)"}
                  variant="body1"
                  className={classes.link}
                  onClick={this.handleSwitchToRegistration}>
              {'Нет аккаунта? Зарегистрируйтесь'}
            </Link>
          </Typography>
          <Typography paragraph align={"center"} className={classes.description}>
            Финансовая аналитика, остатки на счетах,
            бюджетирование и управление доступами -
            удобный интерфейс в одном приложении
          </Typography>
          <Form onSubmit={this.handleSubmit}
                render={({ handleSubmit })=>(
            <form onSubmit={handleSubmit}>
              <Field
                name="login"
                validate={required}
                render={({ input, meta }) => (
                  <div>
                    <FormControl fullWidth margin={"dense"}>
                      <Input {...input}
                             placeholder={"Ваш логин"}
                             error={meta.touched && meta.error && meta.error}/>
                    </FormControl>
                  </div>
                )}
              />
              <Field
                name="password"
                validate={required}
                render={({ input, meta }) => (
                  <div>
                    <FormControl fullWidth margin={"dense"}>
                      <Input {...input}
                             type={"password"}
                             placeholder={"Пароль"}
                             error={meta.touched && meta.error && meta.error}/>
                    </FormControl>
                  </div>
                )}
              />
              <Typography paragraph align={"center"}>
                <Link href={"javascript:void(0)"}
                      variant="body1"
                      className={classes.link}
                      onClick={this.handleSwitchToForgotPassword}>
                  {'Забыли пароль?'}
                </Link>
              </Typography>
              <FormControl fullWidth margin={"dense"}>
                <Button color="primary"
                        className={classes.button}
                        type={"submit"}>
                  Войти
                </Button>
              </FormControl>
            </form>
          )}/>

          <SnackBar
            variant={loginNotification.type}
            open={loginNotification.show}
            message={loginNotification.message}
            onClose={this.handleSnackBarClose}
          />

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(Login);
