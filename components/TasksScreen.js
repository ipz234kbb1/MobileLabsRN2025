import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from './TaskContext';

const TaskItem = ({ title, completed, count, goal, icon, color }) => {
  const progress = Math.min((count / goal) * 100, 100);
  
  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskHeader}>
        <View style={[styles.taskIcon, { backgroundColor: `${color}15` }]}>
          <Ionicons name={icon} size={22} color={color} />
        </View>
        <View style={styles.taskInfo}>
          <Text style={styles.taskTitle}>{title}</Text>
          <Text style={styles.taskProgress}>
            {completed ? 'Виконано' : `Прогрес: ${count}/${goal}`}
          </Text>
        </View>
        <View style={[styles.statusBadge, completed ? styles.completedBadge : styles.pendingBadge]}>
          <Text style={[styles.statusText, completed ? styles.completedText : styles.pendingText]}>
            {completed ? 'Готово' : 'В процесі'}
          </Text>
        </View>
      </View>
      
      <View style={styles.progressBar}>
        <View 
          style={[
            styles.progressFill, 
            { width: `${progress}%`, backgroundColor: completed ? '#26de81' : color }
          ]} 
        />
      </View>
    </View>
  );
};

const TasksScreen = ({ navigation }) => {
  const { tasks, resetTasks } = useTasks();
  
  const tasksList = [
    {
      id: '1',
      title: 'Зробити 10 кліків',
      completed: tasks.clickTen?.completed || false,
      count: tasks.clickTen?.count || 0,
      goal: tasks.clickTen?.goal || 10,
      icon: 'finger-print-outline',
      color: '#3e64ff'
    },
    {
      id: '2',
      title: 'Зробити 5 подвійних кліків',
      completed: tasks.doubleTapFive?.completed || false,
      count: tasks.doubleTapFive?.count || 0,
      goal: tasks.doubleTapFive?.goal || 5,
      icon: 'sync-outline',
      color: '#fc5c65'
    },
    {
      id: '3',
      title: 'Утримувати об\'єкт 3 секунди',
      completed: tasks.holdThreeSeconds?.completed || false,
      count: tasks.holdThreeSeconds?.count || 0,
      goal: tasks.holdThreeSeconds?.goal || 1,
      icon: 'timer-outline',
      color: '#26de81'
    },
    {
      id: '4',
      title: 'Перетягнути об\'єкт',
      completed: tasks.dragObject?.completed || false,
      count: tasks.dragObject?.count || 0,
      goal: tasks.dragObject?.goal || 1,
      icon: 'move-outline',
      color: '#4b7bec'
    },
    {
      id: '5',
      title: 'Зробити свайп вправо',
      completed: tasks.swipeRight?.completed || false,
      count: tasks.swipeRight?.count || 0,
      goal: tasks.swipeRight?.goal || 1,
      icon: 'arrow-forward-outline',
      color: '#fd9644'
    },
    {
      id: '6',
      title: 'Зробити свайп вліво',
      completed: tasks.swipeLeft?.completed || false,
      count: tasks.swipeLeft?.count || 0,
      goal: tasks.swipeLeft?.goal || 1,
      icon: 'arrow-back-outline',
      color: '#a55eea'
    },
    {
      id: '7',
      title: 'Змінити розмір об\'єкта',
      completed: tasks.changeSize?.completed || false,
      count: tasks.changeSize?.count || 0,
      goal: tasks.changeSize?.goal || 1,
      icon: 'expand-outline',
      color: '#2bcbba'
    },
    {
      id: '8',
      title: 'Набрати 100 очок',
      completed: tasks.score100?.completed || false,
      count: tasks.score100?.count || 0,
      goal: tasks.score100?.goal || 100,
      icon: 'trophy-outline',
      color: '#fed330'
    }
  ];

  const completedTasksCount = tasksList.filter(task => task.completed).length;
  const totalTasks = tasksList.length;
  const progressPercentage = (completedTasksCount / totalTasks) * 100;
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryContent}>
            <View style={styles.progressCircle}>
              <Text style={styles.progressNumber}>{completedTasksCount}/{totalTasks}</Text>
            </View>
            <View style={styles.summaryTextContainer}>
              <Text style={styles.summaryTitle}>Виконано завдань</Text>
              <Text style={styles.summarySubtitle}>
                {completedTasksCount === totalTasks
                  ? 'Вітаємо! Всі завдання виконано!'
                  : `Залишилось завдань: ${totalTasks - completedTasksCount}`}
              </Text>
            </View>
          </View>
          <View style={styles.overallProgressBar}>
            <View 
              style={[
                styles.overallProgressFill, 
                { width: `${progressPercentage}%`, backgroundColor: '#26de81' }
              ]} 
            />
          </View>
        </View>
      </View>
      
      <View style={styles.tasksContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Список завдань</Text>
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={resetTasks}
          >
            <Text style={styles.resetButtonText}>Скинути</Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={tasksList}
          renderItem={({ item }) => (
            <TaskItem 
              title={item.title} 
              completed={item.completed} 
              count={item.count}
              goal={item.goal}
              icon={item.icon}
              color={item.color}
            />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 15,
  },
  summaryCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  summaryContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3e64ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressNumber: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  summaryTextContainer: {
    flex: 1,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#777',
  },
  overallProgressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  overallProgressFill: {
    height: '100%',
    borderRadius: 4,
  },
  tasksContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#555',
  },
  resetButton: {
    backgroundColor: '#f1f1f1',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  resetButtonText: {
    color: '#555',
    fontSize: 12,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 90,
  },
  taskContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  taskProgress: {
    fontSize: 13,
    color: '#777',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  completedBadge: {
    backgroundColor: '#26de8115',
  },
  pendingBadge: {
    backgroundColor: '#fd964415',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  completedText: {
    color: '#26de81',
  },
  pendingText: {
    color: '#fd9644',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
});

export default TasksScreen; 