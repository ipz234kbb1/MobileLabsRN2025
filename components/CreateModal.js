import React, { useState } from 'react';
import { View, Text, Modal, TextInput, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/styles';

const CreateModal = ({ visible, onClose, onConfirm, type }) => {
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  const handleConfirm = () => {
    if (!name.trim()) {
      Alert.alert('Помилка', 'Введіть назву');
      return;
    }
    onConfirm(name.trim(), type === 'file' ? content : undefined);
    setName('');
    setContent('');
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {type === 'folder' ? 'Створити папку' : 'Створити файл'}
          </Text>

          <TextInput
            style={styles.input}
            placeholder={type === 'folder' ? 'Назва папки' : 'Назва файлу (з .txt)'}
            value={name}
            onChangeText={setName}
            autoFocus
          />

          {type === 'file' && (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Початковий вміст файлу"
              value={content}
              onChangeText={setContent}
              multiline
              numberOfLines={4}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Скасувати</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
              <Text style={styles.confirmButtonText}>Створити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CreateModal;