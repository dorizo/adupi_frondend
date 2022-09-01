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

export default function MitraHome() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);
  const { data } = useQuery('GET_SELF_MITRA', GET_SELF_MITRA, {
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
  const self = data && data?.data?.data;
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

  return (
    <div style={{ paddingBottom: 40 }}>
      {value === 0 && (
        <Box sx={{ flexGrow: 1 }}>
            <Box style={{background: '#35a4ed'  }} position="static">
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10 }}>
              <img alt="gesn logo" width={80} src={gesn} style={{ marginRight: 2 }} />
              <img alt="adupi logo" width={40} src={adupi} style={{ marginRight: 2 }} />
              <img alt="lemineral logo" width={40} src={lemineral} style={{ marginRight: 2 }} />
            
            </div>
            <Toolbar sx={{color:"#FFFFFF"}}>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <AccountCircleIcon sx={{fontSize:70}} />
              </IconButton>
              <Typography variant="body" component="div" sx={{ flexGrow: 1 }}>
                Hai,<br /> {self?.nama} <br />  
                {self?.alamat}
              
              </Typography>
              <Typography style={{ wordWrap: 'break-word', width: 100, textAlign: 'right' }}>
                {' '}
              </Typography>
            </Toolbar>
            <Box sx={{ padding: 3,background:"#F5F5F5" , borderStartEndRadius:30 , borderStartStartRadius:30,marginTop:5 }}>
              <Typography variant="h6">Selamat Datang,</Typography>
            <Typography variant="h6">{self?.nama}</Typography>
            <Typography>Selamat bergabung sebagai mitra</Typography>
          </Box>
          </Box>
          {/* <AppBar style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15,background: '#35a4ed' }} position="static">
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
            <img alt="gesn logo" width={80} src={gesn} style={{ marginRight: 2 }} />
              <img alt="adupi logo" width={40} src={adupi} style={{ marginRight: 2 }} />
              <img alt="lemineral logo" width={40} src={lemineral} style={{ marginRight: 2 }} />
          
            </div>
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <AccountCircleIcon  sx={{fontSize:70}} />
              </IconButton>
              <Typography variant="body2" component="div" sx={{ flexGrow: 1 }}>
                Hai, <br /> {self?.nama} <br />   
                {self?.alamat}
              </Typography>
            </Toolbar>
          </AppBar> */}
          {/* <Box sx={{ padding: 3 }}>
            <Typography variant="h3">Selamat Datang,</Typography>
            <br />
            {!self?.gudang && (
              <Button color="error" variant="contained">
                Lengkapi Pendaftaran
              </Button>
            )}
          </Box> */}
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
            <Grid onClick={() => {
                  var url = "whatsapp://send?phone=6281285622115";
                  window.location.href = url;
                  }} key={8} item xs={6}>
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
