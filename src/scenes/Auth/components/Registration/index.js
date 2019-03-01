import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Field} from 'react-final-form';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import Input from '../Input';
import SnackBar from '../SnackBar';

import {composeValidators, email, required} from "../../../../services/Validation/index";

import { withStyles } from '@material-ui/core/styles';

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

class Registration extends Component {

  static propTypes = {
    classes: PropTypes.object,
    onRegistration: PropTypes.func,
    onSwitchToLogin: PropTypes.func,
    onResetNotifications: PropTypes.func,
    registrationNotification: PropTypes.object,
  };

  constructor() {
    super();

    this.expandForm = this.expandForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSnackBarClose = this.handleSnackBarClose.bind(this);
    this.handleSwitchToLogin = this.handleSwitchToLogin.bind(this);

    this.state = {
      isFormExpanded: false,
      isEmailFirst: false,
      initialFormData: {},
      leed_id: "",
    }
  }

  handleSnackBarClose() {
    // notification object name from API reducer initial state
    this.props.onResetNotifications("registrationNotification");
  }

  handleSwitchToLogin() {
    this.props.onSwitchToLogin();
  }

  handleSubmit(values) {
    const data = {
      phone: values.phone,
      email: values.email,
      name: values.name,
      password: values.password,
      password_confirm: values.repeatPassword,
      utm_params: {},
      leed_id: this.state.leed_id,
    };

    this.props.onRegistration(data);
  }



  expandForm(values) {
    // If validation error is undefined
    let isEmailFirst = email(values.emailOrPhone) === undefined;

    const data = {
      [isEmailFirst ? "email" : "phone"]: values.emailOrPhone,
    };

    const leadData = {
      value: values.emailOrPhone,
      source: 'first step registration',
      name: '',
      email: "",
      phone: "",
      url: "http://localhost:3000/registration",
      utm_params: {}
    };

    axios({
      url: 'https://tatooine.api.app.finmap.online/leeds/create_leed',
      method: 'post',
      data: {...leadData, ...data}
    }).then( (response) => {
      this.setState({
        isFormExpanded: true,
        isEmailFirst: isEmailFirst,
        initialFormData: data,
        leed_id: response.data.data._id
      });
    }).catch(function (error) {
      console.log('error send utm params', error);
    });

  }

  formFields = [
    {
      name: "emailOrPhone",
      placeholder: "Email или телефон",
      validation: [required],
    },
  ];

  expandedFormFields = [
    {
      name: "phone",
      placeholder: "Ваш телефон",
      validation: [required],
    },
    {
      name: "email",
      placeholder: "Ваш email",
      validation: [required, email],
    },
    {
      name: "name",
      placeholder: "Ваше имя",
      validation: [required],
    },
    {
      name: "password",
      placeholder: "Придумайте пароль",
      validation: [required],
      type: "password",
    },
    {
      name: "repeatPassword",
      placeholder: "Повторите пароль",
      validation: [required],
      type: "password",
    }
  ];

  expandedFormFieldsEmailFirst = [
    {
      name: "email",
      placeholder: "Ваш email",
      validation: [required, email],
    },
    {
      name: "phone",
      placeholder: "Ваш телефон",
      validation: [required],
    },
    {
      name: "name",
      placeholder: "Ваше имя",
      validation: [required],
    },
    {
      name: "password",
      placeholder: "Придумайте пароль",
      validation: [required],
      type: "password",
    },
    {
      name: "repeatPassword",
      placeholder: "Повторите пароль",
      validation: [required],
      type: "password",
    }
  ];

  renderFields(fields) {

    return fields.map((field, index)=>(
      <Field
        key={index}
        name={field.name}
        validate={field.validation? composeValidators(...field.validation) :()=>{}}
        render={({ input, meta }) => (
          <div>
            <FormControl fullWidth margin={field.margin || "dense"}>
              <Input {...input}
                     placeholder={field.placeholder}
                     type={field.type || ""}
                     error={meta.touched && meta.error && meta.error}/>
            </FormControl>
          </div>
        )}
      />
    ))
  }

  render() {

    const {classes, registrationNotification} = this.props;

    return (
      <Grid container >
        <Grid item>
          <Typography variant={"h4"} paragraph align={"center"} className={classes.title}>
            Регистрация
          </Typography>
          <Typography paragraph align={"center"}>
            Финансовая аналитика, остатки на счетах,
            бюджетирование и управление доступами -
            удобный интерфейс в одном приложении
          </Typography>

          <Form onSubmit={this.state.isFormExpanded ? this.handleSubmit : this.expandForm}
                initialValues={this.state.initialFormData}
                validate={values => {
                  const errors = {};
                  if (values.password && values.repeatPassword) {
                    if(values.password.trim() !== values.repeatPassword.trim()){
                      errors.repeatPassword = "Пароли не совпадают"
                    }
                  }

                  return errors
                }}
                render={!this.state.isFormExpanded ? (
                  ({ handleSubmit })=>(
                    <form onSubmit={handleSubmit}>

                      {this.renderFields(this.formFields)}

                      <FormControl fullWidth margin={"normal"}>
                        <Button color="primary"
                                className={classes.button}
                                type={"submit"}>
                          Продолжить
                        </Button>
                      </FormControl>
                    </form>
                  )
                ) : (
                  ({ handleSubmit })=>(
                    <form onSubmit={handleSubmit}>

                      {this.renderFields( this.state.isEmailFirst ?
                                this.expandedFormFieldsEmailFirst : this.expandedFormFields)}

                      <FormControl fullWidth margin={"normal"}>
                        <Button color="primary"
                                className={classes.button}
                                type={"submit"}>
                          Продолжить
                        </Button>
                      </FormControl>
                    </form>
                  )
                )}/>
          <Typography paragraph align={"center"}>
            <Link href={"javascript:void(0)"}
                  variant="body1"
                  className={classes.link}
                  onClick={this.handleSwitchToLogin}>
              {'Уже есть аккаунт? Войдите в систему'}
            </Link>
          </Typography>

          <SnackBar
            variant={registrationNotification.type}
            open={registrationNotification.show}
            message={registrationNotification.message}
            onClose={this.handleSnackBarClose}
          />

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(Registration);
