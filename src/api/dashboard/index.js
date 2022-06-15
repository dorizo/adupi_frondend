import axios, { catchCallBack } from '../index';

const GET_DETAIL_TRANSAKSI = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`dashboard/getDetailTransaksi/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ALL_ANGGOTA_BY_WILAYAH = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`dashboard/getAllAnggotaByWilayah/${id}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ALL_ANGGOTA = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`dashboard/getAllAnggota`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
export { GET_ALL_ANGGOTA, GET_ALL_ANGGOTA_BY_WILAYAH, GET_DETAIL_TRANSAKSI };
