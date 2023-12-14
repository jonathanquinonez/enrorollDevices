import AsyncStorage  from '@react-native-async-storage/async-storage';


async function save(key: string, value: string) {
    await AsyncStorage.setItem(key, value);
  }
  
  async function getValueFor(key: string) {
    return AsyncStorage.getItem(key);
  }
  async function deleteItem(key:string) {
   return AsyncStorage.removeItem(key)
  }

  export default {save,getValueFor,deleteItem}