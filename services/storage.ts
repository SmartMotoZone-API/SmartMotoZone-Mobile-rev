import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveMotos = async (motos: any[]) => {
  await AsyncStorage.setItem('motos', JSON.stringify(motos));
};

export const loadMotos = async () => {
  const stored = await AsyncStorage.getItem('motos');
  return stored ? JSON.parse(stored) : null;
};
