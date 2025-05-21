import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const Header = () => (
  <View style={styles.headerContainer}>
    <Image 
      source={require('../assets/logo.png')}
      style={styles.logo} 
      resizeMode="contain"
    />
    <Text style={styles.appName}>FirstMobileApp</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logo: { 
    width: 200,
    height: 150,
  },
  appName: { 
    fontSize: 18, 
    fontWeight: 'bold',
    marginRight: 10,
  },
});

export default Header; 