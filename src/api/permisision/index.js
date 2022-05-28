import qs from 'qs';
import axios, { catchCallBack } from '../index';

/* eslint-disable camelcase */

const GET_PERMISSIONS = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`permission/all`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PERMISSION = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`permission/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PERMISSIONS_BY_MODULE = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`permissionByModule/list/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PERMISSIONS_WITH_MODULE = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`ppermissionWithModule/list/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export { GET_PERMISSIONS_BY_MODULE, GET_PERMISSIONS, GET_PERMISSION, GET_PERMISSIONS_WITH_MODULE };
