import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/dist/Feather';
import LinearGradient from 'react-native-linear-gradient';

const SubHeader = () => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#88dae9', '#98e1d6', '#9ee4d4']}>
      <View style={styles.container}>
        <Feather name="map-pin" size={20} color="#000" />
        <Text>Deliver to user - New Delhi 110001 </Text>
        <Feather name="chevron-down" color="#000" size={20} />
      </View>
    </LinearGradient>
  );
};

export default SubHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    // backgroundColor: '#88dae9',
  },
});
