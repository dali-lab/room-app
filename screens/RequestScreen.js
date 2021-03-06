/* eslint-disable global-require */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, View, Image,
} from 'react-native';
import { connect } from 'react-redux';
import RequestItem from '../components/RequestItem';
import { getAllRequests, changeRequestEditState } from '../store/actions';
import { fonts, colors } from '../constants/GlobalStyles';
import NewRequestModal from '../components/NewRequestModal';

const RequestScreen = (props) => {
  const {
    requests, getRequests, user, isEditing, changeEditState,
  } = props;

  // Fetch all requests when the component first loads
  useEffect(() => {
    getRequests(user.id);
  }, [isEditing]);

  const [showModal, setShowModal] = useState(false);
  if (requests.length === 0) {
    return (
      <SafeAreaView style={styles.emptyContainer}>

        <View style={{
          flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: 130,
        }}
        >
          <Image
            style={{ height: 150, width: 150, margin: 10 }}
            source={require('../assets/request.png')}
          />
          <NewRequestModal showModal={showModal} setShowModal={setShowModal} />

          <Text style={styles.empty_title}>No Upcoming Requests!</Text>
          <Text style={styles.empty_subtitle}>Click the plus button to create a new request</Text>
          <TouchableOpacity style={styles.empty_addButton} onPress={() => setShowModal(!showModal)}>
            <Text style={{ color: '#FFFFFF', fontSize: 40 }}>+</Text>

          </TouchableOpacity>

        </View>
      </SafeAreaView>

    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.title}>Requests</Text>
          <TouchableOpacity
            style={styles.newEvent}
            onPress={() => {
              setShowModal(!showModal);
              changeEditState(true);
            }}
          >
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Swipe left on a request to edit or right delete it</Text>

        <NewRequestModal showModal={showModal} setShowModal={setShowModal} />
        <ScrollView>
          {requests?.map(({
            id, author, description, completed, upvotes, downvotes, end,
          }) => {
            return <RequestItem key={id} id={id} author={author} description={description} completed={completed} upvotes={upvotes} downvotes={downvotes} end={end} />;
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: colors.indigo700,
    borderRadius: 20,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
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
});

const mapStateToProps = (state) => {
  return {
    requests: state.request.allRequests,
    user: state.user.user,
    isEditing: state.request.isEditing,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequests: (userID) => {
      dispatch(getAllRequests(userID));
    },
    changeEditState: (isEditing) => {
      dispatch(changeRequestEditState(isEditing));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
