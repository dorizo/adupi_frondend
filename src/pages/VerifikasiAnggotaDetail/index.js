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
  TableRow,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Image from '../../components/Image';
import { GET_MITRA_DETAIL_BY_SU } from '../../api/mitra';
import dummyKtp from '../../assets/dummy-ktp.jpg';
import LoadingComponent from '../../components/LoadingComponent';
import Page from '../../components/Page';
import ListAnggota from './ListAnggota';

export default function VerifikasiAnggotaDetail() {
  const params = useParams();
  const [alignment, setAlignment] = useState('no');

  const { data, isLoading } = useQuery(['GET_MITRA_DETAIL_BY_SU', params.mitraCode], () =>
    GET_MITRA_DETAIL_BY_SU(params.mitraCode)
  );
  const mitraDetail = data && data?.data?.data;

  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };
  if (isLoading) {
    return <LoadingComponent />;
  }
  return (
    <Page title="Mitra List Anggota">
      <Container>
        <Typography variant="h4" gutterBottom>
          Mitra List Anggota
        </Typography>
        <Card style={{ marginBottom: 10 }}>
          <CardHeader title={mitraDetail?.nama} subheader={mitraDetail?.jenisMitra} />
          <CardContent style={{ paddingTop: 2 }}>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={6}>
                {[
                  { title: 'No HP', key: 'noHp' },
                  { title: 'Alamat', key: 'alamat' },
                ].map((item, i) => (
                  <TableContainer key={i}>
                    <Table size="small" aria-label="a dense table">
                      <TableRow>
                        <TableCell style={{ paddingTop: 0, paddingBottom: 0 }}>{item.title}</TableCell>
                        <TableCell style={{ paddingTop: 0, paddingBottom: 0 }} align="right">
                          {mitraDetail[item.key]}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </TableContainer>
                ))}
                {mitraDetail?.fasilitator &&
                  [{ title: 'Nama Fasilitator', key: 'nama' }].map((item, i) => (
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
                {mitraDetail?.gudang.map((gud, i) => (
                  <div key={i}>
                    {[{ title: 'Nama Usaha', key: 'namaUsaha' }].map((item, i) => (
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
                  </div>
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
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <ToggleButtonGroup
              fullWidth
              color="primary"
              value={alignment}
              style={{ marginBottom: 10 }}
              exclusive
              onChange={handleChange}
            >
              <ToggleButton color="primary" value="no">
                Anggota Belum Verif
              </ToggleButton>
              <ToggleButton color="primary" value="yes">
                Anggota Verif
              </ToggleButton>
            </ToggleButtonGroup>
            <ListAnggota type={alignment} mitraCode={mitraDetail?.mitraCode} />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
