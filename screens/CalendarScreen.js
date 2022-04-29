import React, { useEffect, useState } from 'react';
import {
  StyleSheet, ScrollView, SafeAreaView, Text, View, TouchableOpacity, Modal, TextInput, Switch,
} from 'react-native';
import { connect } from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarItem from '../components/CalendarItem';
import { getAllCalendarEvents } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const CalendarScreen = (props) => {
  const { getCalendarEvents, calendarEvents, users } = props;

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

  // Fetch all calendarEvents when the component first loads
  useEffect(() => {
    getCalendarEvents(users.map(({ id }) => id));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
          id, title, start, end, author, approvals,
        }) => <CalendarItem key={id} id={id} title={title} start={start} end={end} author={author} approvals={approvals} />)}
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
          <TouchableOpacity style={styles.exitButton} onPress={() => setshowNewModal(!showNewModal)}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>

          <Text style={styles.icon}>INSERT CALENDAR LOGO INSERT CALENDAR LOGO INSERT CALENDAR LOGO</Text>
          <View style={styles.description}>
            <Text style={styles.title}>NEW EVENT</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputTitle}
                onChangeText={(text) => setnewTitle(text)}
                value={newTitle}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>All-Day</Text>
            <View style={styles.inputContainer}>
              <Switch value={switchOn}
                onValueChange={() => {
                  setSwitchOn(!switchOn);
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Start</Text>
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
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>End</Text>
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
            <TouchableOpacity style={styles.modalButton} onPress={() => setshowNewModal(!showNewModal)}>
              <Text style={{ color: '#FFFFFF' }}>Save</Text>
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
