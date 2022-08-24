import { Button, Card, CardActions, CardContent, CardHeader, Chip, FormControl, Grid, ImageList, ImageListItem, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { QueryClient, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CHANGE_STATUS_MASALAH, GET_ALL_MASALAH_BY_MITRA } from "src/api/masalah";
import { GET_MITRA_DETAIL_BY_FASILITATOR } from "src/api/mitra";
import BarMobile from "src/components/BarMobile";
import { fDateTime } from "src/utils/formatTime";
import dummyMasalah from '../../assets/dummy-masalah.png';
import Image from "src/components/Image";
import { useSnackbar } from "notistack";
import { GET_PEMBELIAN_MITRA_PERBULAN, GET_PENJUALAN_MITRA_PERBULAN } from "src/api/report";
import { format } from "date-fns";
import Chart from 'react-apexcharts'
import ReactApexChart from "react-apexcharts";
import { LoadingButton } from "@mui/lab";
import SaveIcon from '@mui/icons-material/Save';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import CameraAltRounded from "@mui/icons-material/CameraAltRounded";
export default function Mitrakehadirandetail() {
    
    const params = useParams();
    
    const { enqueueSnackbar } = useSnackbar();
    const { data: dataMitra } =   useQuery(['GET_MITRA_DETAIL_BY_FASILITATOR', params.mitraCode], () =>
    GET_MITRA_DETAIL_BY_FASILITATOR(params.mitraCode)
  ); 
  const { data: masalahmitra ,refetch} =   useQuery(['GET_ALL_MASALAH_BY_MITRA', params.mitraCode], () =>
  GET_ALL_MASALAH_BY_MITRA(params.mitraCode)
  );

  const { data: pembelianmitra } =   useQuery(['GET_PEMBELIAN_MITRA_PERBULAN', params.mitraCode], () =>
  GET_PEMBELIAN_MITRA_PERBULAN(format(new Date(), "Y"),params.mitraCode)
  );
  
  const { data: penjualanmitra } =   useQuery(['GET_PENJUALAN_MITRA_PERBULAN', params.mitraCode], () =>
  GET_PENJUALAN_MITRA_PERBULAN(format(new Date(), "Y"),params.mitraCode)
  );
  console.log("penjualanmitra",penjualanmitra);
  
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

  
  const list = penjualanmitra && penjualanmitra?.data?.data;
  
  const chartDataBerat = [...Array(12)].map(() => 0);
    list?.forEach((v) => {
      chartDataBerat[v.bulan - 1] = v.berat / 1000;
    });


  const state = {
    series: [
      {
        name: 'Berat(ton)',
        data: chartDataBerat,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Chart Penjualan',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: [
        {
          labels: {
            formatter: (val) => val.toFixed(2),
          },
        },
      ],
      xaxis: {
        categories: [
          'Januari',
          'Febuari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ],
      },
    },
  };

  
  const list2 = pembelianmitra && pembelianmitra?.data?.data;
  
  const chartDataBerat2 = [...Array(12)].map(() => 0);
    list2?.forEach((v) => {
      chartDataBerat2[v.bulan - 1] = v.berat / 1000;
    });
  const state2 = {
    series: [
      {
        name: 'Berat(ton)',
        data: chartDataBerat2,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: 'line',
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Chart Pembelian',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
      },
      yaxis: [
        {
          labels: {
            formatter: (val) => val.toFixed(2),
          },
        },
      ],
      xaxis: {
        categories: [
          'Januari',
          'Febuari',
          'Maret',
          'April',
          'Mei',
          'Juni',
          'Juli',
          'Agustus',
          'September',
          'Oktober',
          'November',
          'Desember',
        ],
      },
    },
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
                <CardActions style={ {display: "flex",justifyContent: "flex-end"}}>
                <LoadingButton
                    loadingPosition="start"
                    startIcon={<FollowTheSignsIcon />}
                    variant="outlined"
                  >
                    CHECK IN
                  </LoadingButton>
                </CardActions>
                <CardActions>
                
                </CardActions>
            </Card>
            <Card style={{ marginTop: 5}}>
                <CardContent>
                  <ReactApexChart options={state.options} series={state.series} type="line" height={360} />
                </CardContent>
                <CardActions>
                
                </CardActions>
            </Card>
           
            <Card style={{ marginTop: 5}}>
                <CardContent>
                  <ReactApexChart options={state2.options} series={state2.series} type="line" height={360} />
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
            <Card style={{marginTop:4}}>
              <CardContent>
                <Typography variant="caption">FORM INPUT KUNJUNGAN</Typography>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Report Penjualan"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Report Pembelian"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Report Masalah"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Report Mesin"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Report Lain2"
                    multiline
                    rows={2}
                  />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1 }}>
                <LoadingButton
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="outlined"
                  >
                    Simpan
                  </LoadingButton>
                </FormControl>
              </CardContent>
              
            </Card>
            <Card style={{marginTop:4}}>
              <CardActions style={ {display: "flex",justifyContent: "flex-end"}}>
              <LoadingButton
                  loadingPosition="start"
                  startIcon={<CameraAltRounded />}
                  variant="outlined"
                >
                  Camera
                </LoadingButton>
              </CardActions>
              <CardContent>
                <ImageList sx={{height: 200 }} cols={3} rowHeight={164}>
                  <ImageListItem>
                    <Image
                      dummy={dummyMasalah}
                      folder="masalah"
                        alt={`img-masalah`}
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <Image
                      dummy={dummyMasalah}
                      folder="masalah"
                        alt={`img-masalah`}
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <Image
                      dummy={dummyMasalah}
                      folder="masalah"
                        alt={`img-masalah`}
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <Image
                      dummy={dummyMasalah}
                      folder="masalah"
                        alt={`img-masalah`}
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <Image
                      dummy={dummyMasalah}
                      folder="masalah"
                        alt={`img-masalah`}
                    />
                  </ImageListItem>
                  <ImageListItem>
                    <Image
                      dummy={dummyMasalah}
                      folder="masalah"
                        alt={`img-masalah`}
                    />
                  </ImageListItem>
                </ImageList>
              </CardContent>
            </Card>
          </>
    );
}