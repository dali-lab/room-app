/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal, TextInput, Switch, Platform,
} from 'react-native';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import { updateCalendarEvent, deleteCalendarEvent } from '../store/actions/calendarEvent';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Can use this function below, OR use Expo's Push Notification Tool-> https://expo.dev/notifications
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

const registerForPushNotificationsAsync = async () => {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  }
  // } else {
  //   alert('Must use physical device for Push Notifications');
  // }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return token;
};

const CalendarItem = (props) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const [showLetsTalkModal, setshowLetsTalkModal] = useState(false);
  const [showEditModal, setshowEditModal] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const {
    id, title, start, end, author, user, updateEvent, approvals, users, allDay, deleteEvent, showButtons,
  } = props;
  const [newTitle, setnewTitle] = useState('');
  const [newStartDate, setnewStartDate] = useState(new Date(start));
  const [newEndDate, setnewEndDate] = useState(new Date(end));
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisibility] = useState(false);
  const [newStartTime, setnewStartTime] = useState(new Date(start));
  const [newEndTime, setnewEndTime] = useState(new Date(end));
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] = useState(false);

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

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => (setExpoPushToken(token))).catch(() => {
      console.log('Promise Rejected');
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  const LeftActions = () => {
    return (
      <View style={styles.swipeContainer}>
        <TouchableOpacity style={styles.swipeItem} onPress={() => setshowEditModal(!showEditModal)}>
          <Text style={styles.swipeItemText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.swipeItem} onPress={() => deleteEvent(id, users.map(({ id }) => id))}>
          <Text style={styles.swipeItemText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleApprove = () => {
    const newEvent = {
      approvals: [...approvals, user],
      title,
      start,
      end,
      allDay,
      author,
    };
    updateEvent(id, newEvent, users.map(({ id }) => id));
  };

  const handleSave = () => {
    setshowEditModal(!showEditModal);
    const startDateTime = `${String(newStartDate.getFullYear())}-${String(newStartDate.getMonth())}-${String(newStartDate.getDate())}-${String(newStartTime.getHours())}-${String(newStartTime.getMinutes())}`;
    const start = moment(startDateTime, 'YYYY-MM-DD-hh-mm');
    const endDateTime = `${String(newEndDate.getFullYear())}-${String(newEndDate.getMonth())}-${String(newEndDate.getDate())}-${String(newEndTime.getHours())}-${String(newEndTime.getMinutes())}`;
    const end = moment(endDateTime, 'YYYY-MM-DD-hh-mm');
    const newEvent = {
      title: newTitle, start: start.toDate(), end: end.toDate(), author: user, allDay: switchOn, approvals,
    };
    updateEvent(id, newEvent, users.map(({ id }) => id));
  };

  return (
    <View style={styles.container}>
      {user.id === author.id
        ? (
          <View>
            <Swipeable renderLeftActions={LeftActions}>
              <View style={styles.eventContainer}>
                <Text style={styles.icon}>{`${author} icon`}</Text>
                <View style={styles.description}>
                  <Text style={styles.title}>{title}</Text>
                  <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
                </View>
                <Text style={styles.text}># of Likes</Text>
              </View>
            </Swipeable>
          </View>
        )
        : (
          <View>
            <View style={styles.eventContainer}>
              <Text style={styles.icon}>{`${author} icon`}</Text>
              <View style={styles.description}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
              </View>
              <Text style={styles.text}># of Likes</Text>
            </View>
            { showButtons
            && (
            <View style={styles.approveContainer}>
              <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
                <View>
                  <Text>Approve</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.letsTalkButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
                <Text>Let's Talk</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.letsTalkButton}
                onPress={async () => {
                  await sendPushNotification(expoPushToken);
                }}
              >
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Text>
                    Title:
                    {notification && notification.request.content.title}
                  </Text>
                  <Text>
                    Body:
                    {notification && notification.request.content.body}
                  </Text>
                  <Text>
                    Data:
                    {notification && JSON.stringify(notification.request.content.data)}
                  </Text>
                </View>
                <Text>"Press to Send Notification"</Text>
              </TouchableOpacity>
            </View>
            )}
          </View>
        )}
      <Modal
        animationType="fade"
        visible={showLetsTalkModal}
        transparent
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.letsTalkModalContainer}>
          <View style={styles.description}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Message</Text>
            <TextInput
              style={styles.inputTitle}
              placeholder="Optional"
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.modalButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
              <Text style={{ color: '#FFFFFF' }}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setshowLetsTalkModal(!showLetsTalkModal)}>
              <Text style={{ color: '#FFFFFF' }}>Send</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="fade"
        visible={showEditModal}
        transparent
        onRequestClose={() => {
          console.log('Modal has been closed.');
        }}
      >
        <View style={styles.swipeModalContainer}>
          <TouchableOpacity style={styles.exitButton} onPress={() => setshowEditModal(!showEditModal)}>
            <Text style={styles.text}>X</Text>
          </TouchableOpacity>

          <Text style={styles.icon}>INSERT CALENDAR LOGO INSERT CALENDAR LOGO INSERT CALENDAR LOGO</Text>
          <View style={styles.description}>
            <Text style={styles.title}>EDIT EVENT</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.text}>Title</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.inputTitle}
                value={newTitle}
                defaultValue={`${title}`}
                onChangeText={(text) => setnewTitle(text)}
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
            <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
              <Text style={{ color: '#FFFFFF' }}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    marginTop: 20,
    marginLeft: 20,
    justifyContent: 'center',
  },
  swipeContainer: {
    flexDirection: 'row',
    backgroundColor: colors.backgroundSageGreen,
  },
  eventContainer: {
    height: 80,
    width: dimensions.screenWidth * 0.9,
    backgroundColor: colors.backgroundSageGreen,
    alignItems: 'center',
    flexDirection: 'row',
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
  },
  approveContainer: {
    backgroundColor: colors.backgroundSageGreen,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    borderColor: colors.darkSageGreen,
    borderLeftWidth: 5,
  },
  letsTalkModalContainer: {
    backgroundColor: colors.backgroundSageGreen,
    width: dimensions.screenWidth * 0.8,
    height: 140,
    marginTop: dimensions.screenHeight * 0.3,
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
  description: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    height: 60,
    width: dimensions.screenWidth * 0.5,
  },
  title: {
    fontSize: fonts.largeText,
    color: colors.darkSageGreen,
    fontWeight: '600',
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
  },
  icon: {
    fontSize: 10,
    fontWeight: '300',
    marginLeft: 20,
    width: dimensions.screenWidth * 0.1,
  },
  approveButton: {
    backgroundColor: '#52BE64',
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
  },
  letsTalkButton: {
    backgroundColor: '#3398FF',
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
  },
  inputTitle: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.4,
    marginLeft: 10,
    height: dimensions.screenHeight * 0.03,
  },
  inputTime: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.2,
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
  swipeItem: {
    backgroundColor: colors.darkSageGreen,
    justifyContent: 'center',
    padding: 10,
    width: 60,
  },
  swipeItemText: {
    fontSize: fonts.smallText,
    color: '#ffffff',
  },
  inputContainer: {
    width: dimensions.screenWidth * 0.5,
    flexDirection: 'row',
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
  dateTimePickerButton: {
    backgroundColor: '#FFFFFF',
    marginLeft: 18,
  },
});

const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
    user: state.user.user,
    calendarEvents: state.calendarEvent.allCalendarEvents,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateEvent: (id, calendarEvent, users) => {
      dispatch(updateCalendarEvent(id, calendarEvent, users));
    },
    deleteEvent: (id, users) => {
      dispatch(deleteCalendarEvent(id, users));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarItem);
