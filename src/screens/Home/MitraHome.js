import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BottomNavigation, BottomNavigationAction, Card, CardContent } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { GET_SELF_MITRA } from '../../api/mitra';
import menuAnggota from '../../assets/illustation/TambahSupplier.svg';
import menuBeli from '../../assets/illustation/pembelian.svg';
import menuJual from '../../assets/illustation/penjualan.svg';
import menuMasalah from '../../assets/illustation/Masalah.svg';
import menuAlat from '../../assets/illustation/Alat.svg';
import gesn from '../../assets/logo/logo.png';
import lemineral from '../../assets/logo/le-minerale.png';
import adupi from '../../assets/logo/adupi.png';
import support from '../../assets/illustation/support.svg';
import Akun from '../Akun';
import Transaksi from '../Transaksi';
import { GET_GETSINGLEMITRA } from 'src/api/target';
import { ribuan } from 'src/utils/formatNumber';

export default function MitraHome() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { data } = useQuery('GET_SELF_MITRA', GET_SELF_MITRA, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const self = data && data?.data?.data;
  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  let fulltgl =  year+'-'+month+'-'+date;
  const userId =self?.mitraCode;

  const {data : dataax } = useQuery(["TARGET",fulltgl,userId] ,() => GET_GETSINGLEMITRA({tanggal:fulltgl , mitraCode:userId}) , {
    // The query will not execute until the userId exists
    enabled: !!userId,
  });

  const menuList = [
    {
      title: 'Pembelian bahan DUP',
      desc: 'Pembelian bahan baku daur ulang ',
      icon: menuBeli,
      link: '/mobile/beli-sampah',
    },
    {
      title: 'Penjualan bahan DUP',
      desc: 'Penjualan bahan baku daur ulang',
      icon: menuJual,
      link: '/mobile/jual-sampah',
    },
    { title: 'Masalah', desc: 'Laporkan Masalah Mesin/Kendaraan', icon: menuMasalah, link: '/mobile/masalah' },
    { title: 'Tambah Supplier', desc: 'Tambah Supplier DUP', icon: menuAnggota, link: '/mobile/anggota' },
    { title: 'Alat', desc: 'Tambah Alat', icon: menuAlat, link: `/mobile/alat` },
  ];

  const linker =() => {
    var newPhone = self?.fasilitator?.alamat.replace(/^0/, '62');
    var url = "whatsapp://send?phone="+newPhone;
    window.location.href = url;
    };
  return (
    <div style={{ paddingBottom: 40 }}>
      {value === 0 && (
        <Box sx={{ flexGrow: 1 }}>
            <Box style={{background: '#35a4ed'  }} position="static">
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
              <img alt="gesn logo" width={80} src={gesn} style={{ marginRight: 2 }} />
              <img alt="adupi logo" width={40} src={adupi} style={{ marginRight: 2 }} />
              <img alt="lemineral logo" width={60} src={lemineral} style={{ marginRight: 2 }} />
            
            </div>
            <Toolbar sx={{color:"#FFFFFF"}}>
             
              <Grid container spacing={2}>
              <Grid key={0} item xs={2}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                    <AccountCircleIcon sx={{fontSize:50}} />
                  </IconButton>
              </Grid>
              <Grid key={1} item xs={5}>
                  <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
                    Hai,<br /> {self?.nama} <br />  
                    {self?.alamat}
                  
                  </Typography>
                  <Typography style={{ wordWrap: 'break-word', width: 100, textAlign: 'right' }}>
                    {' '}
                  </Typography>  
              </Grid>
              <Grid  key={2} item xs={5} >
                <Typography variant="body">Target {dataax?.data?.data?.tanggal}</Typography>
                <Typography variant='body2' style={{fontSize:12}} >{dataax?.data?.data?.total_berat?ribuan(dataax?.data?.data?.total_berat)+"/"+ribuan(dataax?.data?.data?.MitraTargetName):"Target NA"} </Typography>
              </Grid>
            </Grid>

            </Toolbar>
            <Box sx={{ padding: 3,background:"#F5F5F5" , borderStartEndRadius:30 , borderStartStartRadius:30,marginTop:5 }}>
            <Grid container spacing={2}>
              <Grid key={1} item xs={12}>
                <Typography variant="h6">Selamat Datang,</Typography>
                <Typography variant="h6">{self?.nama}</Typography>
                <Typography>Selamat bergabung sebagai mitra</Typography>  
              </Grid>
           
            </Grid>
          </Box>
          </Box>
       
          <Grid sx={{ padding: 3 }} container spacing={2}>
            {menuList.map((m, i) => (
              <Grid onClick={() => navigate(m.link)} key={i} item xs={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardContent
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 15 }}
                  >
                    <img alt={`menu-${i}`} style={{ width: '100%' }} src={m.icon} />
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid onClick={linker} key={8} item xs={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardContent
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 15 }}
                  >
                    <img alt={`menu-wa`} style={{ width: '100%' }} src={support} />
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
          <Transaksi />
        </Box>
      )}
      {value === 1 && <Akun />}
      <BottomNavigation
        sx={{ position: 'fixed', bottom: 0, margin: '0 auto', left: 0, right: 0 }}
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Akunku" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </div>
  );
}
