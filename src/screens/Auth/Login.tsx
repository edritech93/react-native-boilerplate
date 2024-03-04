import React from 'react';
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
  SecondaryButton,
  AccentButton,
} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ShowAlertType} from '../../types/ShowAlertType';
import {LoginBodyType} from '../../types/LoginBodyType';
import {RootStackType} from '../../types/RootStackType';
import {moderateScale} from '../../libs/scaling';
import {strings} from '../../constants/localize';
import {STORAGE} from '../../actions/types';
import {Helper} from '../../libs/Helper';
import {Colors} from '../../themes';
import {Formik} from 'formik';
import NavigationService from '../../libs/NavigationService';
import ObjStorage from '../../libs/ObjStorage';
import * as Yup from 'yup';

interface ILogin extends NativeStackScreenProps<RootStackType, 'Login'> {
  loadingLogin: boolean;
  loginRequest: (args: any) => void;
  showAlert: (args: ShowAlertType) => void;
}

export default function Login(props: ILogin) {
  const {loadingLogin} = props;

  const [initialData, setInitialData] = React.useState<LoginBodyType>({
    username: 'admin',
    password: '123qwe',
  });
  const [tokenFcm, setTokenFcm] = React.useState<any>(null);

  const validateSchema = Yup.object().shape({
    username: Yup.string().required(`Email ${strings.IS_REQ}`),
    password: Yup.string()
      .min(6, `Password ${strings.MUST_AT_LEAST} 6 ${strings.CHAR}`)
      .required(`Password ${strings.IS_REQ}`),
  });

  React.useEffect(() => {
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

  const _onSubmit = (values: LoginBodyType) => {
    const bodySave = {username: values.username};
    ObjStorage.set(STORAGE.LOGIN_SAVED, bodySave);
    const body = new FormData();
    body.append('grant_type', 'password');
    body.append('scope', 'api1 offline_access');
    body.append('username', values.username);
    body.append('password', values.password);
    props.loginRequest(body);
  };

  function _gotoDashboard() {
    NavigationService.resetRoot('Dashboard');
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
              <React.Fragment>
                <Title style={styles.textTitle}>{'Login Here...'}</Title>
                {/* NOTE: for testing only */}
                <Inputs
                  title={'Token FCM'}
                  value={tokenFcm}
                  onChangeText={(value: string) => console.log(value)}
                  containerStyle={styles.wrapForm}
                />
                <Inputs
                  title={'Email'}
                  value={values.username}
                  onBlur={() => setFieldTouched('username')}
                  onChangeText={handleChange('username')}
                  error={touched.username && errors.username}
                  message={errors.username}
                  containerStyle={styles.wrapForm}
                />
                <Inputs
                  title={'Password'}
                  isPassword={true}
                  value={values.password}
                  onBlur={() => setFieldTouched('password')}
                  onChangeText={handleChange('password')}
                  error={touched.password && errors.password}
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
                  disabled={!isValid || loadingLogin}
                  loading={loadingLogin}
                  onPress={handleSubmit}
                  style={styles.wrapForm}
                />
                <SecondaryButton title={'Register'} onPress={() => {}} />
                <AccentButton title={'OK 123qwe'} onPress={() => {}} />
              </React.Fragment>
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
