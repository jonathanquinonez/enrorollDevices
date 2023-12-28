import AsyncStorage from "@react-native-async-storage/async-storage";

export const importDataStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
  
      return result.map((req: any) => console.log(req));
    } catch (error) {
      console.error(error)
    }
  } 