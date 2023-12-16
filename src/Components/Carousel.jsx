import {View, Text, Dimensions, StyleSheet, Image} from 'react-native';
import React, {useRef, useState} from 'react';
import CarouselSlider, {Pagination} from 'react-native-snap-carousel';
import {CarouselData} from '../data/CarouselData';

const sliderWidth = Dimensions.get('screen').width;

const Carousel = () => {
  const carouselRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.slide}>
        <Image source={item.image} style={styles.imgStyle} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <CarouselSlider
        ref={carouselRef}
        data={CarouselData}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={sliderWidth}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={CarouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          position: 'absolute',
          bottom: 0,
          left: '15%',
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
    position: 'relative',
    marginTop: -10,
  },
  imgStyle: {
    objectFit: 'contain',
    height: 250,
    width: '100%',
  },
});

export default Carousel;
