import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class SnackBar extends Component {
  static propTypes = {
    classes: PropTypes.object,
    message: PropTypes.any,
    variant: PropTypes.string,
    open: PropTypes.bool,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    variant: "info",
  };

  variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };

  render(){
    const { classes, message, variant, open, onClose} = this.props;
    const Icon = this.variantIcon[variant];

    return (
      <Snackbar
        classes={{
          anchorOriginTopRight: classes.anchorOriginTopRight
        }}
        open={open}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        autoHideDuration={3000}
        onClose={onClose}>

        <SnackbarContent
          className={classes[variant]}
          aria-describedby="client-snackbar"
          message={
            <span id="client-snackbar" className={classes.message}>
              <Icon className={[classes.icon, classes.iconVariant].join(" ")} />
                  {message}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={()=>{onClose()}}
            >
              <CloseIcon className={classes.icon} />
            </IconButton>,
          ]}
        />
      </Snackbar>
    );
  }
}

export default withStyles(styles)(SnackBar);
