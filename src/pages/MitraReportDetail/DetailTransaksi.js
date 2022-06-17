import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import Image from '../../components/Image';
import LoadingCard from '../../components/LoadingCard';
import TidakAdaData from '../../components/TidakAdaData';
import { fDateTime } from '../../utils/formatTime';

export default function DetailTransaksi({ pembelian, penjualan, masalah, isLoading }) {
  const [alignment, setAlignment] = React.useState('pembelian');
  const [detailOpen, setDetailOpen] = React.useState(null);
  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };
  const handleDetail = (index) => {
    if (index === detailOpen) {
      setDetailOpen(null);
    } else {
      setDetailOpen(index);
    }
  };
  return (
    <>
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <ToggleButtonGroup
          fullWidth
          color="primary"
          value={alignment}
          style={{ marginBottom: 10 }}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton color="primary" value="pembelian">
            Pembelian
          </ToggleButton>
          <ToggleButton color="primary" value="penjualan">
            Penjualan
          </ToggleButton>
          <ToggleButton color="primary" value="masalah">
            Masalah
          </ToggleButton>
        </ToggleButtonGroup>
        {alignment === 'pembelian' && (
          <>
            {isLoading && <LoadingCard />}

            {pembelian && pembelian?.length === 0 && <TidakAdaData />}

            {pembelian &&
              pembelian.map((li, i) => (
                <Card key={i} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                      <Typography style={{ fontWeight: 'bold' }}>Pembelian</Typography>
                      <Typography variant="caption">{fDateTime(li?.createAt)}</Typography>
                    </Box>
                    <Typography>Berat : {li?.totalBerat}</Typography>
                    <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                      <Typography>Harga : {li?.totalHarga}</Typography>
                      {/* <Button variant="text">Nota</Button> */}
                    </Box>
                    <Typography style={{ fontSize: 11 }}>Detail </Typography>
                    {li?.detail_beli_sampahs && (
                      <Button variant="text" onClick={() => handleDetail(i)} size="small" style={{ fontSize: 11 }}>
                        {i === detailOpen ? 'Tutup' : 'Detail'}
                      </Button>
                    )}
                    {i === detailOpen &&
                      li?.detail_beli_sampahs &&
                      li?.detail_beli_sampahs.map((di, ii) => (
                        <Card key={ii} style={{ marginBottom: 10 }}>
                          <CardContent style={{ padding: 10 }}>
                            <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                              <Typography style={{ fontWeight: 'bold' }}>{di?.jenis_sampah?.jenis}</Typography>
                              <Typography variant="caption">{di?.sumber}</Typography>
                            </Box>
                            <Typography style={{ fontSize: 11 }}>Berat : {di?.berat}</Typography>
                            <Typography style={{ fontSize: 11 }}>Harga : {di?.harga}</Typography>
                            <Typography style={{ fontSize: 11 }}>Total : {di?.total}</Typography>
                          </CardContent>
                        </Card>
                      ))}
                  </CardContent>
                </Card>
              ))}
          </>
        )}
        {alignment === 'masalah' && (
          <>
            {isLoading && <LoadingCard />}

            {masalah && masalah?.length === 0 && <TidakAdaData />}

            {masalah &&
              masalah.map((li, i) => (
                <Card key={i} style={{ marginBottom: 10 }}>
                  <CardHeader
                    title={li?.jenisMasalah}
                    subheader={
                      <Chip label={li?.status} color={li?.status === 'Dalam peninjauan' ? 'warning' : 'success'} />
                    }
                  />
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                          Deskripsi :{' '}
                        </Typography>
                        <Typography variant="caption">{li?.deskripsi}</Typography>
                        <br />
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                          <Image style={{ width: 100 }} src={li?.foto} folder="masalah" alt={`img-masalah`} />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Typography variant="caption">{fDateTime(li?.createAt)}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
          </>
        )}
        {alignment === 'penjualan' && (
          <>
            {isLoading && <LoadingCard />}

            {penjualan && penjualan?.length === 0 && <TidakAdaData />}

            {penjualan &&
              penjualan.map((li, i) => (
                <Card key={i} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                      <Typography style={{ fontWeight: 'bold' }}>Pembelian</Typography>
                      <Typography variant="caption">{fDateTime(li?.createAt)}</Typography>
                    </Box>
                    <Typography>Berat : {li?.totalBerat}</Typography>
                    <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                      <Typography>Harga : {li?.totalHarga}</Typography>
                      {/* <Button variant="text">Nota</Button> */}
                    </Box>
                    <Typography style={{ fontSize: 11 }}>Detail </Typography>
                    {li?.detail_beli_sampahs && (
                      <Button variant="text" onClick={() => handleDetail(i)} size="small" style={{ fontSize: 11 }}>
                        {i === detailOpen ? 'Tutup' : 'Detail'}
                      </Button>
                    )}
                    {i === detailOpen &&
                      li?.detail_beli_sampahs &&
                      li?.detail_beli_sampahs.map((di, ii) => (
                        <Card key={ii} style={{ marginBottom: 10 }}>
                          <CardContent style={{ padding: 10 }}>
                            <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                              <Typography style={{ fontWeight: 'bold' }}>{di?.jenis_sampah?.jenis}</Typography>
                              <Typography variant="caption">{di?.sumber}</Typography>
                            </Box>
                            <Typography style={{ fontSize: 11 }}>Berat : {di?.berat}</Typography>
                            <Typography style={{ fontSize: 11 }}>Harga : {di?.harga}</Typography>
                            <Typography style={{ fontSize: 11 }}>Total : {di?.total}</Typography>
                          </CardContent>
                        </Card>
                      ))}
                  </CardContent>
                </Card>
              ))}
          </>
        )}
      </div>
    </>
  );
}
