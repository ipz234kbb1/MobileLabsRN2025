import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  FadeIn,
  FadeOut,
  SlideInRight,
  Layout,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const CartItem = ({ item, onRemove, onUpdateQuantity, index = 0 }) => {
  // Animation values
  const scale = useSharedValue(1);
  const deleteScale = useSharedValue(1);
  const incrementScale = useSharedValue(1);
  const decrementScale = useSharedValue(1);
  const quantityScale = useSharedValue(1);
  
  // Animation when quantity changes
  useEffect(() => {
    quantityScale.value = withSequence(
      withTiming(1.2, { duration: 150 }),
      withTiming(1, { duration: 150 })
    );
  }, [item.quantity]);
  
  const handleIncrement = () => {
    // Animate the button
    incrementScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    onUpdateQuantity(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      // Animate the button
      decrementScale.value = withSequence(
        withTiming(0.9, { duration: 100 }),
        withTiming(1, { duration: 100 })
      );
      
      onUpdateQuantity(item.quantity - 1);
    }
  };
  
  const handleRemove = () => {
    // Animate the button before removing
    deleteScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    
    // Small delay before actual removal
    setTimeout(() => {
      onRemove();
    }, 200);
  };
  
  // Animated styles
  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  
  const deleteButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: deleteScale.value }],
  }));
  
  const incrementButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: incrementScale.value }],
  }));
  
  const decrementButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: decrementScale.value }],
  }));
  
  const quantityTextStyle = useAnimatedStyle(() => ({
    transform: [{ scale: quantityScale.value }],
  }));
  
  // Format category and price display
  const formatCategory = item.category ? item.category.charAt(0).toUpperCase() + item.category.slice(1) : '';
  
  // Get spec if available
  const getSpecText = () => {
    if (item.specifications) {
      const specs = Object.entries(item.specifications);
      if (specs.length > 0) {
        const [key, value] = specs[0];
        return value;
      }
    }
    return null;
  };
  
  const specText = getSpecText();

  return (
    <Animated.View 
      style={[styles.container, containerStyle]}
      entering={SlideInRight.delay(index * 100).springify()}
      exiting={FadeOut.duration(300)}
      layout={Layout.springify()}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {item.category && (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{formatCategory}</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={2}>
            {item.name}
          </Text>
          <Animated.View style={deleteButtonStyle}>
            <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
              <Icon name="trash-outline" size={20} color="#f44336" />
            </TouchableOpacity>
          </Animated.View>
        </View>

        {specText && (
          <View style={styles.specContainer}>
            <Icon name="information-circle-outline" size={14} color="#666" />
            <Text style={styles.specText} numberOfLines={1}>{specText}</Text>
          </View>
        )}

        <Text style={styles.price}>
          {item.price.toLocaleString()} ₴
        </Text>

        <View style={styles.actionRow}>
          <View style={styles.quantityContainer}>
            <Animated.View style={decrementButtonStyle}>
              <TouchableOpacity
                onPress={handleDecrement}
                style={[styles.quantityButton, item.quantity <= 1 && styles.disabledButton]}
                disabled={item.quantity <= 1}
              >
                <Icon name="remove" size={18} color={item.quantity <= 1 ? '#ccc' : '#5E72E4'} />
              </TouchableOpacity>
            </Animated.View>

            <Animated.Text style={[styles.quantityText, quantityTextStyle]}>
              {item.quantity}
            </Animated.Text>

            <Animated.View style={incrementButtonStyle}>
              <TouchableOpacity onPress={handleIncrement} style={styles.quantityButton}>
                <Icon name="add" size={18} color="#5E72E4" />
              </TouchableOpacity>
            </Animated.View>
          </View>
          
          <Text style={styles.totalPrice}>
            {item.totalPrice.toLocaleString()} ₴
          </Text>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    marginHorizontal: 16,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  imageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: 12,
    resizeMode: 'contain',
    backgroundColor: '#f9f9f9',
  },
  categoryBadge: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(94, 114, 228, 0.9)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  categoryText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  specContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  specText: {
    fontSize: 13,
    color: '#666',
    marginLeft: 4,
  },
  removeButton: {
    padding: 6,
    backgroundColor: 'rgba(244, 67, 54, 0.1)',
    borderRadius: 8,
  },
  price: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  disabledButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginHorizontal: 12,
    minWidth: 24,
    textAlign: 'center',
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
});

export default CartItem;