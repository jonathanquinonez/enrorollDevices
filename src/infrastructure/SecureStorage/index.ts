import * as SecureStore from 'expo-secure-store';


async function save(key: string, value: string) {
    await SecureStore.setItemAsync(key, value);
  }
  
  async function getValueFor(key: string) {
    return SecureStore.getItemAsync(key);
  }
  async function deleteItem(key:string) {
   return SecureStore.deleteItemAsync(key, {})
  }

  export default {save,getValueFor,deleteItem}