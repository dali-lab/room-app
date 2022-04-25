import React, { useEffect } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents } from '../store/actions';
import { fonts, colors } from '../constants/GlobalStyles';

const CalendarScreen = (props) => {
  const { getCalendarEvents, calendarEvents, users } = props;

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents(users.map(({ id }) => id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <Text style={styles.subtitle}>Swipe left on an event to edit or delete it</Text>
      <ScrollView>
        {calendarEvents?.map(({
          id, title, start, end, author, approvals,
        }) => <CalendarItem key={id} id={id} title={title} start={start} end={end} author={author} approvals={approvals} />)}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: fonts.large24,
    textAlign: 'left',
    color: colors.darkSageGreen,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fonts.smallText,
    textAlign: 'left',
    color: colors.darkSageGreen,
    marginLeft: 20,
    marginBottom: 3,
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    calendarEvents: state.calendarEvent.allCalendarEvents,
    users: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCalendarEvents: (users) => {
      dispatch(getAllCalendarEvents(users));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
