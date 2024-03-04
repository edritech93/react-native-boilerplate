import {ShowAlertType} from '../types/ShowAlertType';
import {splashRequest} from '../actions/splash';
import {showAlert} from '../actions/app';
import {connect} from 'react-redux';
import Screen from '../screens/Splash';

const mapStateToProps = (state: any) => {
  const {loadingSlash} = state.splash;
  return {loadingSlash};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showAlert: (args: ShowAlertType) => dispatch(showAlert(args)),
    splashRequest: () => dispatch(splashRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
