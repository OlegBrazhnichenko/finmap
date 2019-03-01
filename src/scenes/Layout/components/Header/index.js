import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

import {styles} from './styles';

class Header extends Component {

  static propTypes = {
    classes: PropTypes.object,
    className: PropTypes.string,
  };

  render() {

    const {classes} = this.props;

    return(
      <div className={classes.root}>
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar className={[this.props.className, classes.toolBar].join(" ")}>
            <img className={classes.logo} src={require('../../../../assets/finMapLogo.png')} alt="fin map logo" />
            <Typography className={classes.title} variant="subtitle1" color="inherit">
              Сервис финансово-управленческого учета для бизнеса
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(Header);
