import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_FASILITATOR = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('fasilitator/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_USER_FOR_ADD_FASILITATOR = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('fasilitator/getUserForAdd', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_USER_FOR_UPDATE_FASILITATOR = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/getUserForEdit/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_FASILITATOR = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`fasilitator/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_FASILITATOR = async ({ nama, alamat, userCode, wilayahCode }) => {
  const data = qs.stringify({
    nama,
    alamat,
    userCode,
    wilayahCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`fasilitator/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const UPDATE_FASILITATOR = async ({ fasilitatorCode, nama, alamat, userCode, wilayahCode }, id) => {
  const data = qs.stringify({
    nama,
    alamat,
    fasilitatorCode,
    userCode,
    wilayahCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`fasilitator/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const DELETE_FASILITATOR = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`fasilitator/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export {
  ADD_FASILITATOR,
  DELETE_FASILITATOR,
  GET_ALL_FASILITATOR,
  GET_USER_FOR_ADD_FASILITATOR,
  GET_USER_FOR_UPDATE_FASILITATOR,
  UPDATE_FASILITATOR,
  GET_ONE_FASILITATOR,
};
