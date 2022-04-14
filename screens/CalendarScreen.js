import React, { useEffect } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents } from '../store/actions';
import { fonts } from '../constants/GlobalStyles';

const CalendarScreen = (props) => {
  const { getCalendarEvents, calendarEvents } = props;

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents(['624eefbcfb7a79a5eadd6edb', '624f00380a0fc0aaff99396f']);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(calendarEvents);

  return (
    <SafeAreaView style={styles.container}>
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
