import qs from 'qs';
import axios, { catchCallBack } from '../index';



const GET_MAP_ANGGOTA = async (tanggalawal,tanggalakhir , mitraCode , Provinsi) => {
  const data = qs.stringify({
    tanggalawal,
    tanggalakhir,
    mitraCode,
    Provinsi,
  });
  
  console.log(data);
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.post(`maps/pembelian`, data , { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
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


const GET_SU_PEMBELIAN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`/su/beli/sampah?page=0&size=500`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_SU_PENJUALAN = async (id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`/su/jual/sampah?page=0&size=500`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export { GET_ALL_ANGGOTA, GET_ALL_ANGGOTA_BY_WILAYAH, GET_DETAIL_TRANSAKSI,GET_MAP_ANGGOTA ,GET_SU_PEMBELIAN,GET_SU_PENJUALAN};
