import React from 'react';
import {
  StyleSheet, SafeAreaView,
} from 'react-native';
import { fonts } from '../constants/GlobalStyles';
import HomeCircles from '../components/HomeCircles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <HomeCircles />
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

export default HomeScreen;
