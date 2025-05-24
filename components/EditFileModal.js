import React, { useState, useEffect } from 'react';
import {
  Modal,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { styles } from '../styles/styles';

const EditFileModal = ({ visible, onClose, onSave, filePath, initialContent }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (visible && initialContent !== undefined) {
      setContent(initialContent);
    }
  }, [visible, initialContent]);

  const handleSave = () => {
    onSave(content);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide">
      <SafeAreaView style={styles.editModalContainer}>
        <View style={styles.editHeader}>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelButtonText}>Скасувати</Text>
          </TouchableOpacity>
          <Text style={styles.editTitle}>Редагування файлу</Text>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveButtonText}>Зберегти</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.editTextArea}
          value={content}
          onChangeText={setContent}
          multiline
          placeholder="Вміст файлу..."
          autoFocus
        />
      </SafeAreaView>
    </Modal>
  );
};

export default EditFileModal;