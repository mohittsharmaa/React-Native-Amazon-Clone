import {StyleSheet, Text, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import ProductCard from '../Components/ProductCard';

const WishlistScreen = ({navigation}) => {
  const wishlist = useSelector(state => state.wishlist);

  useEffect(() => {
    // console.log('from wishlistscreen', wishlist.wishlist.data);
    // Set the tabBarBadge value dynamically
    navigation.setOptions({
      tabBarBadge: wishlist.total,
    });
    return () => {
      navigation.setOptions({
        tabBarBadge: null, // Remove the badge when the component is unmounted
      });
    };
  }, [navigation, wishlist.total]);

  // console.log(wishlist);
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.wishlistText}>Your Wishlist : </Text>
      {wishlist.data.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </ScrollView>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  container: {padding: 10},
  wishlistText: {
    color: 'black',
    fontSize: 28,
  },
});
