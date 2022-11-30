import {connect} from 'react-redux';
import Screen from './../screens/Dashboard';

const mapStateToProps = (state, ownProps) => {
  const {badge} = state.app;
  return {badge};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
