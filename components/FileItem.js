import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { styles } from '../styles/styles';

const FileItem = ({ item, onPress, onLongPress, onInfo, onEdit, onDelete }) => {
  const isDirectory = item.isDirectory;
  const isTextFile = item.name.toLowerCase().endsWith('.txt');

  return (
    <TouchableOpacity
      style={styles.fileItem}
      onPress={() => onPress(item)}
      onLongPress={() => onLongPress(item)}
    >
      <View style={styles.fileItemContent}>
        <View style={[styles.fileIcon, isDirectory ? styles.folderIcon : styles.fileIconStyle]}>
          {isDirectory ? (
            <Ionicons name="folder" size={28} color="#FFC107" />
          ) : isTextFile ? (
            <Ionicons name="document-text" size={28} color="#2196F3" />
          ) : (
            <Ionicons name="document" size={28} color="#9E9E9E" />
          )}
        </View>

        <View style={styles.fileDetails}>
          <Text style={styles.fileName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.fileSize}>
            {isDirectory ? 'Папка' : `${(item.size / 1024).toFixed(1)} КБ`}
          </Text>
        </View>

        <View style={styles.fileActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onInfo(item)}
          >
            <Ionicons name="information-circle-outline" size={22} color="#757575" />
          </TouchableOpacity>

          {isTextFile && (
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => onEdit(item)}
            >
              <MaterialIcons name="edit" size={22} color="#FF9800" />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => onDelete(item)}
          >
            <MaterialIcons name="delete-outline" size={22} color="#F44336" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FileItem;