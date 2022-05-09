/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, Modal, Image, TextInput, View,
} from 'react-native';
import { connect } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import moment from 'moment';
import RequestItem from '../components/RequestItem';
import { getForUser, createRequest } from '../store/actions';
import { fonts, colors, dimensions } from '../constants/GlobalStyles';

const RequestScreen = (props) => {
  const {
    requests, getRequests, user, createUserRequest,
  } = props;

  // Fetch all requests when the component first loads
  useEffect(() => {
    getRequests(user.id);
  }, []);

  const [showModal, setShowModal] = useState(false);
  const [requestDescription, setRequestDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [days, setDays] = useState('');
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(user.roommates);
  // const [value, setValue] = useState(['claire', 'kaylie', 'jorie', 'chelsea']);
  const [items, setItems] = useState(value.map((roommate) => {
    return { label: roommate.firstName, value: roommate.id };
  }));

  // [
  //   { label: user.roommates.map(label => user.firstName), value: user.roommates.firstName },
  //   // { label: 'Claire', value: 'claire' },
  //   // { label: 'Kaylie', value: 'kaylie' },
  //   // { label: 'Chelsea', value: 'chelsea' },
  //   // { label: 'Jorie', value: 'Jorie' },
  // ]
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleRequest = () => {
    const endTime = moment().add(days, 'd').add(hours, 'h').add(minutes, 'm');
    const newRequest = {
      description: requestDescription, author: user, anonymous: isAnonymous, recipients: value, end: endTime, upvotes: 0, downvotes: 0,
    };
    setShowModal(!showModal);
    createUserRequest(newRequest);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Requests</Text>
        <TouchableOpacity
          style={styles.newEvent}
          onPress={() => setShowModal(!showModal)}
        >
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Swipe left on a request to edit or right delete it</Text>

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
          <Text style={styles.modalTitle}>New Request</Text>
          <Text style={styles.modalSubtitle}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setRequestDescription(text)}
            value={requestDescription}
            placeholder="Enter a description"
          />
          <Text style={styles.modalSubtitle}>Expires in</Text>
          <View style={styles.row}>
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
          </View>
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
      <ScrollView>
        {requests?.map(({ author, description, completed }) => {
          return <RequestItem key={description} author={author} description={description} completed={completed} />;
        })}
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
  text1: {
    fontSize: fonts.smallText,
    color: colors.darkSageGreen,
    marginTop: 13,
  },
  title: {
    fontSize: fonts.large24,
    textAlign: 'left',
    color: colors.indigo700,
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: fonts.smallText,
    textAlign: 'left',
    color: colors.indigo700,
    marginLeft: 20,
  },
  newEvent: {
    backgroundColor: colors.indigo700,
    borderRadius: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,

  },
  plus: {
    color: colors.backgroundSageGreen,
    fontSize: 40,
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
});

const mapStateToProps = (state) => {
  return {
    requests: state.request.allRequests,
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequests: (userID) => {
      dispatch(getForUser(userID));
    },
    createUserRequest: (request) => {
      dispatch(createRequest(request));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
