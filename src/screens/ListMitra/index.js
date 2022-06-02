import { Box, Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { GET_MITRA_NV_BY_FASILITATOR, VERIF_MITRA_BY_FASILITATOR } from '../../api/mitra';
import AdupiXMayoraHead from '../../components/AdupiXMayoraHead';
import BarMobile from '../../components/BarMobile';
import MoreMenu from './MoreMenu';

export default function ListMitra() {
  const [mitraDetail, setMitraDetail] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const { data, refetch } = useQuery('GET_MITRA_NV_BY_FASILITATOR', GET_MITRA_NV_BY_FASILITATOR);

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
  const handleDetail = (data) => {
    setMitraDetail(data);
    console.log(mitraDetail);
  };

  const list = data && data.data.data;
  return (
    <>
      <BarMobile title={'List Mitra'} />
      <AdupiXMayoraHead />
      <div style={{ marginTop: 5, paddingLeft: 20, paddingRight: 20 }}>
        <Typography style={{ marginBottom: 20 }} variant="h2">
          Daftar Mitra
        </Typography>
        {list &&
          list.map((li, i) => (
            <Card key={i} style={{ marginBottom: 10 }}>
              <CardHeader
                action={
                  <MoreMenu handleApprove={() => handleApprove(li.mitraCode)} handleDetail={() => handleDetail(li)} />
                }
                title={li.nama}
                subheader={li.alamat}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        NIK :{' '}
                      </Typography>
                      <Typography variant="caption">{li.nik}</Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                        No HP :{' '}
                      </Typography>
                      <Typography variant="caption">{li.noHp}</Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    Aktivitas terakhir :{' '}
                  </Typography>
                  <Typography variant="caption">2022-05-12 10:20</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
}
