import axios, { catchCallBack } from '../index';

const GET_REPORT_MITRA_BY_DATE = async (start, end) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/all/${start}/${end}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const FASILITATORDETECT = async (email) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/fasilitatordetect`, {
      headers,
      params: {
        email,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_REPORT_MITRA_DETAIL_BY_DATE = async (start, end, id) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/detail/${id}/${start}/${end}`, { headers });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_JUMLAH_MITRA_PERBULAN_KAB = async (tahun, wilayahCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/jumlahMitraPerbulanPerkabupaten`, {
      headers,
      params: {
        tahun,
        wilayahCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_LUAS_GUDANG_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/jumlahLuasGudangPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_LUAS_GUDANG_PERBULANFASILITAOTOR = async (tahun , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/jumlahLuasGudangPerbulanfasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_JUMLAH_PEKERJA_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/jumlahPekerjaPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_JUMLAH_PEKERJA_PERBULANFASILITATOR = async (tahun,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/jumlahPekerjaPerbulanfasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PEMBELIAN_SEMUA_MITRA_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/semuaMitraPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_PEMBELIAN_SEMUA_MITRA_PERBULANFASILITATOR = async (tahun,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/semuaMitraPerbulanfasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PENJUALAN_SEMUA_MITRA_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/semuaMitraPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PENJUALAN_SEMUA_MITRA_PERBULANFASILITATOR = async (tahun , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/semuaMitraPerbulanfasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PENJUALAN_MITRA_PERBULAN = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulan`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PENJUALAN_MITRA_PERBULANLINE = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanline`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PENJUALAN_MITRA_PERBULANLINEFASILITATOR = async (tahun, mitraCode,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanlinefasilitator`, {
      headers,
      params: {
        tahun,
        mitraCode,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_PENJUALAN_MITRA_PERBULANLINECONTINUES = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanlinecontinue`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};




const GET_PENJUALAN_MITRA_PERBULANLINECONTINUESFASILITATOR = async (tahun, mitraCode,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanlinecontinuefasilitator`, {
      headers,
      params: {
        tahun,
        mitraCode,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_PEMBELIAN_MITRA_PERBULANLINECONTINUES = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanlinecontinue`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PEMBELIAN_MITRA_PERBULANLINECONTINUESFASILITATOR = async (tahun, mitraCode , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanlinecontinuefasilitator`, {
      headers,
      params: {
        tahun,
        mitraCode,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PEMBELIAN_MITRA_PERBULAN = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulan`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PEMBELIAN_MITRA_PERBULANLINE = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanline`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_PEMBELIAN_MITRA_PERBULANLINEFAS = async (tahun, mitraCode,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanlinefas`, {
      headers,
      params: {
        tahun,
        mitraCode,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PEMBELIAN_MITRA_PERBULANLINEALL = async (tahun, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanlineall`, {
      headers,
      params: {
        tahun,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PEMBELIAN_SEMUA_MITRA_PERBULAN_PABRIK = async (tahun, pembeliCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/semuaMitraPerbulanPerpabrik`, {
      headers,
      params: {
        tahun,
        pembeliCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PENJUALAN_SEMUA_MITRA_PERBULAN_PABRIK = async (tahun, pembeliCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/semuaMitraPerbulanPerpabrik`, {
      headers,
      params: {
        tahun,
        pembeliCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PENJUALAN_MITRA_PERBULAN_PABRIK = async (tahun, pembeliCode, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanPerpabrik`, {
      headers,
      params: {
        tahun,
        pembeliCode,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PEMBELIAN_MITRA_PERBULAN_PABRIK = async (tahun, pembeliCode, mitraCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanPerpabrik`, {
      headers,
      params: {
        tahun,
        pembeliCode,
        mitraCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_MASALAH_PERBULAN_JENIS_STATUS = async (tahun, jenisMasalah, mitraCode, status) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/masalah/permitraPerbulanPerjenisPerstatus`, {
      headers,
      params: {
        tahun,
        jenisMasalah,
        mitraCode,
        status,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUS = async (tahun, jenisMasalah, status) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/masalah/semuaMitraPerbulanPerjenisPerstatus`, {
      headers,
      params: {
        tahun,
        jenisMasalah,
        status,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINE = async (tahun, jenisMasalah, status) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/masalah/masalahmitraperbulanline`, {
      headers,
      params: {
        tahun,
        jenisMasalah,
        status,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINEFASILITATOR = async (tahun, jenisMasalah, status , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/masalah/masalahmitraperbulanlinefas`, {
      headers,
      params: {
        tahun,
        jenisMasalah,
        status,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PEMBELIAN_SEMUA_MITRA_PERKATEGORI = async (ksCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/newSemuaMitraPerkategori`, {
      headers,
      params: {
        ksCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PEMBELIAN_SEMUA_MITRA_PERKATEGORIFAS = async (ksCode , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/newSemuaMitraPerkategorifas`, {
      headers,
      params: {
        ksCode,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_PENJUALAN_SEMUA_MITRA_PERKATEGORI = async (ksCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/newSemuaMitraPerkategori`, {
      headers,
      params: {
        ksCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PENJUALAN_SEMUA_MITRA_PERKATEGORIFAS = async (ksCode,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/newSemuaMitraPerkategorifas`, {
      headers,
      params: {
        ksCode,
        fasilitatorCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PEMBELIAN_SEMUA_MITRA_PERJENIS = async (jsCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/semuaMitraPerkategori`, {
      headers,
      params: {
        jsCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_PEMBELIAN_SEMUA_MITRA_PERJENISfas = async (jsCode,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/semuaMitraPerkategorifas`, {
      headers,
      params: {
        jsCode,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_PENJUALAN_SEMUA_MITRA_PERJENIS = async (jsCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/semuaMitraPerkategori`, {
      headers,
      params: {
        jsCode,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ANALISI_PEMBELIAN_MITRA_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/analisis/pembelianDenganMitraPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};
const GET_ANALISI_PEMBELIAN_PEKERJA_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/analisis/pembelianDenganPekerjaPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_ANALISI_PEMBELIAN_PEKERJA_PERBULANFASILITATOR = async (tahun , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/analisis/pembelianDenganPekerjaPerbulan`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ANALISA_V2_MITRA_PEMBELIAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanlinevsmitra`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_ANALISA_V2_MITRA_PEMBELIANFASILITATOR = async (tahun ,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/permitraPerbulanlinevsmitrafasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ANALISA_V2_CONTINUE_MITRA_PEMBELIAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/totalmitravspembelian`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ANALISA_V2_CONTINUE_MITRA_PEMBELIANFASILITATOTR = async (tahun , fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/pembelian/totalmitravspembelianfasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};





const GET_ANALISA_V2_MITRA_PENJUALAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanlinevsmitra`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_ANALISA_V2_MITRA_PENJUALANFASILITATOR = async (tahun,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/permitraPerbulanlinevsmitrafasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ANALISA_V2_CONTINUE_MITRA_PENJUALAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/totalmitravspenjualan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const GET_ANALISA_V2_CONTINUE_MITRA_PENJUALANFASILITATOR = async (tahun,fasilitatorCode) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/penjualan/totalmitravspenjualanfasilitator`, {
      headers,
      params: {
        tahun,
        fasilitatorCode
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};


const GET_ANALISI_PEMBELIAN_LUAS_GUDANG_PERBULAN = async (tahun) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`report/analisis/pembelianDenganLuasGudangPerbulan`, {
      headers,
      params: {
        tahun,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

const EXPORT_BELI_SAMAPH = async (start, end) => {
  const headers = {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  };
  try {
    const response = await axios.get(`export/beliSampah/2`, {
      headers,
      params: {
        start,
        end,
      },
    });
    return response;
  } catch (error) {
    return catchCallBack(error);
  }
};

export {
  GET_REPORT_MITRA_BY_DATE,
  EXPORT_BELI_SAMAPH,
  GET_REPORT_MITRA_DETAIL_BY_DATE,
  GET_ANALISI_PEMBELIAN_LUAS_GUDANG_PERBULAN,
  GET_ANALISI_PEMBELIAN_MITRA_PERBULAN,
  GET_ANALISI_PEMBELIAN_PEKERJA_PERBULAN,
  GET_JUMLAH_MITRA_PERBULAN_KAB,
  GET_JUMLAH_PEKERJA_PERBULAN,
  GET_JUMLAH_PEKERJA_PERBULANFASILITATOR,
  GET_LUAS_GUDANG_PERBULAN,
  GET_MASALAH_PERBULAN_JENIS_STATUS,
  GET_PEMBELIAN_MITRA_PERBULAN,
  GET_PEMBELIAN_MITRA_PERBULANLINE,
  GET_PEMBELIAN_MITRA_PERBULANLINEALL,
  GET_PEMBELIAN_MITRA_PERBULAN_PABRIK,
  GET_PEMBELIAN_SEMUA_MITRA_PERBULAN,
  GET_PEMBELIAN_SEMUA_MITRA_PERBULANFASILITATOR,
  GET_PEMBELIAN_SEMUA_MITRA_PERBULAN_PABRIK,
  GET_PEMBELIAN_SEMUA_MITRA_PERKATEGORI,
  GET_PENJUALAN_MITRA_PERBULAN,
  GET_PENJUALAN_MITRA_PERBULANLINE,
  GET_PENJUALAN_MITRA_PERBULAN_PABRIK,
  GET_PENJUALAN_SEMUA_MITRA_PERBULAN,
  GET_PENJUALAN_SEMUA_MITRA_PERBULANFASILITATOR,
  GET_PENJUALAN_SEMUA_MITRA_PERBULAN_PABRIK,
  GET_PENJUALAN_SEMUA_MITRA_PERKATEGORI,
  GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUS,
  GET_PEMBELIAN_SEMUA_MITRA_PERJENIS,
  GET_PEMBELIAN_SEMUA_MITRA_PERJENISfas,
  GET_PENJUALAN_SEMUA_MITRA_PERJENIS,
  GET_ANALISA_V2_MITRA_PEMBELIAN,
  GET_ANALISA_V2_CONTINUE_MITRA_PEMBELIAN,
  GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINE,
  GET_ANALISA_V2_MITRA_PENJUALAN,
  GET_ANALISA_V2_CONTINUE_MITRA_PENJUALAN,
  GET_ANALISA_V2_CONTINUE_MITRA_PENJUALANFASILITATOR,
  GET_PENJUALAN_MITRA_PERBULANLINECONTINUES,
  GET_PENJUALAN_MITRA_PERBULANLINECONTINUESFASILITATOR,
  GET_PEMBELIAN_MITRA_PERBULANLINECONTINUES,
  GET_ANALISI_PEMBELIAN_PEKERJA_PERBULANFASILITATOR,
  GET_ANALISA_V2_MITRA_PEMBELIANFASILITATOR,
  GET_ANALISA_V2_CONTINUE_MITRA_PEMBELIANFASILITATOTR,
  GET_ANALISA_V2_MITRA_PENJUALANFASILITATOR,
  GET_LUAS_GUDANG_PERBULANFASILITAOTOR,
  GET_PENJUALAN_MITRA_PERBULANLINEFASILITATOR,
  GET_PEMBELIAN_MITRA_PERBULANLINECONTINUESFASILITATOR,
  GET_PEMBELIAN_MITRA_PERBULANLINEFAS,
  GET_SEMUA_MASALAH_PERBULAN_JENIS_STATUSLINEFASILITATOR,
  GET_PEMBELIAN_SEMUA_MITRA_PERKATEGORIFAS,
  GET_PENJUALAN_SEMUA_MITRA_PERKATEGORIFAS,
  FASILITATORDETECT,
};
