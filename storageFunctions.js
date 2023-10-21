import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (value) => {
  try {
    await AsyncStorage.setItem('@elapsedDays', value.toString());
  } catch (e) {
    // Guardar error
    console.error("Error al guardar los días transcurridos:", e);
  }
}

export const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@elapsedDays');
      if(value !== null) {
        return parseInt(value);
      }
    } catch(e) {
      // Leer error
      console.error("Error al leer los días transcurridos:", e);
    }
  }
  