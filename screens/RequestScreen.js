/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet, Text, SafeAreaView, TouchableOpacity, ScrollView, View,
} from 'react-native';
import { connect } from 'react-redux';
import RequestItem from '../components/RequestItem';
import { getForUser } from '../store/actions';
import { fonts, colors } from '../constants/GlobalStyles';
import NewRequestModal from '../components/NewRequestModal';

const RequestScreen = (props) => {
  const {
    requests, getRequests, user,
  } = props;

  // Fetch all requests when the component first loads
  useEffect(() => {
    getRequests(user.id);
  }, [requests, user]);

  const [showModal, setShowModal] = useState(false);

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

      <NewRequestModal showModal={showModal} setShowModal={setShowModal} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestScreen);
