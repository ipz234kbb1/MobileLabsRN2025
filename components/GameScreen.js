import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import InteractiveObject from './InteractiveObject';
import { useTasks } from './TaskContext';

const { width, height } = Dimensions.get('window');

const GameScreen = ({ navigation }) => {
  const [score, setScore] = useState(0);
  const { tasks, updateTaskCount, completeTask } = useTasks();
  
  useEffect(() => {
    if (score >= 100 && !tasks.score100.completed) {
      completeTask('score100', 100);
    }
  }, [score, tasks.score100.completed, completeTask]);

  const handleDoubleTap = () => {
    setScore(prev => prev + 2);
    updateTaskCount('doubleTapFive');
  };

  const handleTap = () => {
    setScore(prev => prev + 1);
    updateTaskCount('clickTen');
  };

  const handleLongPress = () => {
    setScore(prev => prev + 5);
    completeTask('holdThreeSeconds');
  };

  const handleFlingLeft = () => {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    setScore(prev => prev + randomPoints);
    completeTask('swipeLeft');
  };

  const handleFlingRight = () => {
    const randomPoints = Math.floor(Math.random() * 10) + 1;
    setScore(prev => prev + randomPoints);
    completeTask('swipeRight');
  };

  const handlePinch = () => {
    setScore(prev => prev + 3);
    completeTask('changeSize');
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.scoreSection}>
          <LinearGradient
            colors={['#3e64ff', '#5edfff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.scoreContainer}
          >
            <View style={styles.scoreTextContainer}>
              <Text style={styles.scoreLabel}>Ваш рахунок</Text>
              <View style={styles.scoreValueContainer}>
                <Ionicons name="cash" size={30} color="#ffd700" style={styles.coinIcon} />
                <Text style={styles.scoreValue}>{score}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
        
        <View style={styles.centerContent}>
          <InteractiveObject
            onTap={handleTap}
            onDoubleTap={handleDoubleTap}
            onLongPress={handleLongPress}
            onFlingLeft={handleFlingLeft}
            onFlingRight={handleFlingRight}
            onPinch={handlePinch}
            taskCompleted={(name) => completeTask(name)}
          />
        </View>
        
        <View style={styles.bottomSection}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionTitle}>Управління жестами:</Text>
            
            <View style={styles.instructionRow}>
              <View style={styles.instructionIconContainer}>
                <Ionicons name="finger-print-outline" size={20} color="#3e64ff" />
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionLabel}>Одиночний дотик</Text>
                <Text style={styles.instructionDescription}>+1 очко</Text>
              </View>
            </View>
            
            <View style={styles.instructionRow}>
              <View style={styles.instructionIconContainer}>
                <Ionicons name="sync-outline" size={20} color="#fc5c65" />
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionLabel}>Подвійний дотик</Text>
                <Text style={styles.instructionDescription}>+2 очка</Text>
              </View>
            </View>
            
            <View style={styles.instructionRow}>
              <View style={styles.instructionIconContainer}>
                <Ionicons name="timer-outline" size={20} color="#26de81" />
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionLabel}>Довге натискання</Text>
                <Text style={styles.instructionDescription}>+5 очків (3 сек)</Text>
              </View>
            </View>
            
            <View style={styles.instructionRow}>
              <View style={styles.instructionIconContainer}>
                <Ionicons name="swap-horizontal-outline" size={20} color="#fd9644" />
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionLabel}>Свайп</Text>
                <Text style={styles.instructionDescription}>+1-10 очків</Text>
              </View>
            </View>
            
            <View style={styles.instructionRow}>
              <View style={styles.instructionIconContainer}>
                <Ionicons name="expand-outline" size={20} color="#a55eea" />
              </View>
              <View style={styles.instructionTextContainer}>
                <Text style={styles.instructionLabel}>Масштабування</Text>
                <Text style={styles.instructionDescription}>+3 очка</Text>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
  },
  scoreSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  scoreContainer: {
    borderRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: '#3e64ff',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  scoreTextContainer: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 5,
  },
  scoreValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  coinIcon: {
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#ffffff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSection: {
    marginTop: 'auto',
    paddingBottom: 15,
  },
  instructionContainer: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  instructionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  instructionIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  instructionTextContainer: {
    flex: 1,
  },
  instructionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginBottom: 1,
  },
  instructionDescription: {
    fontSize: 12,
    color: '#777',
  },
});

export default GameScreen; 