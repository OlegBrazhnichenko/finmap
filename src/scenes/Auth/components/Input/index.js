import React, {Component} from 'react';
import PropTypes from 'prop-types';

import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import ErrorIcon from '@material-ui/icons/Error';
import InputAdornment from '@material-ui/core/InputAdornment';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  inputInput: {
    borderRadius: 5,
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    border: '1px solid transparent',
    fontSize: 16,
    width: "100%",
    padding: '10px 12px',
    boxShadow: '0 0 3.8rem rgba(81, 174, 203, 0.41)',
    transition: theme.transitions.create(['border']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      border: 'solid 1px rgba(81, 174, 203, 0.5)',
    },
  },
  positionEnd: {
    position: "absolute",
    right: "10px",
    height: "20px",
    zIndex: 100,
    color: "red",
  }
});

class Input extends Component {

  static propTypes = {
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    type: PropTypes.string,
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  };

  render() {

    const {placeholder, type, classes, error, ...rest} = this.props;

    return (
      <InputBase
        placeholder={placeholder}
        type={type}
        startAdornment={
          error ? (
            <InputAdornment
              position="end"
              classes={{
                positionEnd: classes.positionEnd,
              }}>
              <Tooltip title={error} placement="right">
                <ErrorIcon />
              </Tooltip>
            </InputAdornment>
          ) : null
        }
        classes={{
          input: classes.inputInput,
        }}
        {...rest}
      />
    )
  }
}

export default withStyles(styles)(Input);
