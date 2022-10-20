import { Sync } from '@mui/icons-material';
import { Box, Button, Card, CardContent, Skeleton, Stack, TablePagination, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { fRupiah, ribuan } from 'src/utils/formatNumber';
import { GET_BELI_SAMPAH } from '../../api/sampah';
import { fDateTime } from '../../utils/formatTime';

export default function PembelianPage({setStep ,handleEdit  }) {
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(0);
  const [size, setSize] = useState(50);
  const [date, setDate] = useState('');
  const [detailOpen, setDetailOpen] = useState(null);
  const { data, refetch, isLoading } = useQuery('GET_BELI_SAMPAH', () => GET_BELI_SAMPAH({ page, size, date }), {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };
  const handleDetail = (index) => {
    if (index === detailOpen) {
      setDetailOpen(null);
    } else {
      setDetailOpen(index);
    }
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
  const handleEditdata = async (e) =>{
    setStep(0);
    handleEdit('Pilih Edit Tanggal', {e});
  }

  return (
    <>
      {pagination &&
        pagination?.data.map((li, i) => (
            
          <Card key={i} style={{ marginBottom: 10 }}>
            {format(new Date() ,"yyyy-MM-dd")===format(new Date(li?.updateAt) ,"yyyy-MM-dd")&&
                <Button variant="text" onClick={() => handleEditdata(li)} size="small" style={{ fontSize: 11 }}>
                Edit
                </Button>
                }
            <CardContent>
              <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                <Typography style={{ fontWeight: 'bold' }}>No Transaksi {li?.bsCode}</Typography>
                <Typography variant="caption">{fDateTime(li?.createAt)}</Typography>
              </Box>
              <Typography>Berat : {ribuan(li?.totalBerat)}</Typography>
              <Box sx={{ justifyContent: 'space-between', flexGrow: 1, display: 'flex' }}>
                <Typography>Harga : {fRupiah(li?.totalHarga)}</Typography>
                {/* <Button variant="text">Nota</Button> */}
              </Box>
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
                      <Typography style={{ fontSize: 11 }}>Berat : {ribuan(di?.berat)}</Typography>
                      <Typography style={{ fontSize: 11 }}>Harga : {fRupiah(di?.harga)}</Typography>
                      <Typography style={{ fontSize: 11 }}>Total : {fRupiah(di?.total)}</Typography>
                    </CardContent>
                  </Card>
                ))}
                <br />
                <Typography variant="caption">Pembuatan :{fDateTime(li?.updateAt)}</Typography>
            </CardContent>
          </Card>
        ))}
      <TablePagination
        rowsPerPageOptions={[5, 10, 50]}
        component="div"
        count={pagination?.totalAll || 0}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={size}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
