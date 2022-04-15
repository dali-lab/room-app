import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet, SafeAreaView, Button,
} from 'react-native';
import { getAllUsers, signOutUser } from '../store/actions';
import { fonts } from '../constants/GlobalStyles';
import HomeCircles from '../components/HomeCircles';

const HomeScreen = (props) => {
  const {
    getUsers, users, user, signOut,
  } = props;

  console.log(user.firstName, user.lastName);

  useEffect(() => {
    getUsers('123abc');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <SafeAreaView style={styles.container}>
      <HomeCircles users={users} />
      <Button
        onPress={signOut}
        title="Log Out"
        color="green"
      />
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
    user: state.user.user,
    users: state.user.allUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUsers: (roomcode) => {
      dispatch(getAllUsers(roomcode));
    },
    signOut: () => {
      dispatch(signOutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
