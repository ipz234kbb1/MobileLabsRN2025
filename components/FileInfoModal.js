import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const FileInfoModal = ({ visible, onClose, fileInfo }) => {
  if (!fileInfo) return null;

  const formatSize = (size) => {
    if (size < 1024) return `${size} Б`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} КБ`;
    return `${(size / (1024 * 1024)).toFixed(1)} МБ`;
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString('uk-UA');
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.infoModalContent}>
          <Text style={styles.modalTitle}>Інформація про файл</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Назва:</Text>
            <Text style={styles.infoValue}>{fileInfo.name}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Тип:</Text>
            <Text style={styles.infoValue}>
              {fileInfo.isDirectory ? 'Папка' :
               fileInfo.name.split('.').pop()?.toUpperCase() || 'Файл'}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Розмір:</Text>
            <Text style={styles.infoValue}>
              {fileInfo.isDirectory ? '-' : formatSize(fileInfo.size)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Змінено:</Text>
            <Text style={styles.infoValue}>{formatDate(fileInfo.modificationTime)}</Text>
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.confirmButtonText}>Закрити</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default FileInfoModal;