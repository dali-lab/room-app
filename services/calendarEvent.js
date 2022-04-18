// eslint-disable-next-line import/no-unresolved
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../constants';

const URL = `${API_URL}/events`;

export const createCalendarEvent = async (id, calendarEvent) => {
  try {
    const { data } = await axios.post(`${URL}`, { calendarEvent });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCalendarEvent = async (id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.get(`${URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateCalendarEvent = async (id, calendarEvent) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.put(`${URL}/${id}`, { calendarEvent }, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteCalendarEvent = async (id) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.delete(`${URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllCalendarEvents = async (users) => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    const { data } = await axios.get(`${URL}?${users.map(
      (n, index) => `userIds[${index}]=${n}`,
    ).join('&')
    }`, { headers: { Authorization: `Bearer ${token}` } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
