import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSequence,
  Easing,
  runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';

const SuccessCheckmark = ({ visible, onAnimationEnd }) => {
  // Animation values
  const opacity = useSharedValue(0);
  const scale = useSharedValue(0.3);
  
  useEffect(() => {
    if (visible) {
      // Start animation sequence
      scale.value = withSequence(
        withTiming(1.2, { duration: 300, easing: Easing.out(Easing.cubic) }),
        withTiming(1, { duration: 200 })
      );
      
      opacity.value = withTiming(1, { duration: 300 });
      
      // Hide after delay
      opacity.value = withDelay(
        1500, // Show for 1.5 seconds
        withTiming(0, { 
          duration: 300,
          easing: Easing.inOut(Easing.cubic) 
        }, (finished) => {
          if (finished && onAnimationEnd) {
            runOnJS(onAnimationEnd)();
          }
        })
      );
    } else {
      opacity.value = 0;
      scale.value = 0.3;
    }
  }, [visible]);
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [
        { scale: scale.value }
      ]
    };
  });
  
  if (!visible) return null;
  
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.checkContainer, animatedStyle]}>
        <Icon name="checkmark" size={36} color="#fff" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  checkContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default SuccessCheckmark;
