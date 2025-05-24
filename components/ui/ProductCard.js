import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Pressable,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  interpolate,
  Extrapolate,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

const ProductCard = ({ product, onAddToCart, index }) => {
  // Animation values
  const scale = useSharedValue(0.9);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  
  // Initialize animations
  useEffect(() => {
    opacity.value = withDelay(
      index * 100, 
      withTiming(1, { duration: 500 })
    );
    
    translateY.value = withDelay(
      index * 100, 
      withSpring(0, { damping: 12, stiffness: 100 })
    );
    
    scale.value = withDelay(
      index * 100, 
      withSpring(1, { damping: 12 })
    );
  }, []);
  
  // Card animation style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value },
        { translateY: translateY.value },
      ],
    };
  });
  
  // Button press animations
  const buttonScale = useSharedValue(1);
  const [showCheckmark, setShowCheckmark] = useState(false);
  
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });
  
  const onPressIn = () => {
    buttonScale.value = withTiming(0.9, { duration: 150 });
  };
  
  const onPressOut = () => {
    buttonScale.value = withTiming(1, { duration: 150 });
  };
  
  // Handle add to cart with checkmark animation
  const handleAddToCart = () => {
    setShowCheckmark(true);
    onAddToCart();
    
    // Reset after 2 seconds
    setTimeout(() => {
      setShowCheckmark(false);
    }, 2000);
  };
  
  // Show specifications if available
  const hasSpecs = product.specifications && Object.keys(product.specifications).length > 0;
  
  return (
    <Animated.View
      style={[styles.container, animatedStyle]}
      entering={FadeIn.duration(500).delay(index * 100)}
      exiting={FadeOut.duration(300)}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{product.category}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        
        <View style={styles.ratingContainer}>
          <Icon name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}>
            {product.rating?.rate?.toFixed(1) || '0.0'} ({product.rating?.count || 0})
          </Text>
        </View>

        {hasSpecs && (
          <View style={styles.specsContainer}>
            {Object.entries(product.specifications).slice(0, 2).map(([key, value]) => (
              <View key={key} style={styles.specItem}>
                <Icon name={getSpecIcon(key)} size={12} color="#999" />
                <Text style={styles.specText} numberOfLines={1}>{value}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.price}>
            {product.price.toLocaleString()} ₴
          </Text>

          <Animated.View style={buttonAnimatedStyle}>
            <TouchableOpacity
              style={[styles.addButton, showCheckmark && styles.successButton]}
              onPress={handleAddToCart}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              disabled={showCheckmark}
            >
              <Icon 
                name={showCheckmark ? "checkmark" : "add"} 
                size={20} 
                color="#fff" 
              />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

// Helper function to get icons for specs
const getSpecIcon = (key) => {
  const iconMap = {
    display: 'phone-portrait-outline',
    processor: 'hardware-chip-outline',
    ram: 'memory-outline',
    storage: 'save-outline',
    camera: 'camera-outline',
    battery: 'battery-charging-outline',
    type: 'headset-outline',
    connectivity: 'bluetooth-outline',
    features: 'flash-outline',
    power: 'flash-outline',
    runtime: 'time-outline',
    weight: 'barbell-outline',
    resolution: 'scan-outline',
    refreshRate: 'refresh-outline',
    responsetime: 'stopwatch-outline',
  };
  
  return iconMap[key] || 'information-circle-outline';
};

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    margin: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  categoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    padding: 12,
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  specsContainer: {
    marginVertical: 6,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  specText: {
    fontSize: 11,
    color: '#666',
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  price: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#5E72E4',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  successButton: {
    backgroundColor: '#4CAF50', // Green color for success
  },
});

export default ProductCard;