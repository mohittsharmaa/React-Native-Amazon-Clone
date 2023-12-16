import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {useSelector} from 'react-redux';
import CartItem from '../Components/CartItem';
// import CartItem from '../Components/CartItem';

const item = {
  brand: 'Huawei',
  category: 'smartphones',
  description:
    'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
  discountPercentage: 10.58,
  id: 5,
  images: [
    'https://i.dummyjson.com/data/products/5/1.jpg',
    'https://i.dummyjson.com/data/products/5/2.jpg',
    'https://i.dummyjson.com/data/products/5/3.jpg',
  ],
  price: 499,
  rating: 4.09,
  stock: 32,
  thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
  title: 'Huawei P30',
};
const item2 = {
  brand: 'Huawei',
  category: 'smartphones',
  description:
    'Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.',
  discountPercentage: 10.58,
  id: 5,
  images: [
    'https://i.dummyjson.com/data/products/5/1.jpg',
    'https://i.dummyjson.com/data/products/5/2.jpg',
    'https://i.dummyjson.com/data/products/5/3.jpg',
  ],
  price: 499,
  rating: 4.09,
  stock: 32,
  thumbnail: 'https://i.dummyjson.com/data/products/5/thumbnail.jpg',
  title: 'Huawei P30',
};
const CartScreen = () => {
  const navigation = useNavigation();
  const cart_select = useSelector(state => state.cart);
  useEffect(() => {
    // Set the tabBarBadge value dynamically
    navigation.setOptions({
      tabBarBadge: cart_select.totalItems,
    });
    // console.log(cart_select, ' cart select');
    return () => {
      navigation.setOptions({
        tabBarBadge: null, // Remove the badge when the component is unmounted
      });
    };
  }, [navigation, cart_select.totalItems]);
  return (
    <View style={styles.over_container}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Your Cart</Text>
        <Text style={styles.subheading}>
          Total :
          <Text style={{fontWeight: 'bold'}}>
            {(cart_select.totalPrice * 83).toLocaleString('en-IN', {
              style: 'currency',
              currency: 'INR',
            })}
          </Text>
        </Text>
        {cart_select.data.map(item => {
          // console.log(item);
          return <CartItem key={item.id} item={item} />;
        })}
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  over_container: {
    flex: 1,
    // padding: 10,
    marginBottom: 10,
  }, // Remove marginBottom or adjust as needed
  heading: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginLeft: 10,
  },
  container: {
    flex: 1,
    // padding: 10,
  },
  subheading: {
    marginTop: 10,
    fontSize: 24,
    color: 'black',
    marginLeft: 10,
  },
  productItem: {
    borderWidth: 1,
    borderColor: 'grey',
  },
  btnSection: {
    flexDirection: 'row',
  },
});
