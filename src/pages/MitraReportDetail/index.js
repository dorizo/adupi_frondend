import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { GET_REPORT_MITRA_DETAIL_BY_DATE } from '../../api/report';
import dummybarang from '../../assets/dummy-barang.jpg';
import dummyKtp from '../../assets/dummy-ktp.jpg';
import Image from '../../components/Image';
import LoadingComponent from '../../components/LoadingComponent';
import Page from '../../components/Page';
import useImageViewer from '../../hooks/useImageViewer';
import { fDateSuffix } from '../../utils/formatTime';
import DetailTransaksi from './DetailTransaksi';

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const startInit = new Date(y, m, 1);
const endInit = new Date(y, m + 1, 0);

export default function MitraReportDetail() {
  const params = useParams();
  const [start, setStart] = useState(startInit);
  const [end, setEnd] = useState(endInit);
  const { handleOpen: handleOpenImage } = useImageViewer();
  const { data, isLoading, refetch } = useQuery(['GET_REPORT_MITRA_DETAIL_BY_DATE', params.mitraCode], () =>
    GET_REPORT_MITRA_DETAIL_BY_DATE(fDateSuffix(start), fDateSuffix(end), params.mitraCode)
  );
  const mitraDetail = data && data?.data?.data;
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Page title="Report Mitra Detail">
      <Container>
        <Typography variant="h4" gutterBottom>
          Report Mitra Detail
        </Typography>
        <Card style={{ marginBottom: 10 }}>
          <CardHeader title={mitraDetail?.nama} subheader={mitraDetail?.jenisMitra} />
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
                    <Typography variant="caption">{`  :  ${mitraDetail[item.key]}`}</Typography>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                  <Image
                    style={{ height: 110 }}
                    src={mitraDetail?.ktp}
                    dummy={dummyKtp}
                    folder="mitra"
                    alt={`img-ktp`}
                  />
                </Box>
              </Grid>
            </Grid>

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
                              folder="anggota"
                              style={{ height: 110 }}
                              src={angg?.ktp}
                              dummy={dummyKtp}
                              alt={`img-ktp`}
                            />
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              {mitraDetail?.gudang.map((gud, i) => (
                <div key={i}>
                  <Typography style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }} variant="body1">
                    Usaha :{' '}
                    <Button
                      variant="text"
                      onClick={() => handleOpenImage(`${process.env.REACT_APP_API_URL_SSL}assets/gudang/${gud?.foto}`)}
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
                                folder="mesin"
                                style={{ height: 40 }}
                                src={m?.foto}
                                alt={`img-barang`}
                                dummy={dummybarang}
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
            <Typography style={{ marginTop: 10, marginBottom: 10, fontWeight: 'bold' }} variant="body1">
              Transaksi :
            </Typography>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Box>
                <DesktopDatePicker
                  label="Dari"
                  inputFormat="dd/MM/yyyy"
                  value={start}
                  getOptionLabel={(option) => option.title}
                  onChange={(_, newVal) => setStart(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <DesktopDatePicker
                  label="Sampai"
                  inputFormat="dd/MM/yyyy"
                  value={end}
                  getOptionLabel={(option) => option.title}
                  onChange={(_, newVal) => setEnd(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Button
                onClick={() => refetch(fDateSuffix(start), fDateSuffix(end))}
                size="large"
                variant="contained"
                color="primary"
              >
                Filter
              </Button>
            </Stack>
            <DetailTransaksi
              isLoading={isLoading}
              pembelian={mitraDetail?.transaksi?.beliSampah}
              penjualan={mitraDetail?.transaksi?.jualSampah}
              masalah={mitraDetail?.masalah}
            />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
