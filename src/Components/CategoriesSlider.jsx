import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {CategoriesSliderData} from '../data/categorySliderData';
import {useNavigation} from '@react-navigation/native';
import {capitalizeFirstLetter} from '../Utils/functions';

const CategoriesSlider = () => {
  const navigation = useNavigation();

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {CategoriesSliderData.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.scrollContainer}
            onPress={() => {
              navigation.navigate('ProductList', {category: item.title});
            }}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.text}>{capitalizeFirstLetter(item.title)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 50,
    aspectRatio: '1/1',
  },
  text: {
    fontSize: 10,
    color: '#2c4341',
  },
});
export default CategoriesSlider;
