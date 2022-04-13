import axios from 'axios';

import { API_URL } from '../constants';

const URL = `${API_URL}/users`;

export const getAllUsers = async (roomcode) => {
  try {
    const { data } = await axios.get(URL, { params: { roomCode: roomcode } });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await axios.get(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createUser = async (user) => {
  try {
    const { data } = await axios.post(`${URL}`, { user });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateUser = async (id, user) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, { user });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
