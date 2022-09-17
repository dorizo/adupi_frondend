import { Box, Button, Card, CardActions, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, ImageList, ImageListItem, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { CHANGE_STATUS_MASALAH, GET_ALL_MASALAH_BY_MITRA, NOTE_MASALAH_FASILITATOR } from "src/api/masalah";
import { fDateTime } from "src/utils/formatTime";
import dummyMasalah from '../../assets/dummy-masalah.png';
import Image from "src/components/Image";
import { GET_PEMBELIAN_MITRA_PERBULAN, GET_PENJUALAN_MITRA_PERBULAN } from "src/api/report";
import { format } from "date-fns";
import ReactApexChart from "react-apexcharts";
import { LoadingButton } from "@mui/lab";
import CameraAltRounded from "@mui/icons-material/CameraAltRounded";
import ButtonUpload from "src/components/Button/ButtonUpload";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { ADD_KUNJUNGANIMAGE } from "src/api/kunjungan";
import { GET_KUNJUNGAN_DETAIL, GET_viewimagekunjungan } from "src/api/kunjunganmitra";
import Form from './form';
import TextInput from "src/components/TextInput";
import SelectInput from "src/components/SelectInput";
export default function Detailmitracomp({title}) {

    const params = useParams();
    const [openmodal, setOpenmodal] = useState(false);
    const [openmodalmasalah, setopenmodalmasalah] = useState(false);
    
    const [Modalitems, setModalitems] = useState(null);
    const [Modalmasalahitem, setModalmasalahitem] = useState(null);
    const [inputnote, Setinputnote] = useState(null);
    const [inputstatus , setinputstatus] = useState(null);
    const [selectedImg, setSelectedImg] = useState('');
    const [loadingbutton ,setloadingbutton] = useState(true);
    const [pengisiansubmit ,setpengisiansubmit] = useState(true);
    const { enqueueSnackbar } = useSnackbar();
    const handleClose = () => {
        setOpenmodal(false);
      };
      const handleClosemasalah = () => {
        setopenmodalmasalah(false);
      };
      const handleUploadClick = (event) => {
        // setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setSelectedImg(reader.result);
        };
        // setLoading(false);
        setloadingbutton(false);
      };
      const handleupdate = async () =>{
        if(inputnote==null){
          await enqueueSnackbar("Note Wajib Diisi", { variant: 'error' });
          return;
        }
        if(inputstatus==null){
          await enqueueSnackbar("Status wajib diisi Wajib Diisi", { variant: 'error' });
          return;
        }

        const response = await NOTE_MASALAH_FASILITATOR({masalahCode:Modalmasalahitem?.masalahCode,note:inputnote,status:inputstatus});
        console.log(response);
        if (response.status === 200) {
          await enqueueSnackbar(response.data.message, { variant: 'success' });
          refetch();
          setinputstatus(null);
          Setinputnote(null);
        }
        if (response.status === 400) {
          await enqueueSnackbar(response.data.message, { variant: 'error' });
        }
        if (response.status === 500) {
          await enqueueSnackbar('Internal server error', 'error');
        }
        await setopenmodalmasalah(false);
        
      }
      
      const Uploadimagebase = async () => {
        setloadingbutton(true);
        const response = await ADD_KUNJUNGANIMAGE({idku:title , image:selectedImg , statusfoto:'mitra'});
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
          setOpenmodal(false);
        }
        if (response.status === 400) {
          await enqueueSnackbar(response.data.message, { variant: 'error' });
        }
        if (response.status === 500) {
          await enqueueSnackbar('Internal server error', 'error');
        }
        imagerefach();
      };
  
      
  
    const imageupload = async (value) => {
        setModalitems(value);
        setOpenmodal(true);
        setSelectedImg("");
        setloadingbutton(false);
    }
      
      //image upload end
  
   
    const { data: masalahmitra ,refetch} =   useQuery(['GET_ALL_MASALAH_BY_MITRA', params.mitraCode], () =>
    GET_ALL_MASALAH_BY_MITRA(params.mitraCode)
    );
  
    const { data: pembelianmitra } =   useQuery(['GET_PEMBELIAN_MITRA_PERBULAN', params.mitraCode], () =>
    GET_PEMBELIAN_MITRA_PERBULAN(format(new Date(), "Y"),params.mitraCode)
    );
    
    const { data: penjualanmitra } =   useQuery(['GET_PENJUALAN_MITRA_PERBULAN', params.mitraCode], () =>
    GET_PENJUALAN_MITRA_PERBULAN(format(new Date(), "Y"),params.mitraCode)
    );
    const { data: imagekunjungan , refetch:imagerefach } =   useQuery(['GET_PENJUALAN_MITRA_PERBULAN', title], () =>
    GET_viewimagekunjungan(title,'mitra')
    );
    const datamasalahmitra = masalahmitra?.data?.data;
  
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

    const handlemodalmasalah = async (m) => {
      console.log(m);
      setopenmodalmasalah(true);
      setModalmasalahitem(m);

    }
  
    
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
return(
    <>
          <Dialog open={openmodal} onClose={handleClose}>
            <DialogTitle>{Modalitems?.judul}</DialogTitle>
            <DialogContent>
              <DialogContentText>
              </DialogContentText>
              {selectedImg && (
                  <a style={{ width: '100%' }} role="button" tabIndex={0} >
                    <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
                  </a>
                )}
              <ButtonUpload disabled={selectedImg} upload={handleUploadClick} component="label" label="Unggah File" />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <LoadingButton loading={loadingbutton} onClick={Uploadimagebase}>Upload</LoadingButton>
            </DialogActions>
          </Dialog>

          <Dialog open={openmodalmasalah} fullWidth={true}>
            <DialogTitle>{Modalitems?.judul}</DialogTitle>
            <DialogContent>
              {Modalmasalahitem?.deskripsi}
            <TextInput
              autoComplete='off'
              multiline
              rows={4}
              onChange={(e) =>Setinputnote(e.target.value)}
            />
             <SelectInput
            label="Status Masalah"
            name="jenisMasalah"
            id="jenisMasalah"
            onChange={(e) =>setinputstatus(e.target.value)}
            option={[
              'dalam peninjauan',
              'selesai',
            ].map((a) => {
              return { value: a, label: a };
            })}
          />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleupdate}>Simpan</Button>
              <Button onClick={handleClosemasalah}>Cancel</Button>
            </DialogActions>
          </Dialog>
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
                                        onClick={() => handlemodalmasalah(li)}
                                        variant="outlined"
                                        size="small"
                                        color="success"
                                    >
                                        Input
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
                {pengisiansubmit?<Form title={title} pengisiansubmit={setpengisiansubmit} />:<h3>Sudah Menginput Form Kunjungan</h3>}
              </CardContent>
            </Card>
            <Card style={{marginTop:4}}>
              <CardActions style={ {display: "flex",justifyContent: "flex-end"}}>
              <LoadingButton
                  loadingPosition="start"
                  startIcon={<CameraAltRounded />}
                  variant="outlined"
                  onClick={() =>{imageupload()}}
                >
                  Camera
                </LoadingButton>
              </CardActions>
              <CardContent>
                <ImageList sx={{height: 200 }} cols={3} rowHeight={164}>
                    {imagekunjungan?.data?.data?.map((li, i) => (
                  <ImageListItem>
                 <Image
                        src={li?.foto}
                        alt={`img-barang`}
                        folder="kunjungan"
                        dummy={dummyMasalah}
                      />
                  </ImageListItem>
                   ))}
                 </ImageList>
              </CardContent>
            </Card>
    </>
)
}
