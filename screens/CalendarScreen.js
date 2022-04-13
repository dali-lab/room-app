import React, { useEffect } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents } from '../store/actions';
import { fonts } from '../constants/GlobalStyles';

// const testEvents = [
//   {
//     title: 'Event 1',
//     user: 'Kaylie',
//     startTime: '10:00 am',
//     endTime: '10:30 am',
//   },
//   {
//     title: 'Event 2',
//     user: 'Chelsea',
//     startTime: '1:00 pm',
//     endTime: '2:00 pm',
//   },
//   {
//     title: 'Event 3',
//     user: 'Jorie',
//     startTime: '9:00 am',
//     endTime: '10:30 am',
//   },
//   {
//     title: 'Event 4',
//     user: 'Claire',
//     startTime: '4:00 pm',
//     endTime: '5:00 pm',
//   },
// ];

const CalendarScreen = (props) => {
  const { getCalendarEvents, calendarEvents } = props;

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents('123abc');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(calendarEvents);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* {calendarEvents.map(({
          title, start, end,
        }) => <CalendarItem key={title} title={title} start={start} end={end} />)} */}
        <CalendarItem calendarEvents={calendarEvents} />
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

const mapStateToProps = (state) => {
  return {
    calendarEvents: state.calendarEvent.allCalendarEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCalendarEvents: (roomCode) => {
      dispatch(getAllCalendarEvents(roomCode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
