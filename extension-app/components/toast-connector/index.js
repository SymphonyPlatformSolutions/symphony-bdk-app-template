import React from 'react';
import { ToasterConsumer } from 'sms-sdk-toolbox-ui';
import { connect } from 'react-redux';

const ToastConnector = (props) => {
  const {
    type, message,
  } = props;

  return (
    <ToasterConsumer>
      {(context) => {
        if (message) {
          console.log('NO?');
          context.showToast({
            message, type,
          });
        }
        return null;
      }}
    </ToasterConsumer>
  );


  // return (
  //   <ToasterConsumer>
  //     {context => (
  //       <button onClick={() => context.showToast({
  //         message: 'hup', type: 'success',
  //       })}
  //       >Come on
  //       </button>
  //     )}
  //   </ToasterConsumer>
  // );
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
