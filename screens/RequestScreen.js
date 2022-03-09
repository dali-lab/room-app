import React from 'react';
import {
  StyleSheet, View,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts } from '../styles/GlobalStyles';
import RequestItem from '../components/RequestItem';

const testRequests = [
  {
    description: 'Request 1',
    user: 'Kaylie',
    completed: false,
  },
  {
    description: 'Request 2',
    user: 'Claire',
    completed: false,
  },
  {
    description: 'Request 3',
    user: 'Chelsea',
    completed: false,
  },
  {
    description: 'Request 4',
    user: 'Jorie',
    completed: false,
  },
];

const RequestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        {testRequests.map(({ user, description, completed }) => {
          return <RequestItem key={description} user={user} description={description} completed={completed} />;
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
});

export default RequestScreen;
