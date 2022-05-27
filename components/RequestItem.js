import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal, Button, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
// import { updateRequest, changeRequestEditState } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import UserIcon from './UserIcon';

const LeftActions = () => {
  return (
    <View>
      <View style={styles.swipeContainer}>
        <TouchableOpacity style={styles.swipeItem} onPress={() => console.log('pressed delete button')}>
          <Text style={styles.swipeItemText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const RightActions = () => {
  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.swipeItem} onPress={() => console.log('pressed delete button')}>
        <Text style={styles.deleteIcon}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const RequestItem = ({
  description, user, completed, props, upvotes, downvotes,
}) => {
  const [showModal, setShowModal] = useState(false);
  // const {
  //   author,
  // } = props;
  return (
    <View>
      <View style={styles.container}>
        <Swipeable renderLeftActions={LeftActions} renderRightActions={RightActions}>
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.icon}>
              <UserIcon key={user.id} user={user} size={54} style={styles.icon}> </UserIcon>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.completed}>
                <View style={styles.checkbox} />
                <Text style={[styles.text, { marginLeft: 10 }]}>Completed</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'column', marginRight: 5 }}>
              <View style={{ flexDirection: 'row', marginBottom: 15 }}>
                <Text style={styles.text}>{`${upvotes}`}</Text>
                <TouchableOpacity>
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../assets/upArrow.png')}
                    style={{
                      marginTop: 8,
                    }}
                  />
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Text style={styles.text}>{`${downvotes}`}</Text>
                <TouchableOpacity>
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../assets/downArrow.png')}
                    style={{
                      marginTop: 8,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Modal
              visible={showModal}
              transparent
              onRequestClose={() => {
                console.log('Modal has been closed.');
              }}
            >
              <View style={styles.modalContainer}>
                <Text>Edit Modal</Text>
                <Button
                  onPress={() => setShowModal(!showModal)}
                  title="back"
                />
              </View>
            </Modal>
          </View>
        </Swipeable>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  deleteIcon: {
    fontSize: fonts.large24,
    fontWeight: '600',
    color: colors.lightGray,
  },
  swipeContainer: {
    height: 80,
    marginLeft: 0,
    marginTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  swipeItem: {
    backgroundColor: colors.indigo700,
    justifyContent: 'center',
    width: 60,
    height: 80,
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
  },
  swipeItemText: {
    fontSize: fonts.smallText,
    color: '#ffffff',
  },
  container: {
    width: dimensions.screenWidth * 0.9,
    height: 80,
    backgroundColor: colors.indigo300,
    margin: 20,
    padding: 10,
  },
  description: {
    fontSize: fonts.largeText,
    fontWeight: '600',
    marginLeft: 10,
  },
  completed: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: colors.indigo700,
  },
  text: {
    fontSize: fonts.smallText,
    color: colors.indigo700,
    marginLeft: 20,
  },
  authorCircle: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    backgroundColor: colors.primarySageGreen,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -50,
  },
  authorText: {
    fontSize: fonts.large24,
    color: colors.indigo700,
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
  icon: {
    marginLeft: 20,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps, null)(RequestItem);
