import React, {Component} from 'react';
import LayoutComponent from './components';
import PropTypes from 'prop-types';

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.any,
  };

  render() {
    return (
      <LayoutComponent children={this.props.children}/>
    )
  }
}
