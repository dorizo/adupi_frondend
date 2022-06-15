import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_BELI_SAMPAH = async ({ page, size, date }) => {
  const params = {
    page,
    size,
    date,
  };
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('beli/sampah', { headers, params });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_JUAL_SAMPAH = async ({ page, size, date }) => {
  const params = {
    page,
    size,
    date,
  };
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('jual/sampah', { headers, params });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const BELI_SAMPAH = async ({ anggotaCode, nota, detail }) => {
  const data = qs.stringify({
    anggotaCode,
    nota,
    detail,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`beli/sampah`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const JUAL_SAMPAH = async ({ pembeli, nota, detail }) => {
  const data = qs.stringify({
    pembeli,
    nota,
    detail,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`jual/sampah`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export { BELI_SAMPAH, GET_BELI_SAMPAH, GET_JUAL_SAMPAH, JUAL_SAMPAH };
