import React, { useEffect } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents } from '../store/actions';
import { fonts, colors } from '../constants/GlobalStyles';

const CalendarScreen = (props) => {
  const { getCalendarEvents, calendarEvents } = props;

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents(['624eefbcfb7a79a5eadd6edb', '624f00380a0fc0aaff99396f']);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(calendarEvents);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Upcoming Events</Text>
      <Text style={styles.subtitle}>Swipe left on an event to edit or delete it</Text>
      <ScrollView>
        {calendarEvents?.map(({
          id, title, start, end, author,
        }) => <CalendarItem key={id} title={title} start={start} end={end} author={author} />)}
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
