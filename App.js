import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  Platform,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


import CreateModal from './components/CreateModal';
import EditFileModal from './components/EditFileModal';
import FileInfoModal from './components/FileInfoModal';
import FileItem from './components/FileItem';
import StorageInfo from './components/StorageInfo';
import NavigationBar from './components/NavigationBar';


import {
  initializeAppData,
  loadStorageInfo,
  loadDirectoryContents,
  createDirectory,
  createFile,
  readFile,
  writeFile,
  deleteItem,
} from './utils/fileSystemUtils';
import { APP_DATA_DIR } from './utils/constants';


import { styles } from './styles/styles';

export default function FileManagerApp() {
  
  const statusBarStyle = Platform.OS === 'ios' ? 'dark' : 'light';
  const [currentPath, setCurrentPath] = useState(APP_DATA_DIR);
  const [files, setFiles] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createType, setCreateType] = useState('folder');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFile, setEditingFile] = useState(null);
  const [editContent, setEditContent] = useState('');
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedFileInfo, setSelectedFileInfo] = useState(null);
  const [storageInfo, setStorageInfo] = useState(null);

  
  useEffect(() => {
    initializeApp();
  }, []);

  
  useEffect(() => {
    loadFiles();
  }, [currentPath]);

  const initializeApp = async () => {
    try {
      await initializeAppData();
      await loadStorageData();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося ініціалізувати застосунок');
    }
  };

  const loadStorageData = async () => {
    try {
      const info = await loadStorageInfo();
      setStorageInfo(info);
    } catch (error) {
      console.error('Error loading storage info:', error);
    }
  };

  const loadFiles = useCallback(async () => {
    try {
      setRefreshing(true);
      const fileInfos = await loadDirectoryContents(currentPath);
      setFiles(fileInfos);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося завантажити файли');
    } finally {
      setRefreshing(false);
    }
  }, [currentPath]);

  const navigateToFolder = (folderPath) => {
    setCurrentPath(folderPath.endsWith('/') ? folderPath : folderPath + '/');
  };

  const navigateUp = () => {
    if (currentPath === APP_DATA_DIR) return;

    const pathParts = currentPath.slice(0, -1).split('/');
    pathParts.pop();
    const parentPath = pathParts.join('/') + '/';

    if (parentPath.length >= APP_DATA_DIR.length) {
      setCurrentPath(parentPath);
    }
  };

  const handleFilePress = async (item) => {
    if (item.isDirectory) {
      navigateToFolder(item.path);
    } else if (item.name.toLowerCase().endsWith('.txt')) {
      try {
        const content = await readFile(item.path);
        Alert.alert(
          item.name,
          content || 'Файл порожній',
          [
            { text: 'Закрити', style: 'cancel' },
            { text: 'Редагувати', onPress: () => handleEditFile(item) }
          ]
        );
      } catch (error) {
        Alert.alert('Помилка', 'Не вдалося прочитати файл');
      }
    }
  };

  const handleCreateItem = async (name, content) => {
    try {
      if (createType === 'folder') {
        const fullPath = currentPath + name;
        await createDirectory(fullPath);
      } else {
        const fileName = name.endsWith('.txt') ? name : name + '.txt';
        const filePath = currentPath + fileName;
        await createFile(filePath, content || '');
      }

      loadFiles();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося створити елемент');
    }
  };

  const handleEditFile = async (item) => {
    try {
      const content = await readFile(item.path);
      setEditingFile(item);
      setEditContent(content);
      setShowEditModal(true);
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося відкрити файл для редагування');
    }
  };

  const handleSaveFile = async (content) => {
    if (!editingFile) return;

    try {
      await writeFile(editingFile.path, content);
      loadFiles();
    } catch (error) {
      Alert.alert('Помилка', 'Не вдалося зберегти файл');
    }
  };

  const handleDeleteItem = (item) => {
    Alert.alert(
      'Підтвердження',
      `Ви впевнені, що хочете видалити "${item.name}"?`,
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteItem(item.path);
              loadFiles();
            } catch (error) {
              Alert.alert('Помилка', 'Не вдалося видалити елемент');
            }
          }
        }
      ]
    );
  };

  const handleShowInfo = (item) => {
    setSelectedFileInfo(item);
    setShowInfoModal(true);
  };

  const handleLongPress = (item) => {
    Alert.alert(
      item.name,
      'Оберіть дію:',
      [
        { text: 'Скасувати', style: 'cancel' },
        {
          text: 'Інформація',
          onPress: () => handleShowInfo(item)
        },
        ...(item.name.toLowerCase().endsWith('.txt') ? [{
          text: 'Редагувати',
          onPress: () => handleEditFile(item)
        }] : []),
        {
          text: 'Видалити',
          style: 'destructive',
          onPress: () => handleDeleteItem(item)
        }
      ]
    );
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.container} edges={['right', 'bottom', 'left']}>
      
      <View style={styles.header}>
        <StorageInfo info={storageInfo} />
      </View>

      
      <NavigationBar
        currentPath={currentPath}
        onNavigateUp={navigateUp}
        onRefresh={loadStorageData}
      />

      
      <FlatList
        data={files}
        keyExtractor={(item) => item.path}
        renderItem={({ item }) => (
          <FileItem
            item={item}
            onPress={handleFilePress}
            onLongPress={handleLongPress}
            onInfo={handleShowInfo}
            onEdit={handleEditFile}
            onDelete={handleDeleteItem}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={loadFiles} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>📂 Папка порожня</Text>
          </View>
        }
        style={styles.fileList}
      />

      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => {
            setCreateType('folder');
            setShowCreateModal(true);
          }}
        >
          <Ionicons name="folder-outline" size={20} color="white" />
          <Text style={styles.createButtonText}>Створити папку</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.createButton}
          onPress={() => {
            setCreateType('file');
            setShowCreateModal(true);
          }}
        >
          <Ionicons name="document-text-outline" size={20} color="white" />
          <Text style={styles.createButtonText}>Створити файл</Text>
        </TouchableOpacity>
      </View>

      
      <CreateModal
        visible={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onConfirm={handleCreateItem}
        type={createType}
      />

      <EditFileModal
        visible={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingFile(null);
          setEditContent('');
        }}
        onSave={handleSaveFile}
        filePath={editingFile?.path}
        initialContent={editContent}
      />

      <FileInfoModal
        visible={showInfoModal}
        onClose={() => {
          setShowInfoModal(false);
          setSelectedFileInfo(null);
        }}
        fileInfo={selectedFileInfo}
      />
    </SafeAreaView>
    </SafeAreaProvider>
  );
}