import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useSelector } from 'react-redux';
import OrderItem from '../ui/OrderItem';
import EmptyOrders from '../ui/EmptyOrders';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withDelay,
  FadeIn,
  SlideInDown,
  Layout,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import LoadingSpinner from '../ui/LoadingSpinner';

const { width } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const OrderHistoryScreen = () => {
  const { items: orders, loading } = useSelector(state => state.orders);
  
  // Animation values
  const headerHeight = useSharedValue(0);
  const headerOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Animate header on mount
    headerHeight.value = withTiming(50, { duration: 500 });
    headerOpacity.value = withTiming(1, { duration: 700 });
  }, []);
  
  const headerAnimatedStyle = useAnimatedStyle(() => ({
    height: headerHeight.value,
    opacity: headerOpacity.value,
  }));

  const renderOrder = ({ item, index }) => (
    <OrderItem 
      order={item} 
      index={index}
    />
  );

  if (loading) {
    return <LoadingSpinner message="Завантаження замовлень..." />;
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E72E4" />
      
      {/* Gradient Header */}
      <LinearGradient
        colors={['#5E72E4', '#825EE4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}
      >
        <Animated.View 
          style={[styles.headerContent, headerAnimatedStyle]}
          entering={SlideInDown.duration(500)}
        >
          <Text style={styles.title}>Історія замовлень</Text>
          <View style={styles.headerInfo}>
            <Icon name="time-outline" size={18} color="#fff" />
            <Text style={styles.headerInfoText}>
              {orders.length} {orders.length === 1 ? 'замовлення' : 
               orders.length > 1 && orders.length < 5 ? 'замовлення' : 'замовлень'}
            </Text>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Orders list */}
      <AnimatedFlatList
        data={orders}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{height: 2}} />}
        layout={Layout.springify()}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="receipt-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Немає замовлень</Text>
          </View>
        }
      />
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
  headerContent: {
    justifyContent: 'space-between',
  },
  title: {
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
  listContainer: {
    padding: 16,
    paddingBottom: 100, // Extra padding for the tab bar
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#999',
    fontSize: 16,
    marginTop: 10,
  },
});

export default OrderHistoryScreen;