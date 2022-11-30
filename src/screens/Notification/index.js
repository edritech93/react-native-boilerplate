import React from 'react';
import {StyleSheet} from 'react-native';
import {PaddedView, Title} from '../../components';

export default function Notification(props) {
  return (
    <PaddedView style={styles.container}>
      <Title>Notification</Title>
    </PaddedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
