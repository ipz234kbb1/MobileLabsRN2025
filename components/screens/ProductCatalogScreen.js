import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  RefreshControl,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import { loadProducts } from '../store/slices/productsSlice';
import ProductCard from '../ui/ProductCard';
import LoadingSpinner from '../ui/LoadingSpinner';
import SuccessCheckmark from '../ui/SuccessCheckmark';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
  SlideInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const ProductCatalogScreen = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [refreshing, setRefreshing] = useState(false);
  const [showCheckmark, setShowCheckmark] = useState(false);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(loadProducts());
    }
  }, [dispatch, products.length]);

  // Extract unique categories from products
  const categories = ['all', ...new Set(products.map(product => product.category))];

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (product) => {
    // Animation for add to cart
    dispatch(addToCart(product));
    
    // Show success checkmark animation
    setShowCheckmark(true);
  };
  
  const handleAnimationEnd = useCallback(() => {
    setShowCheckmark(false);
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await dispatch(loadProducts());
    setRefreshing(false);
  };

  const renderProduct = ({ item, index }) => (
    <ProductCard
      product={item}
      onAddToCart={() => handleAddToCart(item)}
      index={index}
    />
  );

  // Animation for header
  const headerOpacity = useSharedValue(0);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 700 });
  }, []);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerOpacity.value,
    };
  });

  // Loading state
  if (loading && products.length === 0) {
    return <LoadingSpinner message="Завантаження товарів..." />;
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E72E4" />
      
      {/* Success Checkmark Animation */}
      <SuccessCheckmark visible={showCheckmark} onAnimationEnd={handleAnimationEnd} />
      
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
          <Text style={styles.title}>Каталог товарів</Text>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Icon name="search-outline" size={20} color="#999" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Пошук товарів"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Icon name="close-circle" size={20} color="#999" />
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </LinearGradient>
      
      {/* Categories */}
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item && styles.categoryButtonActive
              ]}
              onPress={() => setSelectedCategory(item)}
            >
              <Text 
                style={[
                  styles.categoryButtonText,
                  selectedCategory === item && styles.categoryButtonTextActive
                ]}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Error Message */}
      {error && (
        <Animated.View 
          style={styles.errorContainer}
          entering={FadeIn}
          exiting={FadeOut}
        >
          <Icon name="alert-circle" size={18} color="#FFF" />
          <Text style={styles.errorText}>
            Помилка завантаження: {error}
          </Text>
        </Animated.View>
      )}

      {/* Products List */}
      <AnimatedFlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#5E72E4']}
            tintColor="#5E72E4"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="cart-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>
              {searchQuery ? 'Товарів не знайдено' : 'Немає доступних товарів'}
            </Text>
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
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 44,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#333',
    fontSize: 15,
  },
  categoriesContainer: {
    marginVertical: 10,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#f1f3f5',
    marginRight: 10,
  },
  categoryButtonActive: {
    backgroundColor: '#5E72E4',
  },
  categoryButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  errorContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f44336',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
    marginLeft: 8,
  },
  listContainer: {
    padding: 10,
    paddingBottom: 20,
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

export default ProductCatalogScreen;