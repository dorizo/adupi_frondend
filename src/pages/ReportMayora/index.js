import { Card, CardContent, Container, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import Page from '../../components/Page';
import PetaSebaran from '../PetaSebaran';
import MasalahMitraPerbulan from './Chart/MasalahMitraPerbulan';
import MasalahPerMitraPerbulan from './Chart/MasalahPerMitraPerbulan';
import PembelianMitraPerbulan from './Chart/PembelianMitraPerbulan';
import PembelianMitraPerKategori from './Chart/PembelianMitraPerKategori';
import PembelianMitraPerJenis from './Chart/PembelianMitraPerJenis';
import PenjualanMitraPerJenis from './Chart/PenjualanMitraPerJenis';
import PembelianPerMitraPerbulan from './Chart/PembelianPerMitraPerbulan';
import PenjualanPerMitraPerbulan from './Chart/PenjualanPerMitraPerbulan';
import PembelianPerMitraPerbulanline from './Chart/PembelianPerMitraPerbulanline';
import PenjualanPerMitraPerbulanLine from './Chart/PenjualanPerMitraPerbulanLine';
import PenjualanMitraPerbulan from '../Report/Chart/PenjualanMitraPerbulan';
import TotalMitravsJumlahPembelian from '../Report/Chart/TotalMitravsJumlahPembelian';
import Totalcontinuevspembelian from '../Report/Chart/Totalcontinuemitravspembelian';
import PenjualanMitraPerKategori from '../Report/Chart/PenjualanMitraPerKategori';
import LuasGudangPerbulan from '../Report/Chart/LuasGudangPerbulan';
import PekerjaPerbulan from '../Report/Chart/PekerjaPerbulan';
import TotalMitravsJumlahPenjualan from '../Report/Chart/TotalMitravsJumlahPenjualan';
import Totalcontinuevspenjualan from '../Report/Chart/Totalcontinuemitravspenjualan';

export default function ReportMayora() {
  return (
    
    <Page title="Report Mayora">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Report Mayora
          </Typography>
        </Stack>

        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <TotalMitravsJumlahPembelian />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Totalcontinuevspembelian />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <TotalMitravsJumlahPenjualan />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Totalcontinuevspenjualan />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <PembelianMitraPerKategori />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PenjualanMitraPerKategori />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <LuasGudangPerbulan />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PekerjaPerbulan />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <PembelianPerMitraPerbulan type="pie" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PembelianPerMitraPerbulanline />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <PenjualanPerMitraPerbulan type="pie" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <PenjualanPerMitraPerbulanLine />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        <Card style={{ marginBottom: 10 }}>
          <CardContent>
            <Grid container spacing={1} style={{ marginBottom: 10 }}>
              <Grid item xs={12} sm={6}>
                <MasalahMitraPerbulan />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MasalahPerMitraPerbulan />
              </Grid>
            </Grid>
          </CardContent>
        </Card> */}
        <Card style={{ marginBottom: 10 }}>
          <CardContent style={{ margin: 0, padding: 0, marginBottom: 30 }}>
            <PetaSebaran type="component" />
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
