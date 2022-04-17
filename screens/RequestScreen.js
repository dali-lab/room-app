/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import RequestItem from '../components/RequestItem';
import { getForUser } from '../store/actions';
import { fonts, colors } from '../constants/GlobalStyles';

const RequestScreen = (props) => {
  const { requests, getRequests, user } = props;

  // Fetch all requests when the component first loads
  useEffect(() => {
    getRequests(user.id);
  }, []);

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
        {requests?.map(({ author, description, completed }) => {
          return <RequestItem key={description} author={author} description={description} completed={completed} />;
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

const mapStateToProps = (state) => {
  return {
    requests: state.request.allRequests,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequests: (userID) => {
      dispatch(getForUser(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
