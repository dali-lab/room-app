import React from 'react';
import {
  StyleSheet, SafeAreaView, Text,
} from 'react-native';
import { connect } from 'react-redux';
import { fonts, colors } from '../constants/GlobalStyles';

const SettingsScreen = (props) => {
  return (
    <SafeAreaView>
      <Text style={styles.text}>Settings</Text>
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
    textAlign: 'left',
    marginLeft: 40,
    marginTop: 20,
    marginBottom: -30,
    color: colors.darkSageGreen,
  },
});

export default connect(null, null)(SettingsScreen);
