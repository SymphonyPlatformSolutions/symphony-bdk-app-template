import React, { useState, useEffect } from 'react';
import { ToasterConsumer } from 'sms-sdk-toolbox-ui';
import { connect } from 'react-redux';

const ToastConnector = (props) => {
  const {
    type, message,
  } = props;

  const [hasMessage, setHasMessage] = useState(false);

  useEffect(() => {
    if (message && type) {
      setHasMessage(true);
    }
  }, [message, type]);

  return (
    <ToasterConsumer>
      {(context) => {
        if (hasMessage) {
          context.showToast({ message, type });
          setHasMessage(false);
        }
        return null;
      }}
    </ToasterConsumer>
  );
};

ToastConnector.propTypes = {
};

ToastConnector.defaultProps = {
};

const mapDispatchToProps = () => ({});

const mapStateToProps = state => ({
  message: state.toast.message,
  type: state.toast.type,
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastConnector);
