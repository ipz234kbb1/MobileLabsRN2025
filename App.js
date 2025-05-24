import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { View, Text, StatusBar, ActivityIndicator, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider, SafeAreaView, initialWindowMetrics } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

import { store, persistor } from './components/store/store';
import { loadOrders } from './components/store/slices/ordersSlice';
import { loadProducts } from './components/store/slices/productsSlice';

// Screens
import ProductCatalogScreen from './components/screens/ProductCatalogScreen';
import CartScreen from './components/screens/CartScreen';
import OrderFormScreen from './components/screens/OrderFormScreen';
import OrderHistoryScreen from './components/screens/OrderHistoryScreen';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Custom theme
const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5E72E4',
    background: '#f8f9fa',
    card: '#fff',
    text: '#333',
    border: '#e0e0e0',
    notification: '#FF5E5E',
  },
};

// Navigation configuration
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Tab Bar
const TabBarIcon = ({ focused, color, name }) => {
  return (
    <View style={{
      backgroundColor: focused ? '#5E72E4' : 'transparent',
      padding: focused ? 8 : 0,
      borderRadius: 12,
    }}>
      <Icon 
        name={name} 
        size={22} 
        color={focused ? '#fff' : '#888'} 
      />
    </View>
  );
};

// CartStack navigator component for cart and order form
const CartStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: '#f8f9fa' },
    }}
  >
    <Stack.Screen
      name="CartMain"
      component={CartScreen}
    />
    <Stack.Screen
      name="OrderForm"
      component={OrderFormScreen}
    />
  </Stack.Navigator>
);

// Main application content with navigation
const AppContent = () => {
  const dispatch = useDispatch();
  
  // Animation values for tab bar
  const tabBarTranslateY = useSharedValue(100);
  
  useEffect(() => {
    dispatch(loadOrders());
    dispatch(loadProducts());
    
    // Animate tab bar in
    tabBarTranslateY.value = withTiming(0, { duration: 800 });
  }, [dispatch]);
  
  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: tabBarTranslateY.value }],
  }));

  return (
    <NavigationContainer theme={AppTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Каталог') {
              iconName = focused ? 'grid' : 'grid-outline';
            } else if (route.name === 'Кошик') {
              iconName = focused ? 'cart' : 'cart-outline';
            } else if (route.name === 'Замовлення') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            }
            return <TabBarIcon focused={focused} color={color} name={iconName} />;
          },
          tabBarActiveTintColor: '#5E72E4',
          tabBarInactiveTintColor: '#888',
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#fff',
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -3 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: Platform.OS === 'ios' ? 85 : 65,
            paddingBottom: Platform.OS === 'ios' ? 25 : 8,
            paddingTop: 8,
            position: 'absolute',
            // Animated style is applied inline
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 2,
          },
          tabBarHideOnKeyboard: true,
        })}
      >
        <Tab.Screen
          name="Каталог"
          component={ProductCatalogScreen}
          options={{
            unmountOnBlur: false,
          }}
        />
        <Tab.Screen
          name="Кошик"
          component={CartStack}
          options={{
            unmountOnBlur: false,
          }}
        />
        <Tab.Screen
          name="Замовлення"
          component={OrderHistoryScreen}
          options={{
            unmountOnBlur: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <StatusBar barStyle="light-content" backgroundColor="#5E72E4" translucent={false} />
      <Provider store={store}>
        <PersistGate
          loading={<LoadingSpinner message="Завантаження додатку..." />}
          persistor={persistor}
        >
          <AppContent />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;