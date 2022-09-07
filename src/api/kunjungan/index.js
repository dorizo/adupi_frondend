import qs from 'qs';
import axios, { catchCallBack } from '../index';

const GET_ALL_KUNJUNGAN = async () => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`kunjungan/all`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const CEK_KUNJUNGAN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`cekkunjungan/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ALL_KUNJUNGANMITRA = async () => {
  const data = qs.stringify({
  
   });
   console.log("kok kosong" , data);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`report/kunjunganmitraall`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ONE_KUNJUNGAN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`kunjungan/one/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const ADD_KUNJUNGAN = async ({ judul, deskripsi, mitraCode,latitude,longitude }) => {
  const data = qs.stringify({
    judul,
    deskripsi,
    mitraCode,
    latitude,
    longitude  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`kunjungan/add`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const ADD_KUNJUNGANIMAGE = async ({ idku, image , statusfoto }) => {
  const data = qs.stringify({
    idku,
    image,
    statusfoto,
   });
   console.log("kok kosong" , data);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`kunjungan/addfoto`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const UPDATE_KUNJUNGAN = async ({ judul, deskripsi, mitraCode }, id) => {
  const data = qs.stringify({
    judul,
    deskripsi,
    mitraCode,
  });
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.put(`kunjungan/edit/${id}`, data, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const DELETE_KUNJUNGAN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.delete(`kunjungan/delete/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { ADD_KUNJUNGAN, GET_ALL_KUNJUNGAN, DELETE_KUNJUNGAN, UPDATE_KUNJUNGAN, GET_ONE_KUNJUNGAN,ADD_KUNJUNGANIMAGE ,GET_ALL_KUNJUNGANMITRA , CEK_KUNJUNGAN };
