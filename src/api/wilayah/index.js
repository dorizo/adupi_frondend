import axios, { catchCallBack } from '../index';

const GET_ALL_PROVINSI = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get('wilayah/provinsi/all', { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_KABUPATEN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`wilayah/kabupaten/all/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_KECAMATAN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`wilayah/kecamatan/all/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_DESA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`wilayah/desa/all/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export { GET_ALL_PROVINSI, GET_DESA, GET_KABUPATEN, GET_KECAMATAN };
