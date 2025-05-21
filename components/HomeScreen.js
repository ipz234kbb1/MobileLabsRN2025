import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

const HomeScreen = () => {
  const news = new Array(8).fill({ 
    title: 'Заголовок новини', 
    date: 'Дата новини', 
    text: 'Короткий текст новини' 
  });

  return (
    <View style={styles.container}>
      <Header />
      <Navigation />
      <Text style={styles.pageTitle}>Новини</Text>
      <FlatList
        data={news}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.newsItem}>
            <Image source={require('../assets/placeholder.png')} style={styles.newsImage} />
            <View style={styles.newsContent}>
              <Text style={styles.newsTitle}>{item.title}</Text>
              <Text style={styles.newsDate}>{item.date}</Text>
              <Text style={styles.newsText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff',
  },
  pageTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 16 
  },
  newsItem: { 
    flexDirection: 'row', 
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  newsImage: { 
    width: 60, 
    height: 60, 
    marginRight: 12,
    backgroundColor: '#f0f0f0'
  },
  newsContent: {
    flex: 1,
  },
  newsTitle: { 
    fontWeight: 'bold', 
    fontSize: 16,
    marginBottom: 4
  },
  newsDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4
  },
  newsText: {
    fontSize: 14,
    color: '#333'
  }
});

export default HomeScreen; 