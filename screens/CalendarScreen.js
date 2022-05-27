import React, { useEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents, createCalendarEvent } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import CalendarModal from '../components/CalendarModal';

const CalendarScreen = (props) => {
  const {
    getCalendarEvents, calendarEvents, users,
  } = props;

  const [showNewModal, setshowNewModal] = useState(false);

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents(users.map(({ id }) => id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  if (calendarEvents.length === 0) {
    return (
      <SafeAreaView style={styles.container}>

        <View style={{
          flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: 175,
        }}
        >
          <Image
            source={require('../assets/calendar.png')}
          />
          <CalendarModal showNewModal={showNewModal} setshowNewModal={setshowNewModal} />

          <Text style={styles.empty_title}>No Upcoming Events!</Text>
          <Text style={styles.empty_subtitle}>Click the plus button to create a new event</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setshowNewModal(!showNewModal)}>
            <Text style={{ color: '#FFFFFF', fontSize: 40 }}>+</Text>

          </TouchableOpacity>

        </View>
      </SafeAreaView>

    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Upcoming Events</Text>
          <TouchableOpacity style={styles.addButton} onPress={() => setshowNewModal(!showNewModal)}>
            <Text style={{ color: '#FFFFFF', fontSize: 40 }}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Swipe left on an event to edit or delete it</Text>
        <ScrollView>
          {calendarEvents?.map(({
            id, title, start, end, author, approvals, allDay,
          }) => <CalendarItem key={id} id={id} title={title} start={start} end={end} author={author} approvals={approvals} allDay={allDay} showButtons />)}

        </ScrollView>
        <CalendarModal showNewModal={showNewModal} setshowNewModal={setshowNewModal} />
      </SafeAreaView>

    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  empty_title: {
    fontSize: fonts.large24,
    textAlign: 'center',
    color: colors.darkSageGreen,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  empty_subtitle: {
    fontSize: fonts.smallText,
    textAlign: 'center',
    color: colors.darkSageGreen,
    marginLeft: 20,
    marginBottom: 3,
  },
  empty_addButton: {
    backgroundColor: colors.darkSageGreen,
    borderRadius: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: colors.darkSageGreen,
    borderRadius: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  swipeModalContainer: {
    backgroundColor: colors.backgroundSageGreen,
    width: dimensions.screenWidth * 0.8,
    height: dimensions.screenHeight * 0.5,
    marginTop: dimensions.screenHeight * 0.2,
    margin: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'space-around',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 60,
    shadowOpacity: 0.2,
  },
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: dimensions.screenWidth * 0.1,
  },
  exitButton: {
    borderWidth: 3,
    borderColor: colors.darkSageGreen,
    borderRadius: 20,

    width: dimensions.screenWidth * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.04,
    marginRight: dimensions.screenWidth * 0.6,
    marginTop: 10,
  },
  inputContainer: {
    width: dimensions.screenWidth * 0.5,
    flexDirection: 'row',
  },
  description: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    width: dimensions.screenWidth * 0.5,
  },
  inputTime: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.2,
    marginLeft: 10,
    height: dimensions.screenHeight * 0.03,
  },
  inputTitle: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.4,
    marginLeft: 10,
    height: dimensions.screenHeight * 0.03,
  },
  modalButton: {
    backgroundColor: colors.darkSageGreen,
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    height: dimensions.screenHeight * 0.03,
    margin: 10,
  },
  dateTimePickerButton: {
    backgroundColor: '#FFFFFF',
    marginLeft: 18,
  },
});

const mapStateToProps = (state) => {
  return {
    calendarEvents: state.calendarEvent.allCalendarEvents,
    users: state.user.allUsers,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createEvent: (calendarEvent, users) => {
      dispatch(createCalendarEvent(calendarEvent, users));
    },
    getCalendarEvents: (users) => {
      dispatch(getAllCalendarEvents(users));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);
