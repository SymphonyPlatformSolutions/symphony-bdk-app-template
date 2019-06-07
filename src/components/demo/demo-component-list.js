import React, { useState } from 'react';
import DemoComponent from './demo-component';

export default function DemoComponentList(props) {
  const {
    content, submitCallback, elementInProcess, deleteCallback,
    createCallback,
  } = props;

  const [isCreating, toggleCreating] = useState(false);
  const [requestSent, toggleSent] = useState(false);

  if (!content || !content.length) {
    return (
      <div>
        <p>Your fruit basket is empty!</p>
      </div>
    );
  }

  if (requestSent && elementInProcess !== 'new') {
    toggleCreating(false);
    toggleSent(false);
  }

  return (
    <div>
      {content.map(el => (
        <DemoComponent
          key={el.id}
          {...el}
          submitCallback={newValue => submitCallback({ id: el.id, ...newValue })}
          deleteCallback={() => deleteCallback(el.id)}
          isLoading={elementInProcess === el.id}
        />
      ))}
      {isCreating && (
      <DemoComponent
        isCreate
        submitCallback={(newValue) => { toggleSent(true); createCallback(newValue); }}
        cancelCreationCallback={() => toggleCreating(false)}
        isLoading={elementInProcess === 'new'}
      />
      )}
      {!isCreating && <button onClick={() => toggleCreating(true)}>Create</button>}
    </div>
  );
}
