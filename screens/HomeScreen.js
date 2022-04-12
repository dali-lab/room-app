import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, SafeAreaView,
} from 'react-native';
import { getAllUsers } from '../store/actions';
import { fonts } from '../constants/GlobalStyles';
import HomeCircles from '../components/HomeCircles';

const HomeScreen = (props) => {
  const { allUsers, getUsers } = props;
  useEffect(() => {
    getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SafeAreaView style={styles.container}>
      <HomeCircles users={allUsers} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
});

// testing
const mapStateToProps = (state) => {
  return {
    users: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: () => {
      dispatch(getAllUsers());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
