import React from 'react';
import { default as PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import { enqueueSnackbar as enqueueSnackbarAction } from '@services/notification/actions';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      this.props.enqueueSnackbar({
        message: String(this.state.error),
        options: {
          key: new Date().getTime() + Math.random(),
          variant: 'warning',
          preventDuplicate: true,
        },
      });
      return null;
    }

    return this.props.children;
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    enqueueSnackbar: (...args) => dispatch(enqueueSnackbarAction(...args)),
    closeSnackbar: (...args) => dispatch(closeSnackbarAction(...args)),
  };
};

ErrorBoundary.propTypes = {
  children: PropTypes.any,
  enqueueSnackbar: PropTypes.func,
  closeSnackbar: PropTypes.func,
};
ErrorBoundary.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary);
