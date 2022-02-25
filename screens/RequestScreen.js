import React from 'react';
import {
  StyleSheet, View, Text,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { fonts } from '../styles/GlobalStyles';

const RequestScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome to the Request Screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: fonts.largeText,
    textAlign: 'center',
  },
});

export default RequestScreen;