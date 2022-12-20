import { Box, Button, Card, CardContent, Container, Drawer, FormControl, Grid, InputLabel, List, MenuItem, Select, Stack, TextField } from '@mui/material';
import { width } from '@mui/system';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from 'react-leaflet';
import { useQuery, useQueryClient } from 'react-query';
import { GET_MITRA_ALL_BY_SU_YES } from 'src/api/mitra';
import { GET_ALL_WARNA } from 'src/api/warna';
import { GET_ALL_PROVINSI } from 'src/api/wilayah';
import SelectInput from 'src/components/SelectInput';
import { GET_MAP_ANGGOTA } from '../../api/dashboard';
import Page from '../../components/Page';
import DetailAnggota from './DetailAnggota';
// import { jakartaBarat } from '../../kml/jakarta/barat';
// import { jakartaSelatan } from '../../kml/jakarta/selatan';
// import { jakartaTimur } from '../../kml/jakarta/timur';
// import { jakartaPusat } from '../../kml/jakarta/pusat';

/* eslint-disable no-undef */
const center = [-6.258752, 106.6201363];

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const startInit = new Date(y, m, 1);
const endInit = new Date(y, m + 1, 0);

const setOption = (data) => {
  const list =
    data &&
    data.map((p) => {
      return { value: p.wilayahCode, title: p.wilayah };
    });
  return list;
};
export default function PetaSebaran({ type = null }) {
  const [loading, setLoading] = useState(false);
  const [Provinsi, setProvinsi] = useState(null);
  const [Provinsivalue, setProvinsivalue] = useState(null);
  
  const [loadingG, setLoadingG] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [list, setList] = useState([]);
  const [anggota, setAnggota] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(5);
  const queryClient = useQueryClient();
  const [ukuranmarker, setUkuranmarker] = useState(5);
  const [start, setStart] = React.useState(startInit);
  const [end, setEnd] = React.useState(endInit);
  const [mitraValue , setmitraValue] = useState("");
  async function getAllAnggota() {
    // const date = new Date();

    // var date = new Date();
    // var firstDay = new Date(date.getFullYear(), date.getMonth());
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 2, 0);
    // const awal = firstDay.getFullYear() + "-" + lastDay.getMonth() + "-" + firstDay.getDate();
    // const akhir = lastDay.getFullYear() + "-" + lastDay.getMonth() + "-" + lastDay.getDate();
    setLoadingG(true);
    const data = await queryClient.fetchQuery(['GET_ALL_ANGGOTA_DAHSBOARD', { start, end ,mitraValue,Provinsivalue}], () =>
      GET_MAP_ANGGOTA(start, end , mitraValue,Provinsivalue)
    );

    if (data.status === 200) {
      setList(data?.data?.data);
    }
    setLoadingG(false);
  }

  const hanlechangemaps = async () => {
    const data = await queryClient.fetchQuery(['GET_ALL_ANGGOTA_DAHSBOARD', { start, end ,mitraValue , Provinsivalue}], () =>
      GET_MAP_ANGGOTA(start, end,mitraValue ,Provinsivalue)
    );
    if (data.status === 200) {
      setList(data?.data?.data);
    }
  };
  
  const { data:datamitra, isLoading:lodingmitra } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
  // console.log(datamitra?.data?.data);
  const handleSelectAnggota = (a) => {
    setAnggota(a);
    setDrawerOpen(true);
  };
  const handleChangestart = (newValue) => {
    setStart(newValue);
  };

  const handleChangeend = (newValue) => {
    setEnd(newValue);
  };
  useEffect(() => {
    getAllAnggota();
  }, []);

  const warna = useQuery('GET_WARNA', GET_ALL_WARNA);//= ['#F00', '#ffff00', '#005187', '#155612', '#ff00d0', '#0cd151', '#000','#A58CFF','#FFE15D','#0e7013' ,'#9b9b9b','#c68383','#a80000','#FF8FB1','#FF6D28','#47B5FF','#256D85','#00FFD1','#182747'];
  // console.log("warna" , warna?.data?.data?.data?.[0]?.warna);
  function MyComponent() {
    const mapEvents = useMapEvents({
      zoomend: () => {
        console.error(mapEvents.getZoom());
      
      },
    });

    return null;
  }
  const singledata = (e) => {
      // console.log(e.target.value)
      setmitraValue(e.target.value);

  }
