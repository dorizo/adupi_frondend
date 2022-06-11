import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_MASALAH = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('masalah/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_MASALAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`masalah/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const CHANGE_STATUS_MASALAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`masalah/changeStatus/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_MASALAH = async ({ jenisMasalah, deskripsi, foto }) => {
  const data = qs.stringify({
    jenisMasalah,
    deskripsi,
    foto,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`masalah/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_MASALAH = async ({ jenisMasalah, deskripsi, foto }, id) => {
  const data = qs.stringify({
    jenisMasalah,
    deskripsi,
    foto,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`masalah/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_MASALAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`masalah/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { ADD_MASALAH, GET_ALL_MASALAH, DELETE_MASALAH, UPDATE_MASALAH, GET_ONE_MASALAH, CHANGE_STATUS_MASALAH };
