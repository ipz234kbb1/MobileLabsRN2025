import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const Navigation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const tabs = [
    { name: 'Головна', icon: 'home', screen: 'Home' },
    { name: 'Фотогалерея', icon: 'image', screen: 'Gallery' },
    { name: 'Профіль', icon: 'user', screen: 'Profile' }
  ];

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => {
        const isActive = route.name === tab.screen;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => navigation.navigate(tab.screen)}
          >
            <FontAwesome 
              name={tab.icon} 
              size={22} 
              color={isActive ? '#0066cc' : '#777777'} 
            />
            <Text 
              style={[
                styles.tabText, 
                isActive && styles.activeTabText
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    backgroundColor: '#e8e8e8',
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
  },
  activeTabText: {
    color: '#0066cc',
    fontWeight: 'bold',
  }
});

export default Navigation; 