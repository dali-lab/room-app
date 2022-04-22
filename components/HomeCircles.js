import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { getAllUsers, updateUser } from '../store/actions';
import { fonts, colors } from '../constants/GlobalStyles';
import UserIcon from './UserIcon';

const HomeCircles = (props) => {
  const { users, user, updateUsers } = props;

  const awayCircleClick = () => {
    updateUsers(user.id, { isHome: 'false' }, user.roomCode);
  };

  const homeCircleClick = () => {
    updateUsers(user.id, { isHome: 'true' }, user.roomCode);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.homeCircle}
        onPress={() => homeCircleClick()}
      >
        <Text style={styles.homeText}>home</Text>
        {users?.map((userCurr) => {
          if (userCurr.isHome) {
            return <UserIcon key={user.id} user={userCurr} size={54}> </UserIcon>;
          } else return null;
        })}
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.awayCircle}
        onPress={() => awayCircleClick()}
      >
        <Text style={styles.awayText}>away</Text>
        {users?.map((userCurr) => {
          if (!userCurr.isHome) {
            return <UserIcon key={user.id} user={userCurr} size={54}> </UserIcon>;
          } else return null;
        })}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 50,
  },
  homeCircle: {
    width: 216,
    height: 216,
    borderRadius: 216 / 2,
    backgroundColor: colors.darkSageGreen,
    alignItems: 'center',
  },
  awayCircle: {
    width: 133,
    height: 133,
    borderRadius: 133 / 2,
    backgroundColor: colors.mediumSageGreen,
    marginTop: 100,
    marginLeft: -50,
    alignItems: 'center',
  },
  homeText: {
    fontSize: fonts.large24,
    color: 'white',
    marginTop: 15,
  },
  awayText: {
    fontSize: fonts.large22,
    color: colors.darkSageGreen,
    marginTop: 12,
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

    // added
    updateUsers: (id, user, roomcode) => {
      dispatch(updateUser(id, user, roomcode));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeCircles);
