import qs from 'qs';
import axios, { catchCallBack } from '../index';

/* eslint-disable camelcase */

const GET_USERS = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('user/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ME = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('account/self', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_USER = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`user/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const ADD_USER = async ({ email, password, isActive }) => {
  const data = qs.stringify({
    email,
    password,
    isActive,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`user/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const UPDATE_USER = async ({ name, email, password, isActive }, id) => {
  const data = qs.stringify({
    email,
    password,
    name,
    isActive,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`user/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_USER = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`user/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const ADD_USER_ROLE = async (userCode, roleCode) => {
  const data = qs.stringify({
    userCode,
    roleCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`roleUser/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const ADD_USER_PERMISSION = async (userCode, permissionCode) => {
  const data = qs.stringify({
    userCode,
    permissionCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`userPermission/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_USER_PERMISSION = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`userPermission/list/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_USER_ROLE = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`roleUser/list/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_USER_ROLE = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`roleUser/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_USER_PERMISSION = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`userPermission/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export {
  GET_USERS,
  GET_USER,
  ADD_USER,
  UPDATE_USER,
  DELETE_USER,
  ADD_USER_PERMISSION,
  ADD_USER_ROLE,
  GET_USER_PERMISSION,
  DELETE_USER_PERMISSION,
  DELETE_USER_ROLE,
  GET_USER_ROLE,
  GET_ME,
};
