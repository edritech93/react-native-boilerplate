import React, {useState, useEffect, Fragment} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  PaddedView,
  ScrollView,
  PrimaryButtonLoading,
  Title,
  Inputs,
  Text,
} from '../../components';
import {moderateScale} from '../../libs/scaling';
import {STORAGE} from '../../actions/types';
import {Fonts, Colors} from '../../themes';
import {CommonStyle} from '../../styles';
import {Helper} from '../../libs/Helper';
import {API} from '../../libs/api';
import {Formik} from 'formik';
import NavigationService from '../../libs/NavigationService';
import ObjStorage from '../../libs/ObjStorage';
import strings from '../../constants/localize';
import * as Yup from 'yup';

export default function Login(props) {
  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState({
    username: '',
    password: '',
    // username: 'user1@user.com',
    // password: '123qwe',
  });
  const [tokenFcm, setTokenFcm] = useState(null);

  async function _loadTokenFcm() {
    const token = await Helper.getTokenFcm();
    setTokenFcm(token);
  }

  const validateSchema = Yup.object().shape({
    username: Yup.string().required(`Email ${strings.IS_REQ}`),
    password: Yup.string()
      .min(6, `Password ${strings.MUST_AT_LEAST} 6 ${strings.CHAR}`)
      .required(`Password ${strings.IS_REQ}`),
  });

  useEffect(() => {
    async function _loadDataLogin() {
      const dataLogin = await ObjStorage.get(STORAGE.LOGIN_SAVED);
      if (dataLogin) {
        setInitialData({
          username: dataLogin.username,
          password: '',
        });
      }
    }
    _loadDataLogin();
    _loadTokenFcm();
  }, []);

  const _onSubmit = values => {
    setLoading(true);
    const bodySave = {
      username: values.username,
    };
    ObjStorage.set(STORAGE.LOGIN_SAVED, bodySave);

    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('scope', 'api1 offline_access');
    body.append('username', values.username);
    body.append('password', values.password);

    API.singleRequest(API.login(body))
      .then(response => {
        const dataLogin = response.data;
        Helper.setToken(dataLogin.access_token);
        Helper.setRefreshToken(dataLogin.refresh_token);
        props.isLoginChange(true);
        _loadAnotherApi();
      })
      .catch(error => {
        props.showAlert(error);
        setLoading(false);
      });
  };

  async function _loadAnotherApi() {
    const token = await Helper.getTokenFcm().catch(() => '');
    ObjStorage.set(STORAGE.DEVICE_TOKEN, token);

    API.singleRequest(API.getProfile())
      .then(response => {
        const dataProfile = {
          ...response.data.profile,
          email: response.data.email,
        };
        props.profileChange(dataProfile);
        const bodyToken = {
          token,
          deviceType: Platform.OS,
        };
        API.singleRequest(API.deviceAdd(bodyToken))
          .then(() => {})
          .catch(error => props.showAlert(error))
          .finally(() => {
            if (props.onModalProps) {
              props.onModalProps();
            }
            setLoading(false);
            _gotoDashboard();
          });
      })
      .catch(error => {
        props.showAlert(error);
        setLoading(false);
      });
  }

  function _gotoDashboard() {
    NavigationService.resetRoot('Dashboard');
  }

  return (
    <PaddedView>
      <KeyboardAvoidingView
        style={CommonStyle.flexOne}
        behavior={'padding'}
        enabled={Platform.OS === 'ios' ? true : false}>
        <ScrollView>
          <Title style={{marginBottom: moderateScale(27)}}>
            {strings.LOGIN}
          </Title>
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
                {/* NOTE: for testing only */}
                <Inputs
                  title={'Token FCM'}
                  value={tokenFcm}
                  onChange={value => {}}
                  containerStyle={{marginBottom: moderateScale(15)}}
                />
                <Inputs
                  title={'Email'}
                  value={values.username}
                  onBlur={() => setFieldTouched('username')}
                  onChange={handleChange('username')}
                  isError={touched.username && errors.username}
                  message={errors.username}
                  containerStyle={{marginBottom: moderateScale(15)}}
                />
                <Inputs
                  title={'Password'}
                  isPassword={true}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  onChange={handleChange('password')}
                  isError={touched.password && errors.password}
                  message={errors.password}
                  containerStyle={{marginBottom: moderateScale(9.5)}}
                />
                <TouchableOpacity style={styles.wrapForgot} onPress={() => {}}>
                  <Text
                    style={
                      styles.textForgot
                    }>{`${strings.FORGOT_PASSWORD}?`}</Text>
                </TouchableOpacity>

                <PrimaryButtonLoading
                  loading={loading}
                  title={strings.LOGIN}
                  disabled={!isValid}
                  onPress={handleSubmit}
                  style={{marginBottom: moderateScale(32)}}
                />
              </Fragment>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.wrapSignUp}>
        <Text>{'Test Direct to'}</Text>
        <TouchableOpacity
          style={styles.wrapForgot}
          onPress={() => _gotoDashboard()}>
          <Text style={styles.textSignUp}>{' Dashboard'}</Text>
        </TouchableOpacity>
      </View>
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  wrapForgot: {
    alignSelf: 'flex-end',
    marginBottom: moderateScale(26),
  },
  textForgot: {
    fontFamily: Fonts.type.medium,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(17),
    color: Colors.primary,
  },
  wrapLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(16),
  },
  lineStyle: {
    height: moderateScale(1),
    width: moderateScale(150),
    backgroundColor: Colors.black,
    opacity: 0.3,
  },
  textSosmed: {
    textAlign: 'center',
    marginBottom: moderateScale(16),
  },
  wrapSosmed: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: moderateScale(20),
  },
  wrapSignUp: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: moderateScale(16),
  },
  textSignUp: {
    fontFamily: Fonts.type.medium,
    color: Colors.accent,
  },
});
