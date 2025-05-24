import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

const StorageInfo = ({ info }) => {
  const formatStorageSize = (bytes) => {
    if (!bytes) return '0 Б';
    const gb = bytes / (1024 * 1024 * 1024);
    return `${gb.toFixed(1)} ГБ`;
  };

  if (!info) return null;

  return (
    <View style={styles.storageInfo}>
      <View style={styles.storageInfoItem}>
        <Ionicons name="save-outline" size={18} color="white" />
        <Text style={styles.storageText}>
          {formatStorageSize(info.used)} / {formatStorageSize(info.total)}
        </Text>
      </View>
      <View style={styles.storageInfoItem}>
        <Ionicons name="cloud-offline-outline" size={18} color="white" />
        <Text style={styles.storageText}>
          {formatStorageSize(info.free)} вільно
        </Text>
      </View>
    </View>
  );
};

export default StorageInfo;