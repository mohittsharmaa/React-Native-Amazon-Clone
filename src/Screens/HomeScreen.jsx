import {
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SubHeader from '../Components/SubHeader';
import CategoriesSlider from '../Components/CategoriesSlider';
import CarouselComponent from '../Components/Carousel';
import Services from '../Components/Services';
import Deals from '../Components/Deals';
import Brands from '../Components/Brands';
import ProductCard from '../Components/ProductCard';

import {fetchProducts} from '../Utils/functions';
import {CarouselData} from '../data/CarouselData';

const HomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    fetchProductsData();
  }, []);

  const fetchProductsData = async () => {
    try {
      setLoadingMore(true);
      const result = await fetchProducts();
      setProducts(prevProducts => [...prevProducts, ...result.products]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{padding: 10, marginVertical: -20}}
      onPress={() => {
        navigation.navigate('ProductScreen', {item: item});
      }}>
      <ProductCard item={item} />
    </TouchableOpacity>
  );
  const renderFooter = () => {
    if (loadingMore) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <SubHeader />
          <CategoriesSlider />
          <CarouselComponent data={CarouselData} />
          <Services />
          <Deals />
          <Brands />
          <Text style={{padding: 10}}>Recommended Products for you</Text>
        </>
      }
      data={products}
      renderItem={renderItem}
      keyExtractor={() => new Date().getTime() + Math.random() * 1000}
      onEndReached={fetchProductsData}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

export default HomeScreen;
