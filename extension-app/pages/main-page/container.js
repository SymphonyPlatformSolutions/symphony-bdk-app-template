import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getInstances } from 'reducers/instances/actions';
import { Loader, Box } from 'sms-sdk-toolbox-ui';
import MainPage from '.';

const MainPageContainer = (props) => {
  const {
    loading, instances, actions, match,
  } = props;
  let chosenTab = 0;
  if (match) {
    chosenTab = parseInt(match.params.tab, 10);
  }

  useEffect(() => {
    if (!instances) {
      actions.getInstances();
    }
  }, []);

  if (loading) {
    return <Box horizontal><Loader type="v2" /></Box>;
  }

  return (<MainPage instances={instances} chosenTab={chosenTab} />);
};

MainPageContainer.propTypes = {
};

MainPageContainer.defaultProps = {
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getInstances }, dispatch),
});

const mapStateToProps = state => ({
  loading: state.instances.loading,
  instances: state.instances.instances,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPageContainer);
