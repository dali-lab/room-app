import React from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView, Text, TouchableOpacity,
} from 'react-native';
import { fonts, colors } from '../constants/GlobalStyles';
import RequestItem from '../components/RequestItem';

const testRequests = [
  {
    description: 'Request 1',
    user: 'KS',
    completed: false,
  },
  {
    description: 'Request 2',
    user: 'CG',
    completed: false,
  },
  {
    description: 'Request 3',
    user: 'CJ',
    completed: false,
  },
  {
    description: 'Request 4',
    user: 'JM',
    completed: false,
  },
];

const RequestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Requests</Text>
      <Text style={styles.subtitle}>Swipe left on a request to edit or delete it</Text>
      <TouchableOpacity
        style={styles.newEvent}
        onPress={() => console.log('create new event')}
      >
        <Text style={styles.plus}>+</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: fonts.large24,
    textAlign: 'left',
    color: colors.indigo700,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fonts.smallText,
    textAlign: 'left',
    color: colors.indigo700,
    marginLeft: 20,
    marginBottom: -15,
  },
  newEvent: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.indigo700,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: 20,
    marginBottom: 5,
  },
  plus: {
    color: colors.backgroundSageGreen,
    fontSize: 50,
  },
});

export default RequestScreen;
