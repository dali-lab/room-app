import axios from 'axios';
// eslint-disable-next-line import/no-unresolved
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants';

const URL = `${API_URL}/users`;

export const getAllUsers = async (roomcode) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.get(URL, { headers: { Authorization: `Bearer ${token}` }, params: { roomCode: roomcode } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUser = async (id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(`${URL}`, user);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.put(`${URL}/${id}`, user, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signInUser = async (email, password) => {
  try {
    const { data } = await axios.post(`${URL}/signin`, { email, password });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const signUpUser = async (email, password, firstName, lastName, roomCode) => {
  try {
    const { data } = await axios.post(`${URL}/signup`, {
      email, password, firstName, lastName, roomCode,
    });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
