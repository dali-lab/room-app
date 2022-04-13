// eslint-disable-next-line import/no-unresolved
import axios from 'axios';

import { API_URL } from '../constants';

const URL = `${API_URL}/calendarEvents`;

export const createCalendarEvent = async (calendarEvent) => {
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
    const { data } = await axios.get(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateCalendarEvent = async (id, calendarEvent) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, { calendarEvent });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteCalendarEvent = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getAllCalendarEvents = async (roomCode) => {
  try {
    const { data } = await axios.get(URL, { params: { roomCode } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
