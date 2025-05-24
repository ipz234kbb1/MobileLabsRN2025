import * as FileSystem from 'expo-file-system';
import { APP_DATA_DIR } from './constants';

export const initializeAppData = async () => {
  try {
    const dirInfo = await FileSystem.getInfoAsync(APP_DATA_DIR);
    if (!dirInfo.exists) {
      await FileSystem.makeDirectoryAsync(APP_DATA_DIR, { intermediates: true });
      console.log('Створено директорію AppData');
    }
  } catch (error) {
    console.error('Error initializing AppData:', error);
    throw error;
  }
};

export const loadStorageInfo = async () => {
  try {
    const totalSpace = await FileSystem.getTotalDiskCapacityAsync();
    const freeSpace = await FileSystem.getFreeDiskStorageAsync();
    const usedSpace = totalSpace - freeSpace;

    return {
      total: totalSpace,
      free: freeSpace,
      used: usedSpace
    };
  } catch (error) {
    console.error('Error loading storage info:', error);
    throw error;
  }
};

export const loadDirectoryContents = async (currentPath) => {
  try {
    const dirContents = await FileSystem.readDirectoryAsync(currentPath);

    const fileInfoPromises = dirContents.map(async (name) => {
      const fullPath = currentPath + name;
      const info = await FileSystem.getInfoAsync(fullPath);
      return {
        name,
        path: fullPath,
        isDirectory: info.isDirectory,
        size: info.size || 0,
        modificationTime: info.modificationTime || 0
      };
    });

    const fileInfos = await Promise.all(fileInfoPromises);

    // Сортування: спочатку папки, потім файли
    fileInfos.sort((a, b) => {
      if (a.isDirectory && !b.isDirectory) return -1;
      if (!a.isDirectory && b.isDirectory) return 1;
      return a.name.localeCompare(b.name);
    });

    return fileInfos;
  } catch (error) {
    console.error('Error loading directory contents:', error);
    throw error;
  }
};

export const createDirectory = async (path) => {
  try {
    await FileSystem.makeDirectoryAsync(path);
  } catch (error) {
    console.error('Error creating directory:', error);
    throw error;
  }
};

export const createFile = async (path, content = '') => {
  try {
    await FileSystem.writeAsStringAsync(path, content);
  } catch (error) {
    console.error('Error creating file:', error);
    throw error;
  }
};

export const readFile = async (path) => {
  try {
    return await FileSystem.readAsStringAsync(path);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
};

export const writeFile = async (path, content) => {
  try {
    await FileSystem.writeAsStringAsync(path, content);
  } catch (error) {
    console.error('Error writing file:', error);
    throw error;
  }
};

export const deleteItem = async (path) => {
  try {
    await FileSystem.deleteAsync(path);
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
};