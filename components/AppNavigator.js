import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

import GameScreen from './GameScreen';
import TasksScreen from './TasksScreen';
import { TaskProvider } from './TaskContext';

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, focused, label }) => {
  return (
    <View style={styles.tabIconContainer}>
      <Ionicons
        name={name}
        size={24}
        color={focused ? '#3e64ff' : '#8e9aaf'}
      />
      <Text style={[
        styles.tabLabel,
        { color: focused ? '#3e64ff' : '#8e9aaf' }
      ]}>
        {label}
      </Text>
    </View>
  );
};

const AppNavigator = () => {
  return (
    <TaskProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#ffffff',
              elevation: 0,
              shadowOpacity: 0,
              borderBottomWidth: 0,
            },
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
              color: '#3e64ff',
            },
            tabBarStyle: {
              height: 60,
              paddingBottom: 8,
              paddingTop: 8,
              backgroundColor: '#ffffff',
              borderTopWidth: 1,
              borderTopColor: '#f1f1f1',
              elevation: 10,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 3,
            },
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen 
            name="Game" 
            component={GameScreen} 
            options={{
              title: 'Clicker Game',
              tabBarIcon: ({ focused }) => (
                <TabIcon name={focused ? 'game-controller' : 'game-controller-outline'} focused={focused} label="Гра" />
              ),
            }} 
          />
          <Tab.Screen 
            name="Tasks" 
            component={TasksScreen} 
            options={{
              title: 'Завдання',
              tabBarIcon: ({ focused }) => (
                <TabIcon name={focused ? 'list' : 'list-outline'} focused={focused} label="Завдання" />
              ),
            }} 
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TaskProvider>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default AppNavigator; 