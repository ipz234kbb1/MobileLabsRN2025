import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  StatusBar,
  Dimensions,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import CartItem from '../ui/CartItem';
import EmptyCart from '../ui/EmptyCart';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  FadeIn,
  FadeOut,
  SlideInUp,
  Layout,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalPrice } = useSelector(state => state.cart);
  
  // Animation values
  const buttonScale = useSharedValue(1);
  
  // Button press animation
  const onCheckoutPressIn = () => {
    buttonScale.value = withTiming(0.95, { duration: 150 });
  };
  
  const onCheckoutPressOut = () => {
    buttonScale.value = withTiming(1, { duration: 150 });
  };
  
  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handleRemoveItem = (id) => {
    Alert.alert(
      'Видалити товар',
      'Ви впевнені, що хочете видалити цей товар з кошика?',
      [
        { text: 'Скасувати', style: 'cancel' },
        { text: 'Видалити', onPress: () => dispatch(removeFromCart(id)) },
      ],
      { cancelable: true }
    );
  };

  const handleUpdateQuantity = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    navigation.navigate('OrderForm');
  };

  const renderCartItem = ({ item, index }) => (
    <CartItem
      item={item}
      onRemove={() => handleRemoveItem(item.id)}
      onUpdateQuantity={(quantity) => handleUpdateQuantity(item.id, quantity)}
      index={index}
    />
  );

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E72E4" />
      
      {/* Header */}
      <LinearGradient
        colors={['#5E72E4', '#825EE4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Кошик</Text>
        <View style={styles.headerInfo}>
          <Icon name="cart-outline" size={18} color="#fff" />
          <Text style={styles.headerInfoText}>
            {totalAmount} {totalAmount === 1 ? 'товар' : 
             totalAmount > 1 && totalAmount < 5 ? 'товари' : 'товарів'}
          </Text>
        </View>
      </LinearGradient>

      {/* Main content */}
      <View style={styles.contentContainer}>
        {/* Cart items list */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{height: 2}} />}
        />
      </View>

      {/* Footer with total and checkout button */}
      <View style={[styles.footer, { marginBottom: Platform.OS === 'ios' ? 85 : 65 }]}>
        <View style={styles.totalSummary}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Кількість товарів:</Text>
            <Text style={styles.totalValue}>{totalAmount} шт.</Text>
          </View>
          
          <View style={styles.totalRow}>
            <Text style={styles.totalPriceLabel}>Загальна сума:</Text>
            <Text style={styles.totalPrice}>{totalPrice.toLocaleString()} ₴</Text>
          </View>
        </View>

        <LinearGradient
          colors={['#5E72E4', '#4355B9']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.checkoutButtonGradient}
        >
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
            onPressIn={onCheckoutPressIn}
            onPressOut={onCheckoutPressOut}
            activeOpacity={0.85}
          >
            <Icon name="wallet-outline" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.checkoutButtonText}>Оформити замовлення</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: StatusBar.currentHeight || 24,
    paddingBottom: 15,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerInfoText: {
    color: '#fff',
    marginLeft: 6,
    fontSize: 14,
    opacity: 0.9,
  },
  contentContainer: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 110, // Достатній відступ для футера
  },
  footer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 20,
    paddingBottom: 16,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  totalSummary: {
    marginBottom: 16,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 15,
    color: '#666',
  },
  totalValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalPriceLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
  checkoutButtonGradient: {
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#5E72E4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginTop: 8,
  },
  checkoutButton: {
    width: '100%',
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 8,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen;