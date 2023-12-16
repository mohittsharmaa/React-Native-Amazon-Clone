import {
  Button,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useCallback} from 'react';
import ProductCard from '../Components/ProductCard';
import {fetchCategoryProducts} from '../Utils/functions';
import {capitalizeFirstLetter} from '../Utils/functions';

const ProductList = ({route, navigation}) => {
  const {category} = route.params;

  const [products, setProducts] = React.useState([]);
  // const [loadingMore, setLoadingMore] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    fetchProductsData(category);
  }, [category]);
  const fetchProductsData = async () => {
    try {
      setLoadingMore(true);
      const result = await fetchCategoryProducts(category);
      setProducts(prevProducts => [...prevProducts, ...result.products]);
      setError(null);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching products.');
    } finally {
      setLoadingMore(false);
    }
  };

  const renderItem = useCallback(
    ({item}) => {
      return (
        <TouchableOpacity
          style={{padding: 10, marginVertical: -20}}
          onPress={() => {
            navigation.navigate('ProductScreen', {item: item});
          }}>
          <ProductCard item={item} />
        </TouchableOpacity>
      );
    },
    [products],
  );
  const renderFooter = useCallback(() => {
    if (loadingMore) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else {
      return null;
    }
  }, []);
  const renderContent = () => {
    if (loadingMore && products.length === 0) {
      return <ActivityIndicator size="large" color="#0000ff" />;
    } else if (error) {
      return (
        <View>
          <Text style={styles.errorText}>No Products can be Found</Text>
          <Button title="Retry" onPress={() => fetchProductsData()} />
        </View>
      );
    } else if (products.length > 0) {
      return (
        <FlatList
          ListHeaderComponent={
            <Text style={styles.headerStyles}>
              Results for {capitalizeFirstLetter(category)}
            </Text>
          }
          data={products}
          renderItem={renderItem}
          keyExtractor={() => new Date().getTime() + Math.random() * 1000}
          onEndReached={fetchProductsData}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loadingMore ? renderFooter : null}
        />
      );
    } else {
      return null; // Render nothing if none of the conditions are met
    }
  };
  return <View style={styles.container}>{renderContent()}</View>;
};

export default ProductList;

const styles = StyleSheet.create({
  headerStyles: {
    fontSize: 20,
    padding: 10,
  },
});
