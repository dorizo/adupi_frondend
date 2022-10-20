/* eslint-disable no-nested-ternary */
/* eslint-disable no-lonely-if */

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import TidakAdaData from '../../components/TidakAdaData';
import {
  DELETE_MITRA_BY_FASILITATOR,
  GET_MITRA_ALL_BY_FASILITATOR,
  GET_MITRA_DETAIL_BY_FASILITATOR,
  GET_MITRA_NV_BY_FASILITATOR,
  VERIF_MITRA_BY_FASILITATOR,
} from '../../api/mitra';
import dummybarang from '../../assets/dummy-barang.jpg';
import dummyKtp from '../../assets/dummy-ktp.jpg';
import AdupiXLeMineraleHead from '../../components/AdupiXLeMineraleHead';
import BarMobile from '../../components/BarMobile';
import DialogConfirm from '../../components/DialogConfirm';
import Image from '../../components/Image';
import MoreMenu from './MoreMenu';
import LoadingCard from '../../components/LoadingCard';
import useImageViewer from '../../hooks/useImageViewer';

export default function ListMitra() {
  const [mitraDetail, setMitraDetail] = useState(null);
  const [openDetail, setOpenDetail] = useState(null);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [alignment, setAlignment] = useState('aktif');
  const [alertOpen, setAlertOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [size, setSize] = useState(5);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { handleOpen: handleOpenImage } = useImageViewer();

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  const { data, refetch, isLoading } = useQuery('GET_MITRA_NV_BY_FASILITATOR', GET_MITRA_NV_BY_FASILITATOR);
  const { data: dataAll, refetch: rfAll } = useQuery('GET_MITRA_ALL_BY_FASILITATOR', GET_MITRA_ALL_BY_FASILITATOR);

  const handleApprove = async (id) => {
    const response = await VERIF_MITRA_BY_FASILITATOR(id);
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
      rfAll();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 404) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
  };
  const handleDetail = async (m) => {
    setLoading(true);
    if (m.mitraCode === openDetail) {
      setOpenDetail(null);
    } else {
      if (alignment === 'aktif') {
        const data = await queryClient.fetchQuery(['GET_MITRA_DETAIL_BY_FASILITATOR', m.mitraCode], () =>
          GET_MITRA_DETAIL_BY_FASILITATOR(m.mitraCode)
        );
        if (data.status === 200) {
          setMitraDetail(data?.data?.data);
          setOpenDetail(m.mitraCode);
        }
        setLoading(false);
      } else {
        setMitraDetail(m);
        setOpenDetail(m.mitraCode);
      }
    }
    setLoading(false);
  };

  const handleOnDelete = (item) => {
    setItem(item);
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertOpen(false);
    setItem(null);
  };
  const handleDelete = async () => {
    setLoading(true);
    const response = await DELETE_MITRA_BY_FASILITATOR(item.mitraCode);
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
      rfAll();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    setItem(null);
    setLoading(false);
    setAlertOpen(false);
  };

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };
  function stableSort(array, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    if (query) {
      const column = array[0] && Object.keys(array[0]);
      return array.filter((a) =>
        column.some((col) => a[col] && a[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const listNo = data && data?.data?.data;
  const listAll = dataAll && dataAll.data.data;
  const ll = alignment === 'aktif' ? listAll : listNo;
  const list = ll ? stableSort(ll, search).slice(page * size, page * size + size) : [];
  return (
    <>
      <BarMobile title={'List Mitra'} />
      <AdupiXLeMineraleHead />
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
          <Typography variant="h3">Daftar Mitra</Typography>
          <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange}>
            <ToggleButton value="aktif">Aktif</ToggleButton>
            <ToggleButton value="verifikasi">Verifikasi</ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          fullWidth
          placeholder="Cari ..."
          sx={{ marginBottom: 2 }}
        />
        {isLoading && <LoadingCard />}
        {list && list?.length === 0 && <TidakAdaData />}
        {list &&
          list.map((li, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <CardHeader
                action={alignment === 'aktif' && <MoreMenu handleOnDelete={() => handleOnDelete(li)} />}
                title={li.nama}
                subheader={li.jenisMitra}
              />
              <CardContent>
                <Grid container spacing={1} style={{ marginBottom: 10 }}>
                  <Grid item xs={6}>
                    {[
                      { title: 'NIK', key: 'nik' },
                      { title: 'Jenis Kelamin', key: 'jenisKelamin' },
                      { title: 'Tempat Lahir', key: 'tempatLahir' },
                      { title: 'Tanggal Lahir', key: 'tanggalLahir' },
                      { title: 'No HP', key: 'noHp' },
                      { title: 'Alamat', key: 'alamat' },
                    ].map((item, i) => (
                      <Box key={i} sx={{ display: 'flex' }}>
                        <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption">{`  :  ${li[item.key]}`}</Typography>
                      </Box>
                    ))}

                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                      <Image style={{ width: 100 }} src={li.ktp} dummy={dummyKtp} folder="mitra" alt={`img-ktp`} />
                    </Box>
                  </Grid>
                </Grid>

                <Grid container spacing={1} style={{ marginBottom: 10 }}>
                  <Grid item xs={2}>
                    <Button
                      onClick={() => handleDetail(li)}
                      sx={{ marginTop: 2 }}
                      size="small"
                      variant="outlined"
                      disabled={loading}
                      color="info"
                    >
                      {openDetail === li.mitraCode ? 'Tutup' : loading ? 'Loading ...' : 'Detail'}
                    </Button>
                    </Grid>
                    <Grid item xs={3}>
                    <Button
                      onClick={() => navigate(`/mobile/list-mitra/masalah/${li?.mitraCode}`)}
                      sx={{ marginTop: 2, marginLeft: 2 }}
                      size="small"
                      variant="outlined"
                      color="warning"
                    >
                      masalah
                    </Button>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <Button
                      onClick={() => navigate(`/mobile/list-mitra/lampiran/${li?.mitraCode}`)}
                      sx={{ marginTop: 2, marginLeft: 2 }}
                      size="small"
                      variant="outlined"
                      color="warning"
                    >
                      Lampiran
                    </Button>
                    </Grid>
                    
                    <Grid item xs={4}>
                    <Button
                      onClick={() => navigate(`/mobile/list-mitra/transaksi/${li?.mitraCode}`)}
                      sx={{ marginTop: 2, marginLeft: 2 }}
                      size="small"
                      variant="outlined"
                      color="warning"
                    >
                      Transaksi
                    </Button>
                    </Grid>
                    <Grid item xs={3}>
                    {alignment === 'verifikasi' && (
                      <Button
                        onClick={() => handleApprove(li.mitraCode)}
                        sx={{ marginTop: 2 }}
                        size="small"
                        variant="outlined"
                        color="success"
                      >
                        Approve
                      </Button>
                    )}
                    </Grid>
                    </Grid>
                  
                {openDetail === li.mitraCode && mitraDetail && (
                  <>
                    {mitraDetail?.fasilitator && (
                      <Typography style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }} variant="body1">
                        Fasilitator :
                      </Typography>
                    )}
                    {mitraDetail?.fasilitator &&
                      [
                        { title: 'Nama ', key: 'nama' },
                        { title: 'Alamat', key: 'alamat' },
                      ].map((item, i) => (
                        <TableContainer key={i}>
                          <Table size="small" aria-label="a dense table">
                            <TableRow>
                              <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>{item.title}</TableCell>
                              <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} align="right">
                                {mitraDetail.fasilitator[item.key]}
                              </TableCell>
                            </TableRow>
                          </Table>
                        </TableContainer>
                      ))}
                    {mitraDetail?.anggota && mitraDetail?.anggota.length > 0 && (
                      <Typography style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }} variant="body1">
                        Anggota :
                      </Typography>
                    )}
                    {mitraDetail?.anggota &&
                      mitraDetail?.anggota.map((angg, i) => (
                        <Card key={i} style={{ marginBottom: 10, padding: 0 }}>
                          <CardContent style={{ padding: 10 }}>
                            <Grid container spacing={1}>
                              <Grid item xs={6}>
                                <Typography sx={{ fontSize: 12 }}>{angg?.nama}</Typography>
                                <Typography sx={{ fontSize: 10 }}>NIK : {angg?.nik}</Typography>
                                <Typography sx={{ fontSize: 10 }}>No Hp : {angg?.noHp}</Typography>
                                <Typography sx={{ fontSize: 10 }}>Alamat : {angg?.alamat}</Typography>
                              </Grid>
                              <Grid item xs={6}>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                  <Image
                                    style={{ width: 100 }}
                                    src={li.ktp}
                                    dummy={dummyKtp}
                                    folder="anggota"
                                    alt={`img-ktp`}
                                  />
                                </Box>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      ))}
                    {mitraDetail[alignment === 'aktif' ? 'gudang' : 'usahas'].map((gud, i) => (
                      <div key={i}>
                        <Typography style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }} variant="body1">
                          Usaha :{' '}
                          <Button
                            variant="text"
                            onClick={() =>
                              handleOpenImage(`${process.env.REACT_APP_API_URL_SSL}assets/gudang/${gud?.foto}`)
                            }
                          >
                            Lihat Foto Gudang
                          </Button>
                        </Typography>
                        {[
                          { title: 'Nama Usaha', key: 'namaUsaha' },
                          { title: 'Surat Izin', key: 'noSuratIzinUsaha' },
                          { title: 'Kepemilikan', key: 'statusKepemilikanGudang' },
                          { title: 'Luas Gudang', key: 'luasGudang' },
                          { title: 'Jml Pekerja', key: 'jumlahPekerja' },
                          { title: 'Lama Operasional', key: 'lamaOperasional' },
                          { title: 'Alamat', key: 'alamat' },
                          { title: 'Tanggal Daftar', key: 'createAt' },
                        ].map((item, i) => (
                          <TableContainer key={i}>
                            <Table size="small" aria-label="a dense table">
                              <TableRow>
                                <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>{item.title}</TableCell>
                                <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} align="right">
                                  {gud[item.key]}
                                </TableCell>
                              </TableRow>
                            </Table>
                          </TableContainer>
                        ))}
                        {gud?.mesins && (
                          <Typography style={{ marginTop: 10, fontWeight: 'bold' }} variant="body1">
                            Mesin :
                          </Typography>
                        )}
                        {gud?.mesins.map((m, i) => (
                          <Card key={i} style={{ marginBottom: 10 }}>
                            <CardContent style={{ padding: 10 }}>
                              <Grid container spacing={1}>
                                <Grid item xs={6}>
                                  <Typography sx={{ fontSize: 12 }}>{m?.jenisMesin}</Typography>
                                  <Typography sx={{ fontSize: 10 }}>Status : {m?.statusKepemilikanMesin}</Typography>
                                  <Typography sx={{ fontSize: 10 }}>Kapasitas : {m?.kapasitas}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Image
                                      style={{ width: 100 }}
                                      src={m?.foto}
                                      dummy={dummybarang}
                                      folder="mesin"
                                      alt={`img-barang`}
                                    />
                                  </Box>
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        <TablePagination
          rowsPerPageOptions={[5, 10, 50]}
          component="div"
          count={ll && ll.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={size}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      {alertOpen && (
        <DialogConfirm
          processing={loading}
          alertClose={handleAlertClose}
          alertOpen={alertOpen}
          handleConfirm={handleDelete}
          text={'Yakin Ingin Hapus'}
        />
      )}
    </>
  );
}
