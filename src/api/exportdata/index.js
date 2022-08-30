import qs from 'qs';
import axios, { catchCallBack } from '../index';



const REPORT_PEMBELI = async (tanggalawal,tanggalakhir ) => {
const data = qs.stringify({
    tanggalawal,
    tanggalakhir,
});
const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
};
try {
    const response = await axios.post(`report/allpembelian`, data, { headers });
    return response;
} catch (error) {
    return catchCallBack(error);
}
};


const REPORT_PENJUALAN = async (tanggalawal,tanggalakhir ) => {
    const data = qs.stringify({
        tanggalawal,
        tanggalakhir,
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    try {
        const response = await axios.post(`report/allpenjualan`, data, { headers });
        return response;
    } catch (error) {
        return catchCallBack(error);
    }
    };

export { REPORT_PEMBELI , REPORT_PENJUALAN }