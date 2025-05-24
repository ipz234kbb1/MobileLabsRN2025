import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../store/slices/userSlice';
import { addOrder, saveOrders, saveOrdersToStorage } from '../store/slices/ordersSlice';
import { clearCart } from '../store/slices/cartSlice';
import { store } from '../store/store';
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const OrderFormScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, totalAmount, totalPrice } = useSelector(state => state.cart);
  const user = useSelector(state => state.user);

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    }

    if (!email.trim()) {
      newErrors.email = 'Email є обов\'язковим';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Невірний формат email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    // Зберігаємо дані користувача
    dispatch(setUser({ name: name.trim(), email: email.trim() }));

    // Створюємо замовлення
    const orderData = {
      items: [...items],
      totalAmount,
      totalPrice,
      customerName: name.trim(),
      customerEmail: email.trim(),
    };
    
    // Додаємо замовлення до стану
    dispatch(addOrder(orderData));
    
    // Зберігаємо замовлення в AsyncStorage
    dispatch(saveOrdersToStorage()); // Позначаємо, що потрібно зберегти стан
    
    // Також явно зберігаємо всі замовлення в AsyncStorage для надійності
    setTimeout(() => {
      const currentOrders = store.getState().orders.items;
      dispatch(saveOrders(currentOrders));
    }, 100);
    
    // Очищаємо кошик
    dispatch(clearCart());

    Alert.alert(
      'Замовлення оформлене!',
      'Дякуємо за покупку! Ваше замовлення успішно оформлене.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('CartMain'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5E72E4" />
      
      {/* Header with back button */}
      <LinearGradient
        colors={['#5E72E4', '#825EE4']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.header}
      >
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Оформлення замовлення</Text>
      </LinearGradient>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.content}>
            {/* Order summary */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Ваше замовлення</Text>
              <View style={styles.orderInfo}>
                <Text style={styles.orderInfoLabel}>Товарів:</Text>
                <Text style={styles.orderInfoValue}>{totalAmount} шт.</Text>
              </View>
              <View style={styles.orderInfo}>
                <Text style={styles.orderInfoLabel}>Загальна сума:</Text>
                <Text style={styles.totalPrice}>{totalPrice.toLocaleString()} ₴</Text>
              </View>
            </View>

            {/* Contact information */}
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Контактні дані</Text>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Ім'я <Text style={styles.requiredStar}>*</Text></Text>
                <TextInput
                  style={[styles.input, errors.name && styles.inputError]}
                  value={name}
                  onChangeText={setName}
                  placeholder="Введіть ваше ім'я"
                  autoCapitalize="words"
                />
                {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Email <Text style={styles.requiredStar}>*</Text></Text>
                <TextInput
                  style={[styles.input, errors.email && styles.inputError]}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Введіть ваш email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Submit button */}
        <View style={styles.submitButtonContainer}>
          <LinearGradient
            colors={['#5E72E4', '#4355B9']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={styles.submitButtonGradient}
          >
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Icon name="checkmark-circle-outline" size={20} color="#fff" style={styles.submitIcon} />
              <Text style={styles.submitButtonText}>Підтвердити замовлення</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    paddingTop: StatusBar.currentHeight || 24,
    paddingBottom: 15,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 16,
    paddingBottom: 120, // Для уникнення перекриття кнопкою
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderInfoLabel: {
    fontSize: 15,
    color: '#666',
  },
  orderInfoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    marginBottom: 8,
    color: '#555',
  },
  requiredStar: {
    color: '#e53935',
    fontWeight: 'bold',
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#e53935',
    borderWidth: 1.5,
  },
  errorText: {
    color: '#e53935',
    fontSize: 13,
    marginTop: 5,
    fontWeight: '500',
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    marginBottom: Platform.OS === 'ios' ? 85 : 65, // Враховуємо висоту нижньої навігації
  },
  submitButtonGradient: {
    borderRadius: 12,
    elevation: 6,
    shadowColor: '#5E72E4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  submitButton: {
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  submitIcon: {
    marginRight: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderFormScreen;