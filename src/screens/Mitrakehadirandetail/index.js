import { Button, Card, CardActions, CardContent, CardHeader, Chip, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { QueryClient, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CHANGE_STATUS_MASALAH, GET_ALL_MASALAH_BY_MITRA } from "src/api/masalah";
import { GET_MITRA_DETAIL_BY_FASILITATOR } from "src/api/mitra";
import BarMobile from "src/components/BarMobile";
import { fDateTime } from "src/utils/formatTime";
import MoreMenu from "../Masalah/MoreMenu";
import dummyMasalah from '../../assets/dummy-masalah.png';
import Image from "src/components/Image";
import { useSnackbar } from "notistack";

export default function Mitrakehadirandetail() {
    
    const params = useParams();
    
    const { enqueueSnackbar } = useSnackbar();
    const { data: dataMitra } =   useQuery(['GET_MITRA_DETAIL_BY_FASILITATOR', params.mitraCode], () =>
    GET_MITRA_DETAIL_BY_FASILITATOR(params.mitraCode)
  ); 
  const { data: masalahmitra ,refetch} =   useQuery(['GET_ALL_MASALAH_BY_MITRA', params.mitraCode], () =>
  GET_ALL_MASALAH_BY_MITRA(params.mitraCode)
  );
  
  const datasingle = dataMitra?.data?.data;
  const datamasalahmitra = masalahmitra?.data?.data;
//   console.log("sss",masalahmitra);

const handleChangeStatus = async (id) => {
   
    const response = await CHANGE_STATUS_MASALAH(id);
    if (response.status === 200) {
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      refetch();
    }
    if (response.status === 400) {
      await enqueueSnackbar(response.data.message, { variant: 'error' });
    }
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
  };
    return (
        <>
          <BarMobile title={'Kunjungan'} />

            <Card style={{ marginTop: 5}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {datasingle?.nama}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                    {datasingle?.noHp}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                    {datasingle?.gudang?.[0]?.alamat} ,{datasingle?.wilayah?.desa?.wilayah}  {datasingle?.wilayah?.kabupaten?.wilayah}  {datasingle?.wilayah?.kecamatan?.wilayah} 
                    </Typography>
                </CardContent>
                <CardActions>
                
                </CardActions>
            </Card>
            <Card style={{marginTop:4}}>
                <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                   Peninjauan Masalah
                 </Typography>
                 {datamasalahmitra &&
                        datamasalahmitra.map((li, i) => (
                            li?.status === 'Selesai' ?<></> :
                            <Card key={i} style={{ marginBottom: 10 }}>
                            <CardHeader
                                action={
                                <MoreMenu handleOnUpdate={() => handleOnUpdate(li)} handleOnDelete={() => handleOnDelete(li)} />
                                }
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
                                    {li?.status === 'Dalam peninjauan' && (
                                    <Button
                                        style={{ marginTop: 5 }}
                                        onClick={() => handleChangeStatus(li.masalahCode)}
                                        variant="outlined"
                                        size="small"
                                        color="success"
                                    >
                                        Selesai
                                    </Button>
                                    )}
                                </Grid>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Image
                                        style={{ width: 100 }}
                                        src={li?.foto}
                                        dummy={dummyMasalah}
                                        folder="masalah"
                                        alt={`img-masalah`}
                                    />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                    <Typography variant="caption">{fDateTime(li?.createAt)}</Typography>
                                    </Box>
                                </Grid>
                                </Grid>
                            </CardContent>
                            </Card>
                        ))}
                 
                </CardContent>
            </Card>
          </>
    );
}