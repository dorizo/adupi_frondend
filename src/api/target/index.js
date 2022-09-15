import qs from 'qs';
import axios, { catchCallBack } from '../index';

/* eslint-disable camelcase */

const GET_ALLTARGET = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post('alltarget', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_TARGET = async ({ mitraCode, MitraTargetName, MitraTargetTanggal }) => {
    const data = qs.stringify({
      mitraCode,
      MitraTargetName,
      MitraTargetTanggal,
    });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
      const response = await axios.post(`savetarget`, data, { headers });
      return response;
    } catch (error) {
      return catchCallBack(error);
    }
  };
  
const UPDATE_TARGET = async ({ mitraCode, MitraTargetName, MitraTargetTanggal  },MitraTargetCode) => {
  const data = qs.stringify({
    mitraCode,
    MitraTargetName,
    MitraTargetTanggal,
    MitraTargetCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`updatetarget`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_TARGET = async ({id}) => {
  const data = qs.stringify({
    id
  });
  
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`hapustarget`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }

};
const GET_GETSINGLEMITRA = async ({tanggal,mitraCode}) => {
  const data = qs.stringify({
    tanggal,
    mitraCode
  });
  console.log(data);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post('viewtargetpermitra', data,{ headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
  export {
    GET_ALLTARGET,
    ADD_TARGET,
    UPDATE_TARGET,
    DELETE_TARGET,
    GET_GETSINGLEMITRA
  }