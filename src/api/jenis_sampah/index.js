import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_JENIS_SAMPAH = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('master/jenisSampah/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_JENIS_SAMPAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`master/jenisSampah/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_JENIS_SAMPAH = async ({ jenis }) => {
  const data = qs.stringify({
    jenis,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`master/jenisSampah/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_JENIS_SAMPAH = async ({ jenis }, id) => {
  const data = qs.stringify({
    jenis,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`master/jenisSampah/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_JENIS_SAMPAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`master/jenisSampah/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { ADD_JENIS_SAMPAH, GET_ALL_JENIS_SAMPAH, DELETE_JENIS_SAMPAH, UPDATE_JENIS_SAMPAH, GET_ONE_JENIS_SAMPAH };
