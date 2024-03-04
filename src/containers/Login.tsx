import {ShowAlertType} from '../types/ShowAlertType';
import {loginRequest} from '../actions/auth';
import {showAlert} from '../actions/app';
import {connect} from 'react-redux';
import Screen from '../screens/Auth/Login';

const mapStateToProps = (state: any) => {
  const {loadingLogin} = state.auth;
  return {loadingLogin};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showAlert: (args: ShowAlertType) => dispatch(showAlert(args)),
    loginRequest: (args: any) => dispatch(loginRequest(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
