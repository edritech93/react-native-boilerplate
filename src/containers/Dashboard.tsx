import {ShowAlertType} from '../types/ShowAlertType';
import {showAlert} from '../actions/app';
import {connect} from 'react-redux';
import Screen from '../screens/Dashboard';

const mapStateToProps = (state: any) => {
  const {badge} = state.notification;
  return {badge};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showAlert: (args: ShowAlertType) => dispatch(showAlert(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
