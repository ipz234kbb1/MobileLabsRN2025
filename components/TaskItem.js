import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TaskItem = ({ title, completed }) => {
  return (
    <View style={styles.container}>
      <View style={styles.taskInfo}>
        <Text style={styles.title}>{title}</Text>
        <View style={[styles.statusIndicator, completed ? styles.completed : styles.incomplete]} />
      </View>
      <Text style={[styles.status, completed ? styles.completedText : styles.incompleteText]}>
        {completed ? 'Completed' : 'Incomplete'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2,
  },
  taskInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  completed: {
    backgroundColor: '#4CAF50',
  },
  incomplete: {
    backgroundColor: '#F44336',
  },
  completedText: {
    color: '#4CAF50',
  },
  incompleteText: {
    color: '#F44336',
  },
});

export default TaskItem; 