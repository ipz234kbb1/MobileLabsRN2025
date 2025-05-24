import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const EmptyOrders = () => {
  const navigation = useNavigation();

  const handleGoToCatalog = () => {
    navigation.navigate('Catalog');
  };

  return (
    <View style={styles.container}>
      <Icon name="receipt-outline" size={80} color="#ccc" />
      <Text style={styles.title}>Немає замовлень</Text>
      <Text style={styles.subtitle}>
        Ви ще не зробили жодного замовлення.{'\n'}
        Перегляньте наш каталог товарів!
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleGoToCatalog}
      >
        <Text style={styles.buttonText}>
          Перейти до каталогу
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EmptyOrders;