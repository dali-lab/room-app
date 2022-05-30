/* eslint-disable global-require */
import React, { useState } from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import { connect } from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { updateRequest, deleteRequest, changeRequestEditState } from '../store/actions';
import { fonts, dimensions, colors } from '../constants/GlobalStyles';
import UserIcon from './UserIcon';
import EditRequestModal from './EditRequestModal';

const LeftActions = (id, userId, deleteRequestItem, setShowModal, showModal) => {
  return (
    <View style={styles.swipeContainer}>
      <TouchableOpacity style={styles.swipeItem} onPress={() => setShowModal(!showModal)}>
        <Image style={{ height: 25, width: 25, marginBottom: 10 }} source={require('../assets/edit.png')} />
        <Text style={styles.swipeItemText}>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.swipeItem} onPress={() => { deleteRequestItem(id, userId); }}>
        <Image style={{ height: 25, width: 25, marginBottom: 10 }} source={require('../assets/trash.png')} />
        <Text style={styles.swipeItemText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const RequestItem = ({
  id, description, user, completed, upvotes, downvotes, author, updateRequestItem, deleteRequestItem, anonymous,
}) => {
  const [showModal, setShowModal] = useState(false);
  // eslint-disable-next-line no-empty-pattern
  const [isCompleted, setCompleted] = useState(completed);
  const [upVoted, setUpVoted] = useState(false);
  const [downVoted, setDownVoted] = useState(false);
  const handleUpVote = () => {
    if (!upVoted && !downVoted) {
      updateRequestItem(id, user.id, { upvotes: upvotes + 1 });
    } else if (!upVoted && downVoted) {
      updateRequestItem(id, user.id, { upvotes: upvotes + 1, downvotes: downvotes + 1 });
    }
    setUpVoted(true);
    setDownVoted(false);
  };
  const handleDownVote = () => {
    if (!upVoted && !downVoted) {
      updateRequestItem(id, user.id, { downvotes: downvotes - 1 });
    } else if (upVoted && !downVoted) {
      updateRequestItem(id, user.id, { upvotes: upvotes - 1, downvotes: downvotes - 1 });
    }
    setUpVoted(false);
    setDownVoted(true);
  };
  // const {
  //   author,
  // } = props;
  return (
    <View>
      <View style={styles.container}>
        <Swipeable renderLeftActions={() => LeftActions(id, user.id, deleteRequestItem, setShowModal, showModal)}>
          <View style={styles.requestContainer}>
            <View style={styles.icon}>
              <UserIcon key={author.id} user={author} size={54} style={styles.icon}> </UserIcon>
            </View>
            <View style={styles.columnStyle}>
              <Text style={styles.description}>{description}</Text>
              <View style={styles.completed}>

                <TouchableOpacity
                  onPress={() => {
                    updateRequestItem(id, user.id, { completed: !isCompleted });
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
                <Text style={upVoted ? styles.VoteCounted : styles.voteCounter}>{`${upvotes}`}</Text>
                <TouchableOpacity
                  onPress={handleUpVote}
                >
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../assets/upArrow.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.rowStyle}>
                <Text style={downVoted ? styles.VoteCounted : styles.voteCounter}>{`${downvotes}`}</Text>
                <TouchableOpacity
                  onPress={handleDownVote}
                >
                  <Image
                    // eslint-disable-next-line global-require
                    source={require('../assets/downArrow.png')}
                    style={{ marginTop: 5 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <EditRequestModal showModal={showModal} setShowModal={setShowModal} id={id} description={description} end={end} recipients={recipients} anonymous={anonymous} />
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
    flexDirection: 'row',
    backgroundColor: colors.indigo700,
  },
  swipeItem: {
    backgroundColor: colors.indigo700,
    justifyContent: 'center',
    alignContent: 'space-around',
    paddingLeft: 15,
    width: 60,
  },
  swipeItemText: {
    fontSize: fonts.smallText,
    color: '#ffffff',
  },
  container: {
    width: dimensions.screenWidth * 0.9,
    margin: 20,
    justifyContent: 'center',
  },
  requestContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    width: dimensions.screenWidth * 0.9,
    backgroundColor: colors.backgroundIndigo,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginLeft: 15,
    marginRight: 5,
  },
  VoteCounted: {
    fontSize: fonts.smallText,
    color: colors.indigo700,
    marginLeft: 15,
    marginRight: 5,
    fontWeight: 'bold',
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
    updateRequestItem: (id, userId, requestData) => {
      dispatch(updateRequest(id, userId, requestData));
    },
    deleteRequestItem: (id, userId) => {
      dispatch(deleteRequest(id, userId));
    },
    changeEditState: (isEditing) => {
      dispatch(changeRequestEditState(isEditing));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestItem);
