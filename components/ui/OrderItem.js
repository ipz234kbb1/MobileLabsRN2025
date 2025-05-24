import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  Platform,
  Dimensions,
  Pressable,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const OrderItem = ({ order, index = 0 }) => {
  const [modalVisible, setModalVisible] = useState(false);
  
  // Animation values
  const iconRotate = useSharedValue(0);
  const detailsHeight = useSharedValue(0);
  const expanded = useSharedValue(0);
  
  // Initialize animations
  useEffect(() => {
    // We'll use built-in animations instead of shared values for opacity
    // to avoid the conflict warning with layout animations
  }, []);
  
  // No longer using the animatedStyle with opacity - we'll use built-in animations instead
  
  // Icon rotation animation style
  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotate.value}deg` }],
  }));
  
  // Продовжуємо використовувати інші анімаційні стилі для компонентів не пов'язаних з модальним вікном
  
  // Toggle details animation
  const toggleDetails = () => {
    expanded.value = expanded.value === 0 ? 1 : 0;
    
    iconRotate.value = withTiming(
      expanded.value === 1 ? 90 : 0, 
      { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    );
    
    detailsHeight.value = withTiming(
      expanded.value === 1 ? 120 : 0, 
      { duration: 300, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }
    );
  };
  
  // Details animation style
  const detailsAnimatedStyle = useAnimatedStyle(() => ({
    height: detailsHeight.value,
    overflow: 'hidden',
    display: detailsHeight.value === 0 ? 'none' : 'flex',
  }));

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const toggleModal = () => {
    // Просто перемикаємо видимість модального вікна без анімацій
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fff', '#fcfcff']}
        style={styles.gradientBackground}
      >
        <View style={styles.header}>
          <View style={styles.orderInfo}>
            <View style={styles.orderIdContainer}>
              <Icon name="receipt-outline" size={18} color="#5E72E4" style={styles.orderIcon} />
              <Text style={styles.orderId}>
                Замовлення #{order.id}
              </Text>
            </View>
            <Text style={styles.date}>
              {formatDate(order.date)}
            </Text>
          </View>
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>Виконано</Text>
          </View>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.priceLabel}>Сума замовлення:</Text>
          <Text style={styles.totalAmount}>
            {order.totalPrice.toLocaleString()} ₴
          </Text>
        </View>

        <TouchableOpacity style={styles.detailsToggle} onPress={toggleDetails}>
          <Text style={styles.detailsToggleText}>Інформація про замовника</Text>
          <Animated.View style={iconAnimatedStyle}>
            <Icon name="chevron-forward" size={18} color="#5E72E4" />
          </Animated.View>
        </TouchableOpacity>

        <Animated.View style={[styles.detailsContainer, detailsAnimatedStyle]}>
          <View style={styles.customerInfo}>
            <Text style={styles.customerLabel}>Замовник:</Text>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <Text style={styles.customerEmail}>{order.customerEmail}</Text>
          </View>

          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Товарів:</Text>
              <Text style={styles.detailValue}>{order.totalAmount} шт.</Text>
            </View>
          </View>
        </Animated.View>

        <Pressable 
          style={({ pressed }) => [
            styles.expandButton,
            pressed && styles.expandButtonPressed
          ]}
          onPress={toggleModal}
          android_ripple={{ color: 'rgba(94, 114, 228, 0.2)' }}
        >
          <Text style={styles.expandText}>Детальніше</Text>
          <Icon name="chevron-forward-outline" size={16} color="#5E72E4" />
        </Pressable>
      </LinearGradient>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
        statusBarTranslucent={true}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <LinearGradient
              colors={['#5E72E4', '#825EE4']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.modalHeader}
            >
              <Text style={styles.modalTitle}>Деталі замовлення #{order.id}</Text>
              <TouchableOpacity onPress={toggleModal} style={styles.closeIcon}>
                <Icon name="close" size={24} color="#fff" />
              </TouchableOpacity>
            </LinearGradient>

            <View style={{ flex: 1 }}>
              <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Інформація про замовлення</Text>
                  <View style={styles.modalRow}>
                    <Icon name="calendar-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.modalItemText}>Дата: {formatDate(order.date)}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Icon name="cash-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.modalItemText}>Загальна сума: {order.totalPrice.toLocaleString()} ₴</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Icon name="basket-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.modalItemText}>Кількість товарів: {order.totalAmount} шт.</Text>
                  </View>
                  {order.status && (
                    <View style={styles.modalRow}>
                      <Icon name="checkmark-circle-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                      <Text style={styles.modalItemText}>Статус: {order.status}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Дані замовника</Text>
                  <View style={styles.modalRow}>
                    <Icon name="person-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.modalItemText}>Ім'я: {order.customerName || 'Не вказано'}</Text>
                  </View>
                  <View style={styles.modalRow}>
                    <Icon name="mail-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                    <Text style={styles.modalItemText}>Email: {order.customerEmail || 'Не вказано'}</Text>
                  </View>
                  {order.phone && (
                    <View style={styles.modalRow}>
                      <Icon name="call-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                      <Text style={styles.modalItemText}>Телефон: {order.phone}</Text>
                    </View>
                  )}
                  {order.address && (
                    <View style={styles.modalRow}>
                      <Icon name="location-outline" size={16} color="#666" style={{ marginRight: 8 }} />
                      <Text style={styles.modalItemText}>Адреса: {order.address}</Text>
                    </View>
                  )}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Товари</Text>
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, index) => (
                      <View key={index} style={styles.modalProductItem}>
                        <Text style={styles.modalProductName}>{item.name}</Text>
                        <View style={styles.modalProductDetails}>
                          <Text style={styles.modalProductQuantity}>{item.quantity} шт. × {item.price.toLocaleString()} ₴</Text>
                          <Text style={styles.modalProductPrice}>{(item.quantity * item.price).toLocaleString()} ₴</Text>
                        </View>
                      </View>
                    ))
                  ) : (
                    <Text style={styles.noDataText}>Інформація про товари недоступна</Text>
                  )}
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={toggleModal}
            >
              <Text style={styles.closeButtonText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  gradientBackground: {
    padding: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderIdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderIcon: {
    marginRight: 6,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  date: {
    fontSize: 13,
    color: '#666',
  },
  statusBadge: {
    backgroundColor: 'rgba(46, 204, 113, 0.15)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#2ecc71',
    fontWeight: '600',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  priceLabel: {
    fontSize: 15,
    color: '#666',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5E72E4',
  },
  detailsToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailsToggleText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  detailsContainer: {
    paddingTop: 10,
  },
  customerInfo: {
    marginBottom: 12,
  },
  customerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  customerEmail: {
    fontSize: 14,
    color: '#666',
  },
  orderDetails: {
    marginBottom: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  expandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: 'rgba(94, 114, 228, 0.07)',
    borderRadius: 8,
  },
  expandButtonPressed: {
    opacity: 0.7,
  },
  expandText: {
    fontSize: 14,
    color: '#5E72E4',
    fontWeight: '600',
    marginRight: 4,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: width * 0.9,
    maxHeight: '85%',
    backgroundColor: 'white',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  closeIcon: {
    padding: 4,
  },
  modalSection: {
    marginBottom: 20,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 8,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalItemText: {
    fontSize: 14,
    color: '#333',
  },
  modalProductItem: {
    marginBottom: 12,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  modalProductName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  modalProductDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalProductQuantity: {
    fontSize: 13,
    color: '#666',
  },
  modalProductPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5E72E4',
  },
  noDataText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 10,
  },
  closeButton: {
    backgroundColor: '#5E72E4',
    padding: 12,
    alignItems: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default OrderItem;