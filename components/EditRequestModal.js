/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import {
  StyleSheet, Text, TouchableOpacity, Modal, Image, TextInput, View,
} from 'react-native';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { updateRequest, changeRequestEditState } from '../store/actions';
import { fonts, colors, dimensions } from '../constants/GlobalStyles';

const EditRequestModal = (props) => {
  const {
    id, user, description, end, recipients, anonymous, updateUserRequest, showModal, setShowModal, changeEditState,
  } = props;

  const [requestDescription, setRequestDescription] = useState(description);
  // const [hours, setHours] = useState('');
  // const [minutes, setMinutes] = useState('');
  // const [days, setDays] = useState('');
  const [open, setOpen] = useState(false);
  const [newEndDate, setnewEndDate] = useState(new Date(end));
  const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
  const [newEndTime, setnewEndTime] = useState(new Date(end));
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const showEndDatePicker = () => {
    setEndDatePickerVisibility(true);
  };
  const hideEndDatePicker = () => {
    setEndDatePickerVisibility(false);
  };
  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };
  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };
  const handleConfirmEnd = (date) => {
    setnewEndDate(date);
    hideEndDatePicker();
  };
  const handleConfirmEndTime = (date) => {
    setnewEndTime(date);
    hideEndTimePicker();
  };
  const [value, setValue] = useState(user.roommates);
  const [items, setItems] = useState(value.map((roommate) => {
    return { label: roommate.firstName, value: roommate.id };
  }));

  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleRequest = () => {
    const endDateTime = `${String(newEndDate.getFullYear())}-${String(newEndDate.getMonth())}-${String(newEndDate.getDate())}-${String(newEndTime.getHours())}-${String(newEndTime.getMinutes())}`;
    const endTime = moment(endDateTime, 'YYYY-MM-DD-hh-mm');
    const newRequest = {
      description: requestDescription, author: user, anonymous: isAnonymous, recipients: value, end: endTime, upvotes: 0, downvotes: 0,
    };
    changeEditState(false);
    setShowModal(!showModal);
    updateUserRequest(id, newRequest);
  };

  return (
    <Modal
      visible={showModal}
      transparent
      onRequestClose={() => {
        console.log('Modal has been closed.');
      }}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.exitButton}
          onPress={() => setShowModal(!showModal)}
        >
          <Image
            // eslint-disable-next-line global-require
            source={require('../assets/x.png')}
          />
        </TouchableOpacity>
        <Image
          style={styles.logo}
            // eslint-disable-next-line global-require
          source={require('../assets/inactive-request.png')}
        />
        <Text style={styles.modalTitle}>Edit Request</Text>
        <Text style={styles.modalSubtitle}>Description</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRequestDescription(text)}
          value={requestDescription}
          placeholder={description}
        />
        <Text style={styles.modalSubtitle}>Expires on</Text>
        <View style={{ flexDirection: 'row' }}>
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

          </View>
        </View>
        {/* <View style={styles.row}>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            onChangeText={(text) => setDays(text)}
            value={days}
          />
          <Text style={styles.text1}>days</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            onChangeText={(text) => setHours(text)}
            value={hours}
          />
          <Text style={styles.text1}>hours</Text>
          <TextInput
            style={styles.timeInput}
            keyboardType="numeric"
            onChangeText={(text) => setMinutes(text)}
            value={minutes}
          />
          <Text style={styles.text1}>minutes</Text>
        </View> */}
        <Text style={styles.modalSubtitle}>Send to</Text>
        <View style={styles.recipientSelector}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            multiple
            mode="BADGE"
            badgeDotColors={['#e76f51', '#00b4d8', '#e9c46a', '#e76f51']}
          />
        </View>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => setIsAnonymous(!isAnonymous)}
          >
            <Image
            // eslint-disable-next-line global-require
              source={isAnonymous ? require('../assets/right.png') : require('../assets/left.png')}
              style={{
                marginTop: 8,
              }}
            />
          </TouchableOpacity>
          <Text style={styles.modalSubtitle}>submit anonymously</Text>
        </View>
        <TouchableOpacity
          style={styles.doneButton}
          onPress={handleRequest}
        >
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  text1: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
    marginTop: 13,
  },
  modalContainer: {
    backgroundColor: colors.lightGray,
    width: dimensions.screenWidth * 0.8,

    height: 550,
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
  exitButton: {
    alignSelf: 'flex-start',
    // marginTop: -80,
    marginBottom: -10,
    margin: dimensions.screenWidth * 0.05,
    width: 25,
    height: 25,
  },
  logo: {
    width: 100,
    height: 100,
    // marginBottom: -200,
  },
  modalTitle: {
    fontSize: fonts.large24,
    textAlign: 'center',
    color: colors.indigo700,
    fontWeight: 'bold',
  },
  modalSubtitle: {
    fontSize: fonts.smallText,
    textAlign: 'center',
    color: colors.indigo700,
    margin: 10,
  },
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    color: colors.darkSageGreen,
    marginBottom: 4,
  },
  timeInput: {
    height: 35,
    borderWidth: 1,
    padding: 10,
    color: colors.darkSageGreen,
    margin: 5,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    alignContent: 'flex-start',
  },
  recipientSelector: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
    margin: 10,
    zIndex: 100,
  },
  doneButton: {
    width: 93,
    height: 40,
    backgroundColor: colors.darkSageGreen,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  doneButtonText: {
    fontSize: fonts.large22,
    color: colors.lightGray,
  },
  dateTimePickerButton: {
    backgroundColor: colors.backgroundSageGreen,
    marginLeft: 18,
  },
  inputContainer: {
    width: dimensions.screenWidth * 0.5,
    flexDirection: 'row',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    // requestId: state.request.id, <- ngl I have no idea if that's right
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUserRequest: (requestId, request) => {
      dispatch(updateRequest(requestId, request));
    },
    changeEditState: (isEditing) => {
      dispatch(changeRequestEditState(isEditing));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRequestModal);
