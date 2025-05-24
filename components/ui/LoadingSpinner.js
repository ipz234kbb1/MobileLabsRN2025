import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const LoadingSpinner = ({ message = 'Завантаження...' }) => {
  // Animation values for dots
  const dot1Opacity = useSharedValue(0.3);
  const dot2Opacity = useSharedValue(0.3);
  const dot3Opacity = useSharedValue(0.3);
  
  // Animation values for icon
  const rotation = useSharedValue(0);
  const scale = useSharedValue(1);
  
  // Text animation
  const textWidth = useSharedValue(0);
  
  useEffect(() => {
    // Animate dots
    dot1Opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 600 }),
        withTiming(0.3, { duration: 600 })
      ),
      -1,
      true
    );
    
    dot2Opacity.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.3, { duration: 600 })
        ),
        -1,
        true
      )
    );
    
    dot3Opacity.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 600 }),
          withTiming(0.3, { duration: 600 })
        ),
        -1,
        true
      )
    );
    
    // Animate icon
    rotation.value = withRepeat(
      withTiming(360, { 
        duration: 2000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
    
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000 }),
        withTiming(0.9, { duration: 1000 })
      ),
      -1,
      true
    );
    
    // Animate text
    textWidth.value = withTiming(width * 0.7, { duration: 800 });
  }, []);
  
  // Animated styles
  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1Opacity.value,
  }));
  
  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2Opacity.value,
  }));
  
  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3Opacity.value,
  }));
  
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${rotation.value}deg` },
      { scale: scale.value },
    ],
  }));
  
  const textStyle = useAnimatedStyle(() => ({
    width: textWidth.value,
    overflow: 'hidden',
  }));
  
  const progressStyle = useAnimatedStyle(() => {
    const width = interpolate(
      textWidth.value,
      [0, width * 0.7],
      [0, 100],
    );
    
    return {
      width: `${width}%`,
    };
  });
  
  return (
    <LinearGradient
      colors={['#f8f9fa', '#edf2f7']}
      style={styles.container}
    >
      <View style={styles.loadingCard}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          <Icon name="cart-outline" size={40} color="#5E72E4" />
        </Animated.View>
        
        <Text style={styles.title}>Завантаження</Text>
        
        <Animated.View style={[styles.progressContainer, textStyle]}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </Animated.View>
        
        <Text style={styles.message}>{message}</Text>
        
        <View style={styles.dotsContainer}>
          <Animated.View style={[styles.dot, dot1Style]} />
          <Animated.View style={[styles.dot, dot2Style]} />
          <Animated.View style={[styles.dot, dot3Style]} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingCard: {
    width: width * 0.85,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(94, 114, 228, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  progressContainer: {
    height: 6,
    backgroundColor: '#edf2f7',
    borderRadius: 3,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#5E72E4',
    borderRadius: 3,
  },
  message: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#5E72E4',
    marginHorizontal: 4,
  },
});

export default LoadingSpinner;