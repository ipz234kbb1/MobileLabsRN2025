import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Footer = () => (
  <Text style={styles.footerText}>Кошляк Владислав Віталійович ІПЗ-23-4</Text>
);

const styles = StyleSheet.create({
  footerText: { 
    textAlign: 'center', 
    paddingVertical: 10, 
    fontSize: 12,
    color: '#333333',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e8e8e8'
  }
});

export default Footer; 