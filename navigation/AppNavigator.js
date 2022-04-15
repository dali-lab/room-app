import React from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './BottomTabs';
import AuthStack from './AuthStack';
import { signInFromStorage } from '../store/actions';

const AppNavigator = (props) => {
  const { authenticated, loginFromStorage } = props;
  if (!authenticated) loginFromStorage();
  if (!authenticated) {
    return (
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.user.authenticated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginFromStorage: () => {
      dispatch(signInFromStorage());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppNavigator);
