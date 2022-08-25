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
import menuAnggota from '../../assets/illustation/menu-anggota.png';
import menuBeli from '../../assets/illustation/menu-beli-sampah.png';
import menuJual from '../../assets/illustation/menu-jual-sampah.png';
import menuMasalah from '../../assets/illustation/menu-masalah.png';
import menuAlat from '../../assets/illustation/recyle.png';
import adupi from '../../assets/logo/logo.png';
import support from '../../assets/illustation/support.png';
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
          <AppBar style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15,background: '#94C0E9' }} position="static">
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: 10, marginTop: 10 }}>
              <img alt="adupi logo" width={50} src={adupi} style={{ marginRight: 2 }} />
              <Typography
                variant="caption"
                style={{
                  fontWeight: 'bold',
                  wordWrap: 'break-word',
                  width: 120,
                  borderLeft: '2px solid #fff',
                  paddingLeft: 5,
                }}
              >
                Gerakan {'\n'} Ekonomi {'\n'} Sirkular
              </Typography>
            </div>
            <Toolbar>
              <IconButton size="large" edge="start" color="inherit" aria-label="menu">
                <AccountCircleIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Hai, {self?.nama}
              </Typography>
              <Typography style={{ wordWrap: 'break-word', width: 200, textAlign: 'right' }}>{self?.alamat}</Typography>
              <LocationOnIcon />
            </Toolbar>
          </AppBar>
          <Box sx={{ padding: 3 }}>
            <Typography variant="h3">Selamat Datang,</Typography>
            <Typography variant="h3">{self?.nama}</Typography>
            <Typography>Selamat bergabung sebagai mitra</Typography>
            <br />
            {!self?.gudang && (
              <Button color="error" variant="contained">
                Lengkapi Pendaftaran
              </Button>
            )}
          </Box>
          <Grid sx={{ padding: 3 }} container spacing={2}>
            {menuList.map((m, i) => (
              <Grid onClick={() => navigate(m.link)} key={i} item xs={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardContent
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 15 }}
                  >
                    <img alt={`menu-${i}`} style={{ width: '100%' }} src={m.icon} />
                    <Typography variant="h4">{m.title}</Typography>
                    <Typography variant="caption">{m.desc}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid onClick={() => {
                  var url = "whatsapp://send?phone=62895640035735";
                  window.location.href = url;
                  }} key={8} item xs={6}>
                <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <CardContent
                    style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 15 }}
                  >
                    <img alt={`menu-wa`} style={{ width: '100%' }} src={support} />
                    <Typography variant="h4">Support</Typography>
                    <Typography variant="caption">Whatsapp Link</Typography>
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
