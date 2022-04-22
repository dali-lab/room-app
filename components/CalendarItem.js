/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal, TextInput,
} from 'react-native';
import moment from 'moment';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import { updateCalendarEvent } from '../store/actions/calendarEvent';

const CalendarItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const {
    id, title, start, end, author, user, updateEvent, approvals, users,
  } = props;

  const handleApprove = () => {
    updateEvent(id, { approvals: [...approvals, user.id] }, users);
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.eventContainer}>
          <Text style={styles.icon}>{`${author} icon`}</Text>
          <View style={styles.description}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
          </View>
          <Text style={styles.text}># of Likes</Text>
        </View>
        <View style={styles.approveContainer}>
          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <View>
              <Text>Approve</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.letsTalkButton} onPress={() => setShowModal(!showModal)}>
            <Text>Let's Talk</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Modal
          animationType="fade"
          visible={showModal}
          transparent
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.description}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.text}>{`${moment(start).format('h:mm a')} - ${moment(end).format('h:mm a')}`}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.text}>Message</Text>
              <TextInput
                style={styles.input}
                placeholder="Optional"
              />
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(!showModal)}>
                <Text style={{ color: '#FFFFFF' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setShowModal(!showModal)}>
                <Text style={{ color: '#FFFFFF' }}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
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
  modalContainer: {
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
  input: {
    backgroundColor: '#FFFFFF',
    width: dimensions.screenWidth * 0.4,
    marginLeft: 10,
  },
  modalButton: {
    backgroundColor: colors.darkSageGreen,
    width: dimensions.screenWidth * 0.3,
    alignItems: 'center',
    margin: 10,
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarItem);