async function getPro(){
GET_ALL_PROVINSI()
  .then((res) => {
    const list =
      res &&
      res.data?.data?.map((p) => {
        const wil = { value: p.wilayahCode, label: p.wilayah };
        return wil;
      });
    setProvinsi(list);
  })
  .catch((e) => {
    setProvinsi();
    console.log(e);
  });

  
}
  useEffect(() => {
    getPro();
  }, []);
  const handleChangeProvinsi =(v)=>{
    setProvinsivalue(v.target.value);
  }
  console.log(list);

  const MapComponent = () => {
    
    return (
      <>
        <Container>
          <CardContent style={{ padding: 0, marginTop: 20 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Grid container spacing={1}>
                <Grid item>
                  <SelectInput
                    value={Provinsivalue}
                    label="Provinsi"
                    option={Provinsi}
                    id="demo-multiple-name"
                    style={{width:200}}
                    onChange={handleChangeProvinsi}
                  />
                </Grid>
                <Grid item>
                  <InputLabel id="demo-multiple-name-label">Name</InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={mitraValue}
                    style={{width:200}}
                    onChange={singledata}
                  >
                    <MenuItem value="">SEMUA MITRA</MenuItem>
                    {datamitra?.data?.data?.map((row ,indexx)=>{
                      
                       return(<MenuItem key={indexx} value={row.mitraCode}>{row.nama} ({row?.usahas?.[0]?.namaUsaha})</MenuItem>) 
                        
                      })}
                </Select>
                
                </Grid>
                <Grid item>
                <br />
                <DesktopDatePicker
                  label="Dari"
                  inputFormat="dd/MM/yyyy"
                  value={start}
                  onChange={handleChangestart}
                  renderInput={(params) => <TextField {...params} />}
                />
                </Grid>
                <Grid item>
                  <br />
                <DesktopDatePicker
                  label="Sampai"
                  inputFormat="dd/MM/yyyy"
                  onChange={handleChangeend}
                  value={end}
                  renderInput={(params) => <TextField {...params} />}
                />
                </Grid>
              </Grid>
              
              <Button onClick={hanlechangemaps} size="large" variant="contained" color="primary">
                Filter
              </Button>
            </Stack>
          </CardContent>

          <MapContainer style={{ height: '546px', width: '100%' }} center={center} zoom={10} scrollWheelZoom={false}>
            <MyComponent />       
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png?api_key=3383c943-27ab-4252-994a-785b44bc5f8c"
            />
            {list &&
              list?.map((a, i) => {
                const color =  warna?.data?.data?.data?.[i]?.warna;
                const mitra = `<svg version="1.1" id="marker-11" xmlns="http://www.w3.org/2000/svg" fill='${color}'
                fill-opacity="1" width="12px" height="12px" viewBox="0 0 11 11"><path id="path4133" d="M5.5-0.0176c-1.7866,0-3.8711,1.0918-3.8711,3.8711&#xA;&#x9;C1.6289,5.7393,4.6067,9.9082,5.5,11c0.7941-1.0918,3.871-5.1614,3.871-7.1466C9.371,1.0742,7.2866-0.0176,5.5-0.0176z"/></svg>`;
                const iconermitra = L.divIcon({ html: mitra, iconSize: [0, 0], iconAnchor: [0, 0] });
                return (
                  <Marker
                    key={i}
                    position={[a?.nama?.usahas[0]?.lat || 0, a?.nama?.usahas[0]?.lang || 0]}
                    // eventHandlers={{ click: () => handleSelectAnggota(a) }}
                    icon={iconermitra}
                  >
                    <Tooltip>
                      Nama Mitra : {a?.nama?.nama} <br />
                      <h6>{a?.nama?.usahas[0]?.alamat}</h6>
                      <br />
                    </Tooltip>
                  </Marker>
                );
              })}

            {list &&
              list?.map((a, i) => {
                //  color = '#0DEAD0'
                //  svg = '<svg height="10" width="10"><circle cx="5" cy="5" r="4" fill="' + color + '" /></svg>';
                const color =  warna?.data?.data?.data?.[i]?.warna;

                return a?.anggota?.map((s, d) => {
                  const svg = `<svg width="${ukuranmarker}" height="${ukuranmarker}"><rect width="${ukuranmarker}" height="${ukuranmarker}" fill=${color} fill-opacity="0.6" /></svg>`;
                  const iconer = L.divIcon({ html: svg, iconSize: [0, 0] });
                  return (
                    <Marker
                      key={d}
                      position={[s.lat || 0, s.long || 0]}
                      eventHandlers={{ click: () => handleSelectAnggota(s) }}
                      icon={iconer}
                    >
                      <Tooltip>
                        Nama : {s?.nama} <br />
                        Alamat : {s?.alamat} <br />
                        Berat : {s?.totalBerat} KG <br />
                      </Tooltip>
                    </Marker>
                  );
                });
              })}
          </MapContainer>
            {/* <Box 
              sx={{
                marginTop:"1em",
                bgcolor: 'grey.900',
                color:"#FFF",
                border: '1px solid',
                borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
              }}
            >
              <h4>Daftar Mitra GESN ({list.length})</h4>
              {warna && list &&
                list?.map((a, i) => {
                  return (
                    <Card style={{ color: warna?.data?.data?.data?.[i]?.warna }} key={i}>
                    {a?.nama?.usahas?.[0]?.namaUsaha  }
                    </Card>
                  );
                })}
            </Box> */}
            <div>
              
            <h4>Daftar Mitra GESN ({list.length})</h4>
            </div>
             <Box 
              sx={{
                marginTop:"1em",
                padding:"1em",
                bgcolor: '#F5F5F5',
                color:"#000",
                border: '1px solid',
                mb: 2,
                display: "flex",
                flexDirection: "column",
                height: 200,
                overflow: "hidden",
                overflowY: "scroll",
                borderColor: (theme) => (theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300'),
              }}
            >
              
              <Grid container spacing={4}>
                {warna && list &&
                  list?.map((a, i) => {
                    return (
                      <Grid item xs={3} md={4} style={{ color: warna?.data?.data?.data?.[i]?.warna , fontSize:"12px" }} key={i}>
                      {a?.nama?.usahas?.[0]?.namaUsaha  }
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
        </Container>
       
        <Drawer
          anchor="right"
          PaperProps={{
            sx: {
              width: 900,
              overflow: 'auto',
              height: '100%',
            },
          }}
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
        >
          <List>
            <DetailAnggota anggota={anggota} />
          </List>
        </Drawer>
      
      </>
    );
  };
  if (type === 'component') {
    return <MapComponent />;
  }
  return (
    <>
      <Page title="Dashboard Peta Sebaran">
        <MapComponent />
      </Page>
    </>
  );
}
