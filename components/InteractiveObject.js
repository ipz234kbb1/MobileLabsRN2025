import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import {
  TapGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  FlingGestureHandler,
  PinchGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { Directions } from 'react-native-gesture-handler';

const InteractiveObject = ({ 
  onTap, 
  onDoubleTap, 
  onLongPress, 
  onFlingLeft, 
  onFlingRight, 
  onPinch,
  taskCompleted
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const rotation = useRef(new Animated.Value(0)).current;
  const doubleTapRef = useRef(null);
  const panRef = useRef(null);
  const pinchRef = useRef(null);
  const flingRef = useRef(null);
  const longPressRef = useRef(null);

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      friction: 5
    }).start();
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      friction: 5
    }).start();
  }, [position]);

  const onSingleTapEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onTap();
      
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.05,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onDoubleTapEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onDoubleTap();
      
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.2,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
      
      Animated.timing(rotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        rotation.setValue(0);
      });
    }
  };

  const onLongPressEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onLongPress();
      
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  };

  const onPanEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      translateX.setValue(event.nativeEvent.translationX);
      translateY.setValue(event.nativeEvent.translationY);
    } else if (event.nativeEvent.state === State.END) {
      setPosition({
        x: position.x + event.nativeEvent.translationX,
        y: position.y + event.nativeEvent.translationY,
      });
      taskCompleted('dragObject');
    }
  };

  const onFlingLeftEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onFlingLeft();
      taskCompleted('swipeLeft');
      
      Animated.timing(translateX, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5
        }).start();
      });
    }
  };

  const onFlingRightEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      onFlingRight();
      taskCompleted('swipeRight');
      
      Animated.timing(translateX, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5
        }).start();
      });
    }
  };

  const onPinchEvent = event => {
    if (event.nativeEvent.state === State.ACTIVE) {
      scale.setValue(event.nativeEvent.scale);
    } else if (event.nativeEvent.state === State.END) {
      if (event.nativeEvent.scale > 1.5 || event.nativeEvent.scale < 0.5) {
        onPinch();
        taskCompleted('changeSize');
      }
      
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    }
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <PanGestureHandler
      onGestureEvent={onPanEvent}
      onHandlerStateChange={onPanEvent}
      ref={panRef}
      simultaneousHandlers={[pinchRef, flingRef, longPressRef, doubleTapRef]}
    >
      <Animated.View>
        <PinchGestureHandler
          onGestureEvent={onPinchEvent}
          onHandlerStateChange={onPinchEvent}
          ref={pinchRef}
          simultaneousHandlers={[panRef, flingRef, longPressRef, doubleTapRef]}
        >
          <Animated.View>
            <FlingGestureHandler
              direction={Directions.LEFT}
              onHandlerStateChange={onFlingLeftEvent}
              ref={flingRef}
              simultaneousHandlers={[panRef, pinchRef, longPressRef, doubleTapRef]}
            >
              <Animated.View>
                <FlingGestureHandler
                  direction={Directions.RIGHT}
                  onHandlerStateChange={onFlingRightEvent}
                  simultaneousHandlers={[panRef, pinchRef, longPressRef, doubleTapRef]}
                >
                  <Animated.View>
                    <LongPressGestureHandler
                      onHandlerStateChange={onLongPressEvent}
                      minDurationMs={3000}
                      ref={longPressRef}
                      simultaneousHandlers={[panRef, pinchRef, flingRef, doubleTapRef]}
                    >
                      <Animated.View>
                        <TapGestureHandler
                          onHandlerStateChange={onSingleTapEvent}
                          waitFor={doubleTapRef}
                          simultaneousHandlers={[panRef, pinchRef, flingRef, longPressRef, doubleTapRef]}
                        >
                          <Animated.View>
                            <TapGestureHandler
                              ref={doubleTapRef}
                              onHandlerStateChange={onDoubleTapEvent}
                              numberOfTaps={2}
                              simultaneousHandlers={[panRef, pinchRef, flingRef, longPressRef]}
                            >
                              <Animated.View
                                style={[
                                  styles.containerShadow,
                                  {
                                    transform: [
                                      { translateX },
                                      { translateY },
                                      { scale },
                                      { rotate: spin }
                                    ]
                                  }
                                ]}
                              >
                                <LinearGradient
                                  colors={['#FFD700', '#FFA500']}
                                  start={{ x: 0, y: 0 }}
                                  end={{ x: 1, y: 1 }}
                                  style={styles.container}
                                >
                                  <Ionicons name="cash" size={80} color="#fff" style={styles.coinIcon} />
                                </LinearGradient>
                              </Animated.View>
                            </TapGestureHandler>
                          </Animated.View>
                        </TapGestureHandler>
                      </Animated.View>
                    </LongPressGestureHandler>
                  </Animated.View>
                </FlingGestureHandler>
              </Animated.View>
            </FlingGestureHandler>
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  containerShadow: {
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
  },
  container: {
    width: 160,
    height: 160,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coinIcon: {
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  }
});

export default InteractiveObject; 