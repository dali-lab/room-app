/* eslint-disable no-shadow */
/* eslint-disable global-require */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity, Modal, TextInput, Switch, Image,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents, createCalendarEvent } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const CalendarScreen = (props) => {
  const {
    getCalendarEvents, calendarEvents, users, createEvent, user,
  } = props;

  const [showNewModal, setshowNewModal] = useState(false);
  const [newTitle, setnewTitle] = useState('');
  const [newStartDate, setnewStartDate] = useState(new Date());
  const [newEndDate, setnewEndDate] = useState(new Date());
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [newStartTime, setnewStartTime] = useState(new Date());
  const [newEndTime, setnewEndTime] = useState(new Date());
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const showStartDatePicker = () => {
    setStartDatePickerVisibility(true);
  };
  const hideStartDatePicker = () => {
    setStartDatePickerVisibility(false);
  };
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };
  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };
  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };
  const handleConfirmStart = (date) => {
    setnewStartDate(date);
    hideStartDatePicker();
  };
  const handleConfirmEnd = (date) => {
    setnewEndDate(date);
    hideEndDatePicker();
  };
  const handleConfirmStartTime = (date) => {
    setnewStartTime(date);
    hideStartTimePicker();
  };
  const handleConfirmEndTime = (date) => {
    setnewEndTime(date);
    hideEndTimePicker();
  };

  const handleDone = () => {
    setshowNewModal(!showNewModal);
    const startDateTime = `${String(newStartDate.getFullYear())}-${String(newStartDate.getMonth() + 1)}-${String(newStartDate.getDate())}-${String(newStartTime.getHours())}-${String(newStartTime.getMinutes())}`;
    const start = moment(startDateTime, 'YYYY-MM-DD-hh-mm');
    const endDateTime = `${String(newEndDate.getFullYear())}-${String(newEndDate.getMonth() + 1)}-${String(newEndDate.getDate())}-${String(newEndTime.getHours())}-${String(newEndTime.getMinutes())}`;
    const end = moment(endDateTime, 'YYYY-MM-DD-hh-mm');
    const newEvent = {
      title: newTitle, start: start.toDate(), end: end.toDate(), author: user, allDay: switchOn, approvals: [],
    };
    createEvent(newEvent, users.map(({ id }) => id));
  };

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents(users?.map(({ id }) => id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  let currentDate = '';

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Upcoming Events</Text>
        <TouchableOpacity onPress={() => setshowNewModal(!showNewModal)}>
          <Image style={{ height: 60, width: 60, margin: 10 }} source={require('../assets/add-calendar-icon.png')} />
        </TouchableOpacity>
      </View>
      <View style={{ marginLeft: 20 }}>
        <Text style={styles.subtitle}>Swipe left on an event to edit or delete it</Text>
      </View>
      <ScrollView contentContainerStyle={{ alignItems: 'center' }}>
        {calendarEvents?.sort((a, b) => (new Date(a.start)) - (new Date(b.start))).map(({
          id, title, start, end, author, approvals, allDay,
        }) => {
          if (moment(currentDate).format('MM-DD') === moment(start).format('MM-DD')) {
            return (<CalendarItem key={id} id={id} title={title} start={start} end={end} author={author} approvals={approvals} allDay={allDay} showButtons />);
          } else {
            currentDate = start;
            return (
              <View key={id}>
                <Text style={styles.dateText}>{moment(start).format('dddd, MMMM Do')}</Text>
                <CalendarItem id={id} title={title} start={start} end={end} author={author} approvals={approvals} allDay={allDay} showButtons />
              </View>
            );
          }
        })}
      </ScrollView>
      <Modal
        animationType="fade"
        visible={showNewModal}
        transparent
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.swipeModalContainer}>
          <TouchableOpacity style={{ marginRight: dimensions.screenWidth * 0.6, marginTop: 5 }} onPress={() => setshowNewModal(!showNewModal)}>
            <Image style={{ height: 55, width: 55 }} source={require('../assets/exit-calendar-modal.png')} />
          </TouchableOpacity>

          <Image style={{ height: 125, width: 125 }} source={require('../assets/calendar-modal.png')} />
          <View style={styles.description}>
            <Text style={styles.editTitle}>NEW EVENT</Text>
          </View>
          <View style={{ flexDirection: 'row', margin: 8 }}>
            <Text style={styles.text}>Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputTitle}
                onChangeText={(text) => setnewTitle(text)}
                value={newTitle}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 8 }}>
            <Text style={styles.text}>All-Day</Text>
            <View style={styles.inputContainer}>
              <Switch value={switchOn}
                style={{ marginLeft: 10 }}
                onValueChange={() => {
                  setSwitchOn(!switchOn);
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 8 }}>
            <Text style={styles.timeText}>Start</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={showStartDatePicker}>
                <Text style={styles.text}>{`${moment(newStartDate).format('MMM DD')}`}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmStart}
                onCancel={hideStartDatePicker}
              />
              {!switchOn
                ? (
                  <View>
                    <TouchableOpacity style={styles.dateTimePickerButton} onPress={showStartTimePicker}>
                      <Text style={styles.text}>{`${moment(newStartTime).format('h:mm a')}`}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isStartTimePickerVisible}
                      mode="time"
                      onConfirm={handleConfirmStartTime}
                      onCancel={hideStartTimePicker}
                    />
                  </View>
                )
                : (
                  null
                )}
            </View>
          </View>
          <View style={{ flexDirection: 'row', margin: 8 }}>
            <Text style={styles.timeText}>End</Text>
            <View style={styles.inputContainer}>
              <TouchableOpacity style={styles.dateTimePickerButton} onPress={showEndDatePicker}>
                <Text style={styles.text}>{`${moment(newEndDate).format('MMM DD')}`}</Text>
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndDatePickerVisible}
                mode="date"
                onConfirm={handleConfirmEnd}
                onCancel={hideEndDatePicker}
              />
              {!switchOn
                ? (
                  <View>
                    <TouchableOpacity style={styles.dateTimePickerButton} onPress={showEndTimePicker}>
                      <Text style={styles.text}>{`${moment(newEndTime).format('h:mm a')}`}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                      isVisible={isEndTimePickerVisible}
                      mode="time"
                      onConfirm={handleConfirmEndTime}
                      onCancel={hideEndTimePicker}
                    />
                  </View>
                )
                : (
                  null
                )}
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  },
  dateText: {
    fontSize: fonts.smallText,
    textAlign: 'left',
    color: colors.darkSageGreen,
    marginBottom: 10,
    marginTop: 10,
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  timeText: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
    width: 35,
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
  doneButton: {
    backgroundColor: colors.darkSageGreen,
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
    margin: 20,
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
    marginLeft: 20,
    height: dimensions.screenHeight * 0.03,
    borderRadius: 10,
    padding: 4,
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
    borderRadius: 10,
    padding: 4,
  },
  editTitle: {
    fontSize: fonts.large24,
    textAlign: 'left',
    color: colors.darkSageGreen,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: fonts.largeText,
    color: '#FFFFFF',
    fontWeight: '600',
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
