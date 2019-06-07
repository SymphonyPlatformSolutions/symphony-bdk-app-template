import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { getDemoContent, updateDemoContent, deleteDemoContent } from '../../actions/action-demo';
import DemoComponentList from './demo-component-list';
/*
  -- DEMO
  Demo action, showing how to dispatch information into the Redux State, using the Api
  service.
  It can - and should - be deleted when developing your own integration.
*/

export function DemoContainer(props) {
  const {
    actions, loading, content, error,
  } = props;
  const [elementInProcess, toggleInProcess] = useState(null);
  useEffect(() => {
    actions.getDemoContent();
  }, []);

  if (!loading && (elementInProcess || elementInProcess === 0)) {
    toggleInProcess(null);
  }

  const submitCallback = (newContent) => {
    toggleInProcess(newContent.id);
    actions.updateDemoContent(newContent.id, newContent);
  };

  const deleteCallback = (id) => {
    toggleInProcess(id);
    actions.deleteDemoContent(id);
  };

  if (loading && (!elementInProcess && elementInProcess !== 0)) {
    return (<p>Loading something neat...</p>);
  }

  if (error) {
    return (
      <div>
        <h2>Oh oops! Something went wrong.</h2>
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      <DemoComponentList
        content={content}
        submitCallback={submitCallback}
        deleteCallback={deleteCallback}
        elementInProcess={elementInProcess}
      />
    </div>
  );
}

DemoContainer.propTypes = {
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  content: PropTypes.array,
  error: PropTypes.string,
};

DemoContainer.defaultProps = {
  loading: true,
  content: null,
  error: null,
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getDemoContent, updateDemoContent, deleteDemoContent }, dispatch),
});
const mapStateToProps = ({ demo: { loading, content, error } }) => ({ loading, content, error });

export default connect(mapStateToProps, mapDispatchToProps)(DemoContainer);
