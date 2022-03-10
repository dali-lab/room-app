import React from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
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
      <ScrollView>
        {testRequests.map(({ user, description, completed }) => {
          return <RequestItem key={description} user={user} description={description} completed={completed} />;
        })}
      </ScrollView>
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
