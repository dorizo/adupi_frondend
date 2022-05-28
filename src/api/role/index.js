import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ROLES = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('role/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ROLE = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`role/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const ADD_ROLE = async ({ role, type }) => {
  const data = qs.stringify({
    role,
    type,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`role/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const ADD_ROLE_PERMISSION = async (roleCode, permissionCode) => {
  const data = qs.stringify({
    roleCode,
    permissionCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`rolePermission/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const UPDATE_ROLE = async ({ role }, id) => {
  const data = qs.stringify({
    role,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`role/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_ROLE = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`role/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_ROLE_PERMISSION = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`rolePermission/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ROLE_ALL_PERMISSION = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios.get(`rolePermission/list/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export {
  GET_ROLES,
  GET_ROLE,
  ADD_ROLE,
  UPDATE_ROLE,
  DELETE_ROLE,
  GET_ROLE_ALL_PERMISSION,
  ADD_ROLE_PERMISSION,
  DELETE_ROLE_PERMISSION,
};
