import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Field} from 'react-final-form';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import SnackBar from '../SnackBar';
import Input from '../Input';

import {required, composeValidators, email} from "../../../../services/Validation/index";

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

class ForgotPassword extends Component {

  static propTypes = {
    classes: PropTypes.object,
    onSwitchToLogin: PropTypes.func,
    onPasswordRemind: PropTypes.func,
    onResetNotifications: PropTypes.func,
    passwordRemindNotification: PropTypes.object,
  };

  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSwitchToLogin = this.handleSwitchToLogin.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
  }

  handleSwitchToLogin() {
    this.props.onSwitchToLogin();
  }

  handleSubmit(values){
    this.props.onPasswordRemind(values.email.trim());
  }

  handleSnackBarClose() {
    // notification object name from API reducer initial state
    this.props.onResetNotifications("passwordRemindNotification");
  }

  render() {

    const {classes, passwordRemindNotification} = this.props;

    return (
      <Grid container >
        <Grid item>
          <Typography variant={"h4"} paragraph align={"center"} className={classes.title}>
            Восстановление пароля
          </Typography>
          <Typography paragraph align={"center"}>
            <Link href={"javascript:void(0)"}
                  variant="body1"
                  className={classes.link}
                  onClick={this.handleSwitchToLogin}>
              {'Вернуться на страницу входа в систему'}
            </Link>
          </Typography>
          <Typography paragraph align={"center"}>
            Внесите свой e-mail и Вам на почту придет ссылка на восстановления пароля
          </Typography>

          <Form onSubmit={this.handleSubmit}
                render={({ handleSubmit })=>(
                  <form onSubmit={handleSubmit}>
                    <Field
                      name="email"
                      validate={composeValidators(required, email)}
                      render={({ input, meta }) => (
                        <div>
                          <FormControl fullWidth margin={"dense"}>
                            <Input {...input}
                                   placeholder={"Введите email"}
                                   error={meta.touched && meta.error && meta.error} />
                          </FormControl>
                        </div>
                      )}
                    />
                    <FormControl fullWidth margin={"normal"}>
                      <Button color="primary"
                              className={classes.button}
                              type={"submit"}>
                        Восстановление пароля
                      </Button>
                    </FormControl>
                  </form>
          )}/>

          <SnackBar
            variant={passwordRemindNotification.type}
            open={passwordRemindNotification.show}
            message={passwordRemindNotification.message}
            onClose={this.handleSnackBarClose}
          />

        </Grid>
      </Grid>
    )
  }
}


export default withStyles(styles)(ForgotPassword);
