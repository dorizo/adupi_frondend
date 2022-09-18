import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_MESIN_MITRA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`mesin/all/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_MESIN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`mesin/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_MESIN = async ({ usahaCode, jenisMesin, statusKepemilikanMesin, kapasitas, foto },progressig) => {
  const data = qs.stringify({
    usahaCode,
    jenisMesin,
    statusKepemilikanMesin,
    kapasitas,
    foto,
  });

  try {
    const response = await axios.post(`mesin/add`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        progressig(`${loaded}kb of ${total}kb | ${percent}%`);
        // setUpload(`${loaded}kb of ${total}kb | ${percent}%`);
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const UPDATE_MESIN = async ({ usahaCode, jenisMesin, statusKepemilikanMesin, kapasitas, foto }, id) => {
  const data = qs.stringify({
    usahaCode,
    jenisMesin,
    statusKepemilikanMesin,
    kapasitas,
    foto,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`mesin/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_MESIN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`mesin/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { ADD_MESIN, GET_ALL_MESIN_MITRA, DELETE_MESIN, UPDATE_MESIN, GET_ONE_MESIN };
