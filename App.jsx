// -------------------------------------------------------------
// Application made by - Mohit Sharma
// My Linkedin - "https://www.linkedin.com/in/mohitt-sharmaa/"
// My Github - "https://github.com/mohittsharmaa"
// --------------------------------------------------------------

import {StyleSheet, StatusBar, SafeAreaView, View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import CartScreen from './src/Screens/CartScreen';
import Header from './src/Components/Header';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/dist/Ionicons';

import Navigation from './src/Navigation/Navigation';

import {Provider} from 'react-redux';
import {store} from './src/redux/Store';
import WishlistScreen from './src/Screens/WishlistScreen';
import LottieView from 'lottie-react-native';
import cart_animation from './src/Assets/cart_animation.json';

const Tab = createBottomTabNavigator();
const App = () => {
  const options = {headerShown: false};
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <View style={styles.splashContainer}>
        <LottieView
          style={{
            height: 300,
            width: 300,
            alignSelf: 'center',
          }}
          source={require('./src/Assets/cart_animation.json')}
          autoPlay
          loop
        />
        {/* <Text>Loading...</Text> */}
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeAreaView}>
          <StatusBar backgroundColor="#98e1d6" barStyle="dark-content" />
          <Header />
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home';
                } else if (route.name === 'Cart') {
                  iconName = focused ? 'cart' : 'cart';
                } else if (route.name === 'Wishlist') {
                  iconName = focused ? 'heart' : 'heart-outline';
                }
                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'orange',
              tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Home" component={Navigation} options={options} />
            <Tab.Screen
              name="Wishlist"
              component={WishlistScreen}
              options={options}
            />
            <Tab.Screen name="Cart" component={CartScreen} options={options} />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    color: 'black',
    // paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default App;
