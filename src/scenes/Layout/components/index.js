import React, {Component} from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import Header from './Header';
import Footer from './Footer';

import {styles} from './styles';

class LayoutComponent extends Component {

  static propTypes = {
    children: PropTypes.any,
    classes: PropTypes.object,
  };

  render() {
    const {classes} = this.props;

    return (
      <CssBaseline>
        <Header className={classes.container}/>
        <main className={classes.container}>
          {this.props.children}
        </main>
        <Footer className={classes.container}/>
      </CssBaseline>
    )
  }
}

export default withStyles(styles)(LayoutComponent)
