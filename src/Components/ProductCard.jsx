import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import PrimeLogo from '../Assets/prime-logo.png';

const ProductCard = ({item}) => {
  // console.log(item);
  const thumbnail = item.thumbnail;
  return (
    <View style={styles.productSection}>
      <View style={styles.productImgSection}>
        <Image style={styles.productImg} source={{uri: thumbnail}} />
      </View>
      <View style={styles.productDetailSection}>
        <Text style={styles.sponsored}>Sponsored</Text>
        <Text style={styles.productName}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.rating}>{item.rating} ⭐</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.price}>
            ₹ {(item.price * 83).toLocaleString()}
          </Text>
        </View>
        <Text style={styles.cashback}>
          Up to 5% cashback with Amazon Pay Credit card
        </Text>
        <Image source={PrimeLogo} style={styles.logo} />
        <Text style={styles.cashback}>FREE Delivery by Random delivery by</Text>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  tagline: {
    fontSize: 11,
    color: 'grey',
  },
  productSection: {
    borderWidth: 1,
    borderColor: '#dddddd',
    flexDirection: 'row',
    marginVertical: 15,
  },
  productImgSection: {
    width: '40%',
    backgroundColor: '#dddddd',
    justifyContent: 'center',
  },
  productDetailSection: {
    width: '60%',
    padding: 10,
  },
  productImg: {
    height: 150,
    width: '100%',
    resizeMode: 'contain',
  },
  sponsored: {
    fontSize: 11,
    color: 'grey',
    marginBottom: 5,
  },
  productName: {
    fontSize: 12,
    color: 'black',
    lineHeight: 18,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  rating: {
    fontSize: 10,
    color: '#017185',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 10,
    color: '#017185',
    marginLeft: 5,
  },
  price: {
    fontSize: 16,
    color: '#000000',
  },
  mrp: {
    fontSize: 10,
    color: 'grey',
    marginHorizontal: 5,
  },
  crossout: {
    fontSize: 10,
    color: 'grey',
    textDecorationLine: 'line-through',
  },
  cashback: {
    fontSize: 9,
    marginVertical: 2,
  },
  logo: {
    height: 16,
    width: 42,
    marginVertical: 3,
  },
});
