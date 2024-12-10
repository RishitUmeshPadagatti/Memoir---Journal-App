import * as SecureStore from 'expo-secure-store';

// Store token
export const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync('userToken', token);
  } catch (error) {
    console.error("Error storing token", error);
  }
};

// Retrieve token
export const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('userToken');
    return token;
  } catch (error) {
    console.error("Error retrieving token", error);
  }
};

// Delete token
export const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync('userToken');
  } catch (error) {
    console.error("Error deleting token", error);
  }
};
