import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

const Header = () => {
  return (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={['#88dae9', '#98e1d6', '#9ee4d4']}
        style={styles.container}>
        <View style={styles.inputBox}>
          <View style={styles.innerContainer}>
            <Ionicons name="search-outline" color="#1f1f1f" size={22} />
            <TextInput placeholder="Search Amazon.in"></TextInput>
          </View>
          <Ionicons name="scan-sharp" color="#1f1f1f" size={20} />
        </View>
        <Ionicons name="mic" color="#1f1f1f" size={20} />
      </LinearGradient>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a1bcc0',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    marginRight: 10,
  },
});

// {
//   route.name === 'Home' && <Ionicons name="arrow-back-outline" size={22} />;
// }
