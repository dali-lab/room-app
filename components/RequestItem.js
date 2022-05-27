import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Modal, Button, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { updateRequest } from '../store/actions';
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
  id, description, user, completed, upvotes, downvotes, author, updateRequestItem,
}) => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [isCompleted, setCompleted] = useState(completed);
  // const {
  //   author,
  // } = props;
  return (
    <View>
      <View style={styles.container}>
        <Swipeable renderLeftActions={LeftActions} renderRightActions={RightActions}>
          <View style={styles.rowStyle}>
            <View style={styles.icon}>
              <UserIcon key={author.id} user={author} size={54} style={styles.icon}> </UserIcon>
            </View>
            <View style={styles.columnStyle}>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.completed}>

                <TouchableOpacity
                  onPress={() => {
                    updateRequestItem(id, { completed: !isCompleted });
                    setCompleted(!isCompleted);
                  }}
                >
                  <Image
                  // eslint-disable-next-line global-require
                    source={isCompleted ? require('../assets/checked.png') : require('../assets/unchecked.png')}
                  />
                </TouchableOpacity>
                <Text style={styles.completedText}>Completed</Text>
              </View>
            </View>
            <View style={styles.columnStyle}>
              <View style={styles.upVotes}>
                <Text style={styles.voteCounter}>{`${upvotes}`}</Text>
                <TouchableOpacity>
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../assets/upArrow.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
                <Text style={styles.voteCounter}>{`${downvotes}`}</Text>
                <TouchableOpacity>
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../assets/downArrow.png')}
                    style={{ marginTop: 5 }}
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
    backgroundColor: colors.backgroundIndigo,
    margin: 20,
    padding: 10,
    borderColor: colors.indigo700,
    borderLeftWidth: 5,

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
    marginLeft: 15,
  },
  rowStyle: {
    flexDirection: 'row',
  },
  columnStyle: {
    flexDirection: 'column',
  },
  voteCounter: {
    fontSize: fonts.smallText,
    color: colors.indigo700,
    marginLeft: 20,
    marginRight: 5,
  },
  upVotes: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  completedText: {
    fontSize: fonts.smallText,
    color: colors.indigo700,
    marginLeft: 10,
    marginRight: 90,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateRequestItem: (id, requestData) => {
      dispatch(updateRequest(id, requestData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
