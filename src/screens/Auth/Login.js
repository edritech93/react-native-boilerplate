import React, {useState, useEffect, Fragment} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  PaddedView,
  ScrollView,
  Inputs,
  Text,
  PrimaryButton,
  Title,
  TextLink,
} from '../../components';
import {showLocalNotification} from '../../libs/NotificationService';
import {moderateScale} from '../../libs/scaling';
import {strings} from '../../constants/localize';
import {STORAGE} from '../../actions/types';
import {Helper} from '../../libs/Helper';
import {Colors} from '../../themes';
import {API} from '../../libs/api';
import {Formik} from 'formik';
import NavigationService from '../../libs/NavigationService';
import ObjStorage from '../../libs/ObjStorage';
import * as Yup from 'yup';

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    username: '',
    password: '',
  });
  const [tokenFcm, setTokenFcm] = useState(null);

  const validateSchema = Yup.object().shape({
    username: Yup.string().required(`Email ${strings.IS_REQ}`),
    password: Yup.string()
      .min(6, `Password ${strings.MUST_AT_LEAST} 6 ${strings.CHAR}`)
      .required(`Password ${strings.IS_REQ}`),
  });

  useEffect(() => {
    async function _loadDataLogin() {
      const objLogin = await ObjStorage.get(STORAGE.LOGIN_SAVED);
      if (objLogin) {
        setInitialData({
          username: objLogin.username,
          password: '',
        });
      }
    }
    _loadDataLogin();
    _loadTokenFcm();
  }, []);

  async function _loadTokenFcm() {
    const token = await Helper.getTokenFcm().catch(() => null);
    console.log('------------------------------------');
    console.log('_loadTokenFcm => ', token);
    console.log('------------------------------------');
    setTokenFcm(token);
  }

  const _onSubmit = values => {
    setLoading(true);
    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('scope', 'api1 offline_access');
    body.append('username', values.username);
    body.append('password', values.password);
    API.singleRequest(API.login(body))
      .then(response => {
        const objRes = response.data;
        Helper.setToken(objRes.access_token);
        Helper.setRefreshToken(objRes.refresh_token);
        const bodySave = {username: values.username};
        ObjStorage.set(STORAGE.LOGIN_SAVED, bodySave);
        _loadAnotherApi();
      })
      .catch(error => {
        props.showAlert(error);
        setLoading(false);
      });
  };

  async function _loadAnotherApi() {
    API.singleRequest(API.getProfile())
      .then(response => {
        props.profileChange(response.data);
        _submitFcmToken();
      })
      .catch(error => {
        props.showAlert(error);
        setLoading(false);
      });
  }

  async function _submitFcmToken() {
    const token = await Helper.getTokenFcm().catch(() => '');
    ObjStorage.set(STORAGE.DEVICE_TOKEN, token);
    const body = {
      token,
      deviceType: Platform.OS,
    };
    API.singleRequest(API.deviceAdd(body))
      .then(() => {})
      .catch(error => props.showAlert(error))
      .finally(() => {
        setLoading(false);
        _gotoDashboard();
      });
  }

  function _gotoDashboard() {
    NavigationService.resetRoot('Dashboard');
  }

  function _onShowNotification() {
    showLocalNotification('Title Local Notif', 'Description Local Notif');
  }

  const _onPressForgot = () => {
    props.showAlert({message: 'Comming Soon'});
  };

  return (
    <PaddedView>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={'padding'}
        enabled={Platform.OS === 'ios' ? true : false}>
        <ScrollView>
          <Formik
            initialValues={initialData}
            enableReinitialize={true}
            onSubmit={_onSubmit}
            validationSchema={validateSchema}>
            {({
              values,
              handleChange,
              errors,
              setFieldTouched,
              touched,
              isValid,
              handleSubmit,
            }) => (
              <Fragment>
                <Title style={styles.textTitle}>{'Login Here...'}</Title>
                {/* NOTE: for testing only */}
                <Inputs
                  title={'Token FCM'}
                  value={tokenFcm}
                  onChangeText={value => {}}
                  containerStyle={styles.wrapForm}
                />
                <Inputs
                  title={'Email'}
                  value={values.username}
                  onBlur={() => setFieldTouched('username')}
                  onChangeText={handleChange('username')}
                  isError={touched.username && errors.username}
                  message={errors.username}
                  containerStyle={styles.wrapForm}
                />
                <Inputs
                  title={'Password'}
                  isPassword={true}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  isError={touched.password && errors.password}
                  message={errors.password}
                  containerStyle={styles.wrapForm}
                />
                <TouchableOpacity
                  style={styles.wrapForgot}
                  onPress={_onPressForgot}>
                  <Text
                    style={
                      styles.textForgot
                    }>{`${strings.FORGOT_PASSWORD}?`}</Text>
                </TouchableOpacity>
                <PrimaryButton
                  title={strings.LOGIN}
                  disabled={!isValid || loading}
                  loading={loading}
                  onPress={handleSubmit}
                  style={styles.wrapForm}
                />
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <TextLink
        title={'Go to Dashboard, '}
        link={'Test'}
        onPress={() => _gotoDashboard()}
        style={styles.wrapForm}
      />
      <TextLink
        title={'Local Notification, '}
        link={'Test'}
        onPress={() => _onShowNotification()}
      />
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  textTitle: {
    marginBottom: moderateScale(16),
    marginTop: moderateScale(32),
  },
  wrapForm: {
    marginBottom: moderateScale(8),
  },
  wrapForgot: {
    alignSelf: 'flex-end',
    padding: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  textForgot: {
    fontSize: moderateScale(14),
    lineHeight: moderateScale(17),
    color: Colors.primary,
  },
});
