import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import ProductCard from './ProductCard';
import EvilIcons from 'react-native-vector-icons/dist/EvilIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/slices/cartSlice';

const CartItem = ({item}) => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  // console.log(cart);
  return (
    <View style={styles.productItem}>
      <ProductCard item={item} />
      <View style={styles.btnSection}>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setCount(prev => prev + 1);
              dispatch(increaseQuantity(item));
            }}>
            <Text style={{alignSelf: 'center'}}>+</Text>
          </TouchableOpacity>
          <Text>{count}</Text>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setCount(prev => prev - 1);
              dispatch(decreaseQuantity(item));
            }}>
            <Text style={{alignSelf: 'center'}}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(removeFromCart(item));
            }}>
            <EvilIcons name="trash" size={36} color="red" />
          </TouchableOpacity>
        </View>
        <Text>
          Total :
          {(item.price * 83).toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
          })}
        </Text>
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  productItem: {
    padding: 10,
    // borderWidth: 1,
    // borderColor: 'grey',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    gap: -5,
    elevation: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSection: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    padding: 5,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 20,
    width: 30,
    height: 30,
    fontSize: 30,
  },
});
