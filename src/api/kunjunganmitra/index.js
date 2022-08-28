import qs from 'qs';
import axios, { catchCallBack } from '../index';



const ADD_KUNJUNGANMITRA = async ({ kunjungan_absen_name, kunjungan_absen_date, kunjungan_absen_status,mitraCode }) => {
    const data = qs.stringify({
      kunjungan_absen_name,
      kunjungan_absen_date,
      kunjungan_absen_status,
      mitraCode,
      });
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
      const response = await axios.post(`kunjunganmitrav2/tambah`, data, { headers });
      return response;
    } catch (error) {
      return catchCallBack(error);
    }
  };

  
const GET_KunjunganTanggal = async (id , tanggal) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
      const response = await axios.get(`/kunjunganmitra/view/${id}/${tanggal}`, { headers });
      return response;
    } catch (error) {
      return catchCallBack(error);
    }
  };


  
  
const GET_viewimagekunjungan = async (id , status) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`/kunjunganmitraimage/view/${id}/${status}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
  const GET_KUNJUNGAN_DETAIL = async (value) =>{
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
      const response = await axios.post(`kunjunganmitraformv2/tambah`, value, { headers });
      return response;
    } catch (error) {
      return catchCallBack(error);
    }
  }

  export {ADD_KUNJUNGANMITRA , GET_KunjunganTanggal , GET_KUNJUNGAN_DETAIL , GET_viewimagekunjungan}