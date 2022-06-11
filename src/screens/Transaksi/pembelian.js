import {
  Box,
  Button,
  Card,
  CardContent,
  Skeleton,
  Stack,
  TablePagination,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { GET_BELI_SAMPAH } from '../../api/sampah';
import { fDateTime } from '../../utils/formatTime';

export default function TransaksiPembelian() {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(0);
  const [size, setSize] = useState(5);
  const [date, setDate] = useState('');

  const [alignment, setAlignment] = React.useState('pembelian');

  const handleChange = (_, newAlignment) => {
    setAlignment(newAlignment);
  };

  const { data, refetch, isLoading } = useQuery('GET_BELI_SAMPAH', () => GET_BELI_SAMPAH({ page, size, date }), {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setDate('');
    setLoading(true);
    refetch({ page, size, date });
    setLoading(false);
  }, [page, size, date, refetch]);

  if (loading || isLoading) {
    return [...Array(size)].map((_, i) => (
      <Stack key={i} spacing={1}>
        <Skeleton width={'100%'} height={80} variant="text" />
        <Skeleton width={'100%'} height={250} variant="rectangular" />
      </Stack>
    ));
  }

  const pagination = data && data?.data?.data;

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
        </ToggleButtonGroup>
        {alignment === 'pembelian' && (
          <>
            {pagination &&
              pagination?.data.map((li, i) => (
                <Card key={i} style={{ marginBottom: 10 }}>
                  <CardContent>
                    <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                      <Typography style={{ fontWeight: 'bold' }}>Pembelian</Typography>
                      <Typography variant="caption">{fDateTime(li?.createAt)}</Typography>
                    </Box>
                    <Typography>Berat : {li?.totalBerat}</Typography>
                    <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                      <Typography>Harga : {li?.totalHarga}</Typography>
                      <Button variant="text">Nota</Button>
                    </Box>
                    <Typography style={{ fontSize: 11 }}>Detail </Typography>
                    {li?.detail_beli_sampahs &&
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 50]}
              component="div"
              count={pagination?.totalItems}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={size}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </div>
    </>
  );
}
