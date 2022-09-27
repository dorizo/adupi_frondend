import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_PEMBELI = async (search) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('pembeli/all', { headers, params: { search } });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ONE_PEMBELI = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`pembeli/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_PEMBELI = async ({ pembeli }) => {
  const data = qs.stringify({
    pembeli,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`pembeli/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const ADD_PEMBELIMITRA = async ({ pembeli }) => {
  const data = qs.stringify({
    pembeli,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`jual/sampah/add/pembeli`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_PEMBELI = async ({ pembeli }, id) => {
  const data = qs.stringify({
    pembeli,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`pembeli/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_PEMBELI = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`pembeli/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { ADD_PEMBELI, GET_ALL_PEMBELI, DELETE_PEMBELI, UPDATE_PEMBELI, GET_ONE_PEMBELI ,ADD_PEMBELIMITRA };
