import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  Share,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import MaterialIcon from 'react-native-vector-icons/dist/MaterialIcons';
import ProductCarousel from '../Components/ProductCarousel';
import {capitalizeFirstLetter} from '../Utils/functions';
import {fetchCategoryProducts} from '../Utils/functions';
import ProductCard from '../Components/ProductCard';
import {useDispatch, useSelector} from 'react-redux';
import {addToWishlist, removeFromWishlist} from '../redux/slices/wishlistSlice';
import {addToCart} from '../redux/slices/cartSlice';

const DiscountCircle = ({discount}) => {
  return (
    <View style={DiscountCircleStyles.container}>
      <Text style={DiscountCircleStyles.text}>{discount} %</Text>
      <Text style={DiscountCircleStyles.text}>off</Text>
    </View>
  );
};

const ProductScreen = ({route, navigation}) => {
  // naviagtion
  const {item} = route.params;
  const category = item.category;
  // states
  const [suggestedItems, setSuggestedItems] = React.useState([]);
  // redux
  const cart = useSelector(state => state.cart);
  // console.log(cart);
  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist);
  const isItemInWishlist = wishlist.data.some(
    wishlistItem => wishlistItem.description === item.description,
  );
  const [liked, setLiked] = React.useState(isItemInWishlist);

  // effects
  React.useEffect(() => {
    fetchProducts(category);
  }, []);
  const fetchProducts = async category => {
    const res = await fetchCategoryProducts(category);
    // console.log(res);
    setSuggestedItems(res.products);
  };

  const item_images = [];
  item_images.push({id: Math.random(), image: item.thumbnail});
  item.images.map(img => {
    item_images.push({id: Math.random(), image: img});
  });

  // console.log('item_images', item_images);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Check this out ${item.thumbnail}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.carouselContainer}>
        <ProductCarousel style={styles.carousel} data={item_images} />
      </View>
      <DiscountCircle discount={item.discountPercentage} />
      <TouchableOpacity onPress={onShare} style={styles.shareContainer}>
        <View>
          <MaterialIcon
            style={styles.shareBtn}
            size={22}
            color="grey"
            name="share"
          />
        </View>
      </TouchableOpacity>
      <View style={styles.lowerContainer}>
        <View style={styles.upper}>
          <Text style={styles.title}>{capitalizeFirstLetter(item.title)}</Text>
          <Text style={styles.category}>
            {capitalizeFirstLetter(item.category)}
          </Text>
        </View>
        <View style={styles.middle}>
          <Text style={styles.brand}>{capitalizeFirstLetter(item.brand)}</Text>
          <Text style={styles.price}>
            ₹{(item.price * 83).toLocaleString()}
          </Text>
        </View>
        <Text>Item Description</Text>
        <Text style={styles.description}>
          {capitalizeFirstLetter(item.description)}
        </Text>
        <View style={styles.ctabtns}>
          <TouchableOpacity
            onPress={() => {
              // console.log(item);
              dispatch(addToCart(item));
              // console.log(cart);
            }}
            activeOpacity={0.67}
            style={styles.addToCartBtnContainer}>
            <Text style={styles.addToCartBtn}>Add to Cart</Text>
          </TouchableOpacity>
          {liked ? (
            <TouchableOpacity
              onPress={() => {
                setLiked(prevLiked => !prevLiked);
                dispatch(removeFromWishlist(item.description));
                // console.log(wishlist);
              }}
              activeOpacity={0.67}
              style={styles.likeBTNContainer}>
              <MaterialIcon name="favorite" color="#FF0000" size={26} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setLiked(prevLiked => !prevLiked);
                dispatch(addToWishlist(item));
                // console.log(wishlist);
              }}
              activeOpacity={0.67}
              style={styles.likeBTNContainer}>
              <MaterialIcon
                style={styles.likeBTN}
                name="favorite-outline"
                size={26}
              />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{fontSize: 16}}>Suggested Items...</Text>
        <View>
          {suggestedItems.map(suggestion => (
            <ProductCard
              key={new Date().getTime() + Math.random()}
              item={suggestion}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    height: 400,
    width: '100%',
    // Remove 'position: absolute'
  },
  container: {
    backgroundColor: 'white',
    position: 'relative',
    flex: 1,
  },
  shareContainer: {
    position: 'absolute',
    padding: 10,
    right: 10,
    top: 10,
    display: 'block',
    height: '50',
    width: '50',
    borderRadius: 50,
  },
  lowerContainer: {
    flex: 1,
    padding: 10,
    gap: 8,
    // top: 50,
  },
  title: {
    fontSize: 25,
    fontWeight: '600',
    color: 'black',
  },
  brand: {color: 'navy', fontSize: 18, fontStyle: 'italic'},
  price: {
    color: 'green',
    fontSize: 18,
    marginRight: 15,
  },
  description: {color: 'black', fontSize: 16, fontWeight: '400', marginTop: -8},
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  upper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addToCartBtnContainer: {
    backgroundColor: 'orange',
    alignSelf: 'center',
    justifyContent: 'center',
    // width: '50%',
    flex: 1,
    height: 50,
    borderColor: 'black',
    margin: 20,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
  },
  likeBTNContainer: {
    color: 'white',
    backgroundColor: '#d3d3d3',
    alignSelf: 'center',
    justifyContent: 'center',
    // width: '50%',
    height: 50,
    borderColor: 'black',
    margin: 20,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 10,
  },
  addToCartBtn: {
    color: 'white',
    fontSize: 20,
    alignSelf: 'center',
  },
  ctabtns: {
    flexDirection: 'row',
  },
  likeBTN: {
    color: 'white',
  },
});
export const DiscountCircleStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: 'maroon',
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
    top: 10,
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
  },
});
