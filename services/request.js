import axios from 'axios';

import { API_URL } from '../constants';

const URL = `${API_URL}/parties`;

export const getAllRequests = async () => {
  try {
    const { data } = await axios.get(URL);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// get all requests for user
export const getForUser = async (userID) => {
  try {
    const { data } = await axios.get(`${URL}//${userID}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getRequest = async (userID, id) => {
  try {
    const { data } = await axios.get(`${URL}//${userID}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const createRequest = async (request) => {
  try {
    const { data } = await axios.post(`${URL}`, { request });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateRequest = async (id, request) => {
  try {
    const { data } = await axios.put(`${URL}/${id}`, { request });
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const deleteRequest = async (id) => {
  try {
    const { data } = await axios.delete(`${URL}/${id}`);
    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
