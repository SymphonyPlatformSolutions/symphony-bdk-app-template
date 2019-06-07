import React, { useState } from 'react';
import DemoComponent from './demo-component';

export default function DemoComponentList(props) {
  const {
    content, submitCallback, elementInProcess, deleteCallback,
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
      {content.map(el => (
        <DemoComponent
          key={el.name}
          {...el}
          submitCallback={newValue => submitCallback({ id: el.id, ...newValue })}
          deleteCallback={() => deleteCallback(el.id)}
          isLoading={elementInProcess === el.id}
        />
      ))}
    </div>
  );
}
