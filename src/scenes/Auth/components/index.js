import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Login from './Login';
import Registration from './Registration';
import ForgotPassword from './ForgotPassword';

import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    padding: "50px 0",
  },
  playButton: {
    willChange: "transform",
    webkitTransition: "-webkit-transform .5s ease",
    oTransition: "transform .5s ease",
    transition: "transform .5s ease, -webkit-transform .5s ease",
    border: 0,
    position: "absolute",
    top: "-webkit-calc(50% - 3.1rem)",
    left: "-webkit-calc(50% - 3.1rem)",
    width: "6.2rem",
    height: "6.2rem",
    backgroundColor: "transparent",
    overflow: "visible",
    display: "block",

  },
  inner: {
    webkitTransform: "scale(0.17)",
    msTransform: "scale(0.17)",
    transform: "scale(0.17)",
    display: "block",
    width: "300px",
    height: "300px",
    background: "#222",
    webkitBorderRadius: "50%",
    borderRadius: "50%",
    backgroundImage: "linear-gradient(-130deg, #57de8b 0%, #50a9d2 100%)",
    "-webkit-clip-path": "polygon(679px 61px, 45px -239px, -87px 441px, 1024px 406px, 258px 122px, 114px 227px, 114px 71px, 226px 154px)",
    clipPath: "polygon(679px 61px, 45px -239px, -87px 441px, 1024px 406px, 258px 122px, 114px 227px, 114px 71px, 226px 154px)",
    webkitAnimation: "anm-play-btn 2.9s infinite linear both",
    animation:"anm-play-btn 2.9s infinite linear both",
    willChange: "transform",
    webkitBackfaceVisibility: "hidden",
    backfaceVisibility: "hidden",
    webkitTransition: "-webkit-transform .4s ease",
    transition: "transform .4s ease, -webkit-transform .4s ease",
    position: "relative",
    top: "-100px",
    left: "-100px",
  },
  outer: {
    display: "inline-block",
    width: "100%",
    height: "100%",
    position: "relative",
    cursor: "pointer",
    webkitBorderRadius: "50%",
    borderRadius: "50%",
    willChange: "transform",
    webkitTransition: "-webkit-transform .4s ease",
    oTransition: "transform .4s ease",
    transition: "transform .4s ease, -webkit-transform .4s ease",
  },
  iframeDialog: {
    width: "535px",
    height: "300px",
  },
  authForms: {
    [theme.breakpoints.down('sm')]: {
      marginBottom: "40px",
    },
  }
});

class AuthComponent extends Component {
  static propTypes = {
    authStep: PropTypes.string,

    onLogin: PropTypes.func,
    loginNotification: PropTypes.object,

    onPasswordRemind: PropTypes.func,
    passwordRemindNotification: PropTypes.object,

    onRegistration: PropTypes.func,
    registrationNotification: PropTypes.object,

    onResetNotifications: PropTypes.func,

    classes: PropTypes.object,
    switchToLogin: PropTypes.func,
    switchToRegistration: PropTypes.func,
    switchToForgotPassword: PropTypes.func,
  };

  constructor() {
    super();

    this.handlePlayButtonClick = this.handlePlayButtonClick.bind(this);

    this.state = {
      openDialog: false,
    }
  }

  handlePlayButtonClick() {
    this.setState({
      openDialog: true,
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid container justify={"space-around"} className={classes.container}>
        <Grid classes={{item:classes.authForms}} container item xs={11} sm={8} md={4} alignItems={"center"} alignContent={"center"}>
          {{
            "/login": <Login onLogin={this.props.onLogin}
                             loginNotification={this.props.loginNotification}
                             onResetNotifications={this.props.onResetNotifications}
                             onSwitchToRegistration={this.props.switchToRegistration}
                             onSwitchToForgotPassword={this.props.switchToForgotPassword}/>,

            "/registration": <Registration onSwitchToLogin={this.props.switchToLogin}
                                           onRegistration={this.props.onRegistration}
                                           registrationNotification={this.props.registrationNotification}
                                           onResetNotifications={this.props.onResetNotifications}/>,

            "/forgot-password": <ForgotPassword onSwitchToLogin={this.props.switchToLogin}
                                                onPasswordRemind={this.props.onPasswordRemind}
                                                passwordRemindNotification={this.props.passwordRemindNotification}
                                                onResetNotifications={this.props.onResetNotifications}/>
          }[this.props.authStep]}
        </Grid>
        <Grid container item xs={11} sm={9} md={6} alignItems={"center"} alignContent={"center"}>
          <div style={{margin: "0 auto",position:"relative"}}>
            <span className={[classes.devicesSliderPlay,classes.playButton].join(" ")}>
              <span className={classes.outer} onClick={this.handlePlayButtonClick}>
                <span className={classes.inner} />
              </span>
            </span>
            <img style={{width:"450px", height:"300px"}} src={require('../../../assets/laptop.png')} alt=""/>
          </div>
          <Dialog
            onClose={()=>{this.setState({openDialog:false})}}
            aria-labelledby="customized-dialog-title"
            open={this.state.openDialog}
            classes={{
              paper: classes.iframeDialog
            }}
          >
            <iframe id="js-video-player-0"
                    frameBorder={0}
                    allowFullScreen={1}
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    title="YouTube video player"

                    style={{width:"100%",height:"100%"}}
                    src="https://www.youtube.com/embed/AQEf9CvRKyU?rel=0&amp;showinfo=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Ffinmap.online&amp;widgetid=1" />

          </Dialog>

        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(AuthComponent);
