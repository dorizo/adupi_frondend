import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_KATEGORI_SAMPAH = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('master/kategoriSampah/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_KATEGORI_SAMPAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`master/kategoriSampah/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_KATEGORI_SAMPAH = async ({ kategori }) => {
  const data = qs.stringify({
    kategori,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`master/kategoriSampah/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_KATEGORI_SAMPAH = async ({ kategori }, id) => {
  const data = qs.stringify({
    kategori,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`master/kategoriSampah/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_KATEGORI_SAMPAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`master/kategoriSampah/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export {
  ADD_KATEGORI_SAMPAH,
  GET_ALL_KATEGORI_SAMPAH,
  DELETE_KATEGORI_SAMPAH,
  UPDATE_KATEGORI_SAMPAH,
  GET_ONE_KATEGORI_SAMPAH,
};
