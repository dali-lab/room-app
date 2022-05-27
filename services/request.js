import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../constants';

const URL = `${API_URL}/requests`;

export const getAllRequests = async (userId) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.get(`${URL}?userId=${userId}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getRequest = async (userID, id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.get(`${URL}/${userID}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createRequest = async (request) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.post(`${URL}`, request, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateRequest = async (id, request) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.put(`${URL}/${id}`, request, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteRequest = async (id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
