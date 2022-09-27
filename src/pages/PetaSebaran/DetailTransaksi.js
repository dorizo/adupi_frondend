import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { useQuery } from 'react-query';
import TidakAdaData from '../../components/TidakAdaData';
import { GET_DETAIL_TRANSAKSI } from '../../api/dashboard';
import { fDateTime } from '../../utils/formatTime';
import LoadingCard from '../../components/LoadingCard';

export default function DetailTransaksi({ anggotaCode }) {
  const [alignment, setAlignment] = React.useState('pembelian');
  const [detailOpen, setDetailOpen] = React.useState(null);

  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  const { data, isLoading } = useQuery(['GET_DETAIL_TRANSAKSI', anggotaCode], () => GET_DETAIL_TRANSAKSI(anggotaCode), {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
  const handleDetail = (index) => {
    if (index === detailOpen) {
      setDetailOpen(null);
    } else {
      setDetailOpen(index);
    }
  };
  if (isLoading) {
    return [...Array(5)].map((_, i) => (
      <Stack key={i} spacing={1}>
        <Skeleton width={'100%'} height={80} variant="text" />
        <Skeleton width={'100%'} height={250} variant="rectangular" />
      </Stack>
    ));
  }

  const list = data && data?.data?.data;

  if (list.length === 0) {
    return <TidakAdaData />;
  }
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
        </ToggleButtonGroup>
        {alignment === 'pembelian' && (
          <>
            {isLoading && <LoadingCard />}

            {list && list?.length === 0 && <TidakAdaData />}

            {list &&
              list?.map((li, i) => (
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
                      li?.detail_beli_sampahs?.map((di, ii) => (
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
