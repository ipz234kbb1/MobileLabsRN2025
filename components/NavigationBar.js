import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../styles/styles';
import { APP_DATA_DIR } from '../utils/constants';

const NavigationBar = ({ currentPath, onNavigateUp, onRefresh }) => {
  const getCurrentPathBreadcrumb = () => {
    const relativePath = currentPath.replace(APP_DATA_DIR, '');
    return relativePath === '' ? 'AppData' : `AppData/${relativePath}`;
  };

  return (
    <View style={styles.navigation}>
      <TouchableOpacity
        style={[styles.navButton, currentPath === APP_DATA_DIR && styles.navButtonDisabled]}
        onPress={onNavigateUp}
        disabled={currentPath === APP_DATA_DIR}
      >
        <Ionicons name="arrow-up" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.breadcrumbContainer}>
        <Ionicons name="folder-open-outline" size={16} color="#555" />
        <Text style={styles.breadcrumb} numberOfLines={1}>
          {getCurrentPathBreadcrumb()}
        </Text>
      </View>

      <TouchableOpacity style={styles.refreshButton} onPress={onRefresh}>
        <Ionicons name="refresh" size={20} color="#2196F3" />
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;