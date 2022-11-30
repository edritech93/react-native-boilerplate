import {connect} from 'react-redux';
import {showAlert, languageAppIdChange} from '../actions/app';
import Screen from './../screens/Profile';

const mapStateToProps = (state, ownProps) => {
  const languageAppId = state.app.get('languageAppId');
  return {languageAppId};
};

const mapDispatchToProps = dispatch => {
  return {
    showAlert: args => dispatch(showAlert(args)),
    languageAppIdChange: args => dispatch(languageAppIdChange(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
