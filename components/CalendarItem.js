/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal,
} from 'react-native';
import moment from 'moment';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';

const CalendarItem = (props) => {
  const [showModal, setShowModal] = useState(false);
  const {
    title, start, end, author,
  } = props;
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
          <TouchableOpacity style={styles.approveButton} onPress={() => console.log('approved!')}>
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
          animationType="slide"
          visible={showModal}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}
        >
          {/* All views of Modal */}
          {/* Animation can be slide, slide, none */}
          <View style={styles.modalContainer}>
            <Text style={styles.text}>Modal is open!</Text>
            <TouchableOpacity style={styles.letsTalkButton} onPress={() => setShowModal(!showModal)}>
              <View>
                <Text>Close Modal</Text>
              </View>
            </TouchableOpacity>
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
    backgroundColor: '#ffffff',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    width: dimensions.screenWidth * 0.9,
    height: 80,
    marginTop: 100,
    margin: 20,
    alignItems: 'center',
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
});

export default CalendarItem;
