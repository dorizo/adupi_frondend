import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_WARNA = async (search) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('warna/all', { headers, params: { search } });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ONE_WARNA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`warna/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_WARNA = async ({ warna }) => {
    console.log("data warna" , warna);
  const data = qs.stringify({
    warna,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`warna/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const ADD_WARNAMITRA = async ({ pembeli }) => {
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

const UPDATE_WARNA = async ({ warna }, id) => {
  const data = qs.stringify({
    warna,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`warna/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_WARNA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`warna/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { ADD_WARNA, GET_ALL_WARNA, DELETE_WARNA, UPDATE_WARNA, GET_ONE_WARNA ,ADD_WARNAMITRA };
