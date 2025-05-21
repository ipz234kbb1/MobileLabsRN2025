import React from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './Header';
import Footer from './Footer';
import Navigation from './Navigation';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <Navigation />
      <Text style={styles.pageTitle}>Реєстрація</Text>
      <ScrollView style={styles.formContainer}>
        <Text style={styles.inputLabel}>Електронна пошта</Text>
        <TextInput style={styles.input} />
        
        <Text style={styles.inputLabel}>Пароль</Text>
        <TextInput style={styles.input} secureTextEntry />
        
        <Text style={styles.inputLabel}>Пароль (ще раз)</Text>
        <TextInput style={styles.input} secureTextEntry />
        
        <Text style={styles.inputLabel}>Прізвище</Text>
        <TextInput style={styles.input} />
        
        <Text style={styles.inputLabel}>Ім'я</Text>
        <TextInput style={styles.input} />
        
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Зареєструватися</Text>
        </TouchableOpacity>
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
  pageTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginVertical: 16 
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputLabel: {
    marginBottom: 6,
    fontSize: 14,
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 12, 
    marginBottom: 16, 
    borderRadius: 4,
    backgroundColor: '#fff'
  },
  button: { 
    backgroundColor: '#007BFF', 
    padding: 15, 
    borderRadius: 4, 
    alignItems: 'center',
    marginBottom: 24
  },
  buttonText: { 
    color: '#fff', 
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ProfileScreen; 