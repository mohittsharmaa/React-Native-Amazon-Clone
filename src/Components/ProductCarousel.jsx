import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import CarouselSlider, {Pagination} from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('screen').width;

const ProductCarousel = ({data}) => {
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <View style={styles.slide}>
        <Image source={{uri: item.image}} style={styles.imgStyle} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <CarouselSlider
        style={styles.carousel}
        ref={carouselRef}
        data={data}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          left: '20%',
          // backgroundColor: 'grey',
        }}
        dotStyle={{
          width: 5,
          height: 5,
          borderRadius: 5,
        }}
        inactiveDotStyle={{width: 5, height: 5, borderRadius: 10}}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        dotColor="grey"
        inactiveDotColor="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    // backgroundColor: 'pink',
    // position: 'absolute',
    zIndex: -1,
    // flex: 1, // Use flex to fill the available space
    // height: '100%',
    width: '100%', // Set width to 100% to fill the parent container
  },
  imgStyle: {
    objectFit: 'contain',
    height: '100%',
    width: '100%',
  },
});

export default ProductCarousel;
