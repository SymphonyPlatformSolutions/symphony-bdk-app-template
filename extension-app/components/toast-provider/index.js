import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Toast from 'components/commons/toast';
import { removeToast } from 'reducers/toast/actions';

/**
 * Container component for the Toast. Handles Redux state changes and actions.
 * Mainly, the __removeToast__ action.
 */
const ToastProvider = (props) => {
  const {
    toastType, isOpen, toastText, codeError,
  } = props;

  if (!isOpen) {
    return null;
  }

  return (
    <Toast
      title="Global toast"
      toastType={toastType}
      toastText={toastText}
      toastHide={props.actions.removeToast} /*eslint-disable-line*/
      isOpen={isOpen}
      codeError={codeError}
    />
  );
};


ToastProvider.propTypes = {
  /** Whether the toast should be shown or not. Comes from redux's ```state.toast.isOpen``` */
  isOpen: PropTypes.bool,
  /** Text to be shown on the Toast. Comes from redux's ```state.toast.toastText``` */
  toastText: PropTypes.string,
  /**
   *  Toast type can be **success** or **error**, and dictates icon and color scheme.
   * Comes from redux's ```state.toast.toastType```
   */
  toastType: PropTypes.string,
  /**
   * Possible error code, to render differente Errors.
   * Comes from redux's ```state.toast.codeError```
   */
  codeError: PropTypes.number,
};

ToastProvider.defaultProps = {
  isOpen: undefined,
  toastText: undefined,
  toastType: undefined,
  codeError: undefined,
};

const mapDispathToProps = dispath => ({
  actions: bindActionCreators({ removeToast }, dispath),
});

const mapStateToProps = state => ({
  toastType: state.toast.toastType,
  isOpen: state.toast.isOpen,
  toastText: state.toast.toastText,
  codeError: state.toast.errorData,
});

export default connect(mapStateToProps, mapDispathToProps)(ToastProvider);
