import {connect} from 'react-redux';
import {showAlert, themeAppIdChange} from '../actions/app';
import {profileChange} from '../actions/auth';
import Screen from './../screens/Home';

const mapStateToProps = (state, ownProps) => {
  return {
    ...Object.fromEntries(state.auth.entries()),
    ...Object.fromEntries(state.app.entries()),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: args => dispatch(showAlert(args)),
    themeAppIdChange: args => dispatch(themeAppIdChange(args)),
    profileChange: args => dispatch(profileChange(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
