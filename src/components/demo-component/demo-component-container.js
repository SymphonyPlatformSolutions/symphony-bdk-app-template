import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import getDemoContent from '../../actions/action-demo';
import DemoComponent from './demo-component';
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

  useEffect(() => {
    actions.getDemoContent();
  }, []);

  if (loading || !content) {
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

  return <div>{content.map(el => <DemoComponent key={el.name} {...el} />)}</div>;
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
  actions: bindActionCreators({ getDemoContent }, dispatch),
});
const mapStateToProps = ({ demo: { loading, content, error } }) => ({ loading, content, error });

export default connect(mapStateToProps, mapDispatchToProps)(DemoContainer);
