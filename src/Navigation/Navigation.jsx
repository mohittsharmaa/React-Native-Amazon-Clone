import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import ProductList from '../Screens/ProductList';
import ProductScreen from '../Screens/ProductScreen';
import CartScreen from '../Screens/CartScreen';
import WishlistScreen from '../Screens/WishlistScreen';
import React from 'react';

const HomeStack = createStackNavigator();

const Navigation = () => {
  const options = {headerShown: false};
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={options} />
      <HomeStack.Screen
        name="ProductList"
        component={ProductList}
        options={options}
      />
      <HomeStack.Screen
        name="ProductScreen"
        component={ProductScreen}
        options={options}
      />
      <HomeStack.Screen
        name="CartScreen"
        component={CartScreen}
        options={options}
      />
      <HomeStack.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={options}
      />
    </HomeStack.Navigator>
  );
};

export default Navigation;
