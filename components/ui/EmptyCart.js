import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
  withSequence,
  withDelay,
  Easing,
  FadeIn,
  SlideInDown,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const EmptyCart = () => {
  const navigation = useNavigation();
  
  // Animation values
  const iconScale = useSharedValue(1);
  const iconRotate = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  const contentTranslateY = useSharedValue(30);
  const contentOpacity = useSharedValue(0);
  
  useEffect(() => {
    // Icon animations
    iconRotate.value = withRepeat(
      withTiming(360, { 
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    iconScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }),
        withTiming(1, { duration: 1500, easing: Easing.bezier(0.25, 0.1, 0.25, 1) })
      ),
      -1,
      true
    );
    
    // Content animations
    contentOpacity.value = withTiming(1, { duration: 800 });
    contentTranslateY.value = withTiming(0, { 
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
  }, []);
  
  // Animated styles
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${iconRotate.value}deg` },
      { scale: iconScale.value },
    ],
  }));
  
  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));
  
  const buttonAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));
  
  // Button press animations
  const onButtonPressIn = () => {
    buttonScale.value = withTiming(0.95, { duration: 150 });
  };
  
  const onButtonPressOut = () => {
    buttonScale.value = withTiming(1, { duration: 150 });
  };
  
  const handleGoToCatalog = () => {
    navigation.navigate('Каталог');
  };

  return (
    <LinearGradient
      colors={['#f8f9fa', '#edf2f7']}
      style={styles.container}
    >
      <View style={styles.card}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <Icon name="cart-outline" size={70} color="#5E72E4" />
        </Animated.View>
        
        <Animated.View style={contentStyle}>
          <Text style={styles.title}>Ваш кошик порожній</Text>
          <Text style={styles.subtitle}>
            Додайте товари з каталогу, щоб зробити замовлення
          </Text>
        </Animated.View>
        
        <Animated.View style={[styles.buttonWrapper, contentStyle]}>
          <AnimatedTouchable
            style={[styles.button, buttonAnimStyle]}
            onPress={handleGoToCatalog}
            onPressIn={onButtonPressIn}
            onPressOut={onButtonPressOut}
            activeOpacity={0.85}
          >
            <Icon name="grid-outline" size={18} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>
              Перейти до каталогу
            </Text>
          </AnimatedTouchable>
          
          <View style={styles.decorationCircle1} />
          <View style={styles.decorationCircle2} />
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    width: width * 0.85,
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(94, 114, 228, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  button: {
    backgroundColor: '#5E72E4',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#5E72E4',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  decorationCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(94, 114, 228, 0.05)',
    top: -50,
    right: -30,
    zIndex: -1,
  },
  decorationCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(94, 114, 228, 0.08)',
    bottom: -30,
    left: -20,
    zIndex: -1,
  },
});

export default EmptyCart;