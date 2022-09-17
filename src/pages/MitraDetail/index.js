import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Table,
  TableCell,
  TableContainer,
  Button,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import LoadingComponent from '../../components/LoadingComponent';
import { GET_MITRA_DETAIL_BY_SU } from '../../api/mitra';
import dummybarang from '../../assets/dummy-barang.jpg';
import dummyKtp from '../../assets/dummy-ktp.jpg';
import Page from '../../components/Page';
import Image from '../../components/Image';
import useImageViewer from '../../hooks/useImageViewer';
import { GET_mitraLampiran } from 'src/api/mitralampiran';

export default function MitraDetail() {
  const params = useParams();
  const { handleOpen: handleOpenImage } = useImageViewer();
  const { data, isLoading } = useQuery(['GET_MITRA_DETAIL_BY_SU', params.mitraCode], () =>
    GET_MITRA_DETAIL_BY_SU(params.mitraCode)
  );
  const { data:datalampiran, refetch:refetchlampiran, isLoading:lodinglampiran }  = useQuery(
    ['GET_ALL_MASALAH', params?.mitraCode],() => GET_mitraLampiran(params?.mitraCode),
    {
        refetchOnWindowFocus: false,
    }
    );
  const mitraDetail = data && data?.data?.data;
  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <Page title="Mitra Detail">
      <Container>
        <Typography variant="h4" gutterBottom>
          Mitra Detail
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
          </CardContent>
        </Card>
        {datalampiran?.data?.data.map((value,key) => (
        <Card style={{margin:10}} key={key}>
        <CardHeader
        title={value.mitraLampiranName}
        
        >
        </CardHeader>
      
        <CardContent>
        {
            value.mitra?.map((value1,key1) => (
                <>
                <Card key={key1} style={{margin:3}}>
                <CardHeader
                    >
                    </CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={8} >
                            {value1?.MitraLampiranImageKeterangan}
                            </Grid>
                            <Grid item xs={4} >
                            <Image
                                style={{ width: 100 }}
                                src={value1?.MitraLampiranImageFoto}
                                alt={`img-barang`}
                                folder="mesin"
                                dummy={dummybarang}
                            />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </>

            ))
        }
        </CardContent>
    </Card>
        ))}
        
      </Container>
    </Page>
  );
}
