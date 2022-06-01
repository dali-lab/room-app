import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';
import {
  StyleSheet, SafeAreaView, Button, ScrollView, Text,
} from 'react-native';
import {
  getAllUsers, signOutUser, getAllCalendarEvents,
  getAllRequests,
} from '../store/actions';
import { fonts } from '../constants/GlobalStyles';
import HomeCircles from '../components/HomeCircles';
import CalendarItem from '../components/CalendarItem';
import RequestItem from '../components/RequestItem';

const HomeScreen = (props) => {
  const {
    getCalendarEvents, signOut, calendarEvents, users, getUsers, user, requests, getRequests,
  } = props;

  const isFocused = useIsFocused();

  useEffect(() => {
    getUsers(user.roomCode);
    getCalendarEvents(users?.map(({ id }) => id));
    getRequests(user.id);
  }, [user, isFocused]); // eslint-disable-line react-hooks/exhaustive-deps
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
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {calendarEvents?.sort((a, b) => a.start - b.start).map(({
          id, title, start, end, author, approvals, allDay,
        }) => <CalendarItem key={id} id={id} title={title} start={start} end={end} author={author} approvals={approvals} allDay={allDay} showButtons={false} />)}
        {requests?.map(({
          id, author, description, completed, upvotes, downvotes,
        }) => {
          return <RequestItem key={id} id={id} author={author} description={description} completed={completed} upvotes={upvotes} downvotes={downvotes} />;
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
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
      dispatch(getAllRequests(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
