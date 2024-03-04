import {ShowAlertType} from '../types/ShowAlertType';
import {showAlert, languageAppIdChange, themeAppIdChange} from '../actions/app';
import {connect} from 'react-redux';
import Screen from '../screens/Profile';

const mapStateToProps = (state: any) => {
  const {languageAppId, themeAppId} = state.app;
  return {languageAppId, themeAppId};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    showAlert: (args: ShowAlertType) => dispatch(showAlert(args)),
    languageAppIdChange: (args: string) => dispatch(languageAppIdChange(args)),
    themeAppIdChange: (args: number) => dispatch(themeAppIdChange(args)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Screen);
