import React from 'react';
import PropTypes from 'prop-types';
import DemoComponent from '../demo-component';

export default function DemoComponentList(props) {
  const {
    content, submitHandler, deleteHandler,
    createHandler, addEmptyComponentHandler, cancelCreationHandler,
  } = props;

  if (!content || !content.length) {
    return (
      <div>
        <p>Your fruit basket is empty!</p>
      </div>
    );
  }

  return (
    <div>
      {content.map((el, index) => (
        <DemoComponent
          key={el.id}
          isCreate={el.id === null}
          {...el}
          submitHandler={(newValue) => {
            if (el.id !== null) {
              submitHandler({ id: el.id, ...newValue });
            } else {
              createHandler(newValue);
            }
          }}
          innerIndex={index}
          cancelCreationHandler={() => cancelCreationHandler()}
          deleteHandler={() => deleteHandler(el.id)}
        />
      ))}
      <button type="button" onClick={() => addEmptyComponentHandler()}>Create</button>
    </div>
  );
}

DemoComponentList.propTypes = {
  content: PropTypes.array,
  submitHandler: PropTypes.func.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  createHandler: PropTypes.func.isRequired,
  addEmptyComponentHandler: PropTypes.func.isRequired,
  cancelCreationHandler: PropTypes.func.isRequired,
};

DemoComponentList.defaultProps = {
  content: null,
};
