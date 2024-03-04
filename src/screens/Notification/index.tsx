import React from 'react';
import {StyleSheet} from 'react-native';
import {EmptyState, PaddedView} from '../../components';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackType} from '../../types/RootStackType';

interface INotification
  extends NativeStackScreenProps<RootStackType, 'Notification'> {}

export default function Notification(props: INotification) {
  console.log(props);
  return (
    <PaddedView style={styles.container}>
      <EmptyState label={'No Notification'} />
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
