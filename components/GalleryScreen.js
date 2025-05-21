import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

const GalleryScreen = () => {
  const galleryItems = Array(10).fill(null);
  
  return (
    <View style={styles.container}>
      <Header />
      <Navigation />
      <ScrollView>
        <View style={styles.gallery}>
          {galleryItems.map((_, index) => (
            <View key={index} style={styles.galleryItem} />
          ))}
        </View>
      </ScrollView>
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  gallery: { 
    flexDirection: 'row', 
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  galleryItem: { 
    width: '48%', 
    height: 100,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  }
});

export default GalleryScreen; 