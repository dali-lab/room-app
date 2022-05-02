import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, SafeAreaView, Button, ScrollView, Text,
} from 'react-native';
import {
  getAllUsers, signOutUser, getAllCalendarEvents,
  getForUser,
} from '../store/actions';
import { fonts } from '../constants/GlobalStyles';
import HomeCircles from '../components/HomeCircles';
import CalendarItem from '../components/CalendarItem';
import RequestItem from '../components/RequestItem';

const HomeScreen = (props) => {
  const {
    getCalendarEvents, signOut, calendarEvents, users, getUsers, user, requests, getRequests,
  } = props;

  useEffect(() => {
    getUsers(user.roomCode);
    getCalendarEvents(users?.map(({ id }) => id));
    getRequests(user.id);
  }, [users]); // eslint-disable-line react-hooks/exhaustive-deps
  // Fetch all calendarEvents when the component first loads

  return (
    <SafeAreaView style={styles.container}>
      <HomeCircles />
      <Button
        onPress={signOut}
        title="Log Out"
        color="green"
      />
      <Text style={styles.title}>Notifications</Text>
      <ScrollView>
        {calendarEvents?.map(({
          id, title, start, end, author, approvals, allDay,
        }) => <CalendarItem key={id} id={id} title={title} start={start} end={end} author={author} approvals={approvals} allDay={allDay} showButtons={false} />)}
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
    alignItems: 'center',
  },

  title: {
    fontSize: fonts.largeText,
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    marginLeft: 30,

  },

});

// testing
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    users: state.user.allUsers,
    calendarEvents: state.calendarEvent.allCalendarEvents,
    requests: state.request.allRequests,

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (roomcode) => {
      dispatch(getAllUsers(roomcode));
    },
    signOut: () => {
      dispatch(signOutUser());
    },
    getCalendarEvents: (users) => {
      dispatch(getAllCalendarEvents(users));
    },
    getRequests: (userID) => {
      dispatch(getForUser(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
