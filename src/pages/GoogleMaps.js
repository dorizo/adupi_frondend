import { Box, Button, Card, CardContent, CardHeader, Container, Drawer, Stack, Typography } from '@mui/material';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useQueryClient } from 'react-query';
import { GET_ALL_PROVINSI, GET_KABUPATEN, GET_KECAMATAN } from '../api/wilayah';
import AutoCompleteLoading from '../components/AutoCompleteLoading';
import Page from '../components/Page';
// import { jakartaBarat } from '../kml/jakarta/barat';
// import { jakartaSelatan } from '../kml/jakarta/selatan';
// import { jakartaTimur } from '../kml/jakarta/timur';
// import { jakartaPusat } from '../kml/jakarta/pusat';

const center = [-6.258752, 106.6201363];

const dummyAnggota = [
  {
    name: 'Lancelot',
    lat: '-6.258752',
    lng: '106.6201363',
  },
  {
    name: 'Brodi',
    lat: '-6.250603',
    lng: '106.651325',
  },
  {
    name: 'Balmon',
    lat: '-6.246945',
    lng: '106.644823',
  },
];

const setOption = (data) => {
  const list =
    data &&
    data.map((p) => {
      return { value: p.wilayahCode, title: p.wilayah };
    });
  return list;
};
export default function GoogleMaps() {
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [provinsi, setProvinsi] = useState();
  const [provinsiS, setProvinsiS] = useState(null);
  const [kabupatenS, setKabupatenS] = useState(null);
  const [kabupaten, setKabupaten] = useState();
  const [kecamatanS, setKecamatanS] = useState(null);
  const [kecamatan, setKecamatan] = useState();

  const queryClient = useQueryClient();
  async function getPro() {
    setLoading(true);
    const data = await queryClient.fetchQuery('GET_ALL_PROVINSI', GET_ALL_PROVINSI);
    if (data.status === 200) {
      setProvinsi(setOption(data?.data?.data));
    }
    setLoading(false);
  }
  async function getKab(id) {
    setLoading(true);
    const data = await queryClient.fetchQuery(['GET_KABUPATEN', id], () => GET_KABUPATEN(id));
    if (data.status === 200) {
      setKabupaten(setOption(data?.data?.data));
    }
    setLoading(false);
  }
  async function getKec(id) {
    setLoading(true);
    const data = await queryClient.fetchQuery(['GET_KECAMATAN', id], () => GET_KECAMATAN(id));
    if (data.status === 200) {
      setKecamatan(setOption(data?.data?.data));
    }
    setLoading(false);
  }

  const handleChangeProvinsi = (_, v) => {
    setProvinsiS(v);
    getKab(v.value);
  };
  const handleChangeKabupaten = (_, v) => {
    setKabupatenS(v);
    getKec(v.value);
  };
  const handleChangeKecamatan = (_, v) => {
    setKecamatanS(v);
  };
  const handleReset = () => {
    setKabupaten();
    setKecamatan();
    setKecamatanS(null);
    setKabupatenS(null);
    setProvinsiS(null);
  };
  useEffect(() => {
    getPro();
  }, []);
  return (
    <Page title="Peta Sebaran">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Peta Sebaran Anggota
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography gutterBottom>Filter by kecamatan</Typography>
        </Stack>

        <Stack direction="row" alignItems="center" spacing={3} justifyContent="space-between" mb={5}>
          <AutoCompleteLoading
            onChange={handleChangeProvinsi}
            value={provinsiS}
            options={provinsi}
            loading={loading}
            label="Provinsi"
          />
          <AutoCompleteLoading
            onChange={handleChangeKabupaten}
            options={kabupaten}
            value={kabupatenS}
            loading={loading}
            label="Kabupaten"
          />
          <AutoCompleteLoading
            onChange={handleChangeKecamatan}
            options={kecamatan}
            value={kecamatanS}
            loading={loading}
            label="Kecamatan"
          />
          <Button onClick={handleReset} variant="outlined" color="info">
            Reset
          </Button>
        </Stack>
        <Button onClick={() => setDrawerOpen(true)} variant="outlined" color="info">
          Lihat data
        </Button>
        <MapContainer style={{ height: '746px', width: '100%' }} center={center} zoom={10} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {dummyAnggota.map((a, i) => (
            <Marker
              key={i}
              position={[a.lat, a.lng]}
              eventHandlers={{ click: () => setDrawerOpen(true) }}
              icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
            >
              <Tooltip>{a.name}</Tooltip>
            </Marker>
          ))}
        </MapContainer>
      </Container>
      <Drawer
        anchor="right"
        PaperProps={{
          sx: { width: 900 },
        }}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Card>
          <CardHeader title={'Nama'} subheader={'nik'} />
          <CardContent style={{ paddingTop: 5 }}>
            <Stack direction="row" justifyContent="space-between" mb={1}>
              <div>
                {[
                  { title: 'Jenis Kelamin', key: 'jenisKelamin' },
                  { title: 'Tempat Lahir', key: 'tempatLahir' },
                  { title: 'Tanggal Lahir', key: 'tanggalLahir' },
                  { title: 'No HP', key: 'noHp' },
                  { title: 'Alamat', key: 'alamat' },
                ].map((item, i) => (
                  <Box key={i} sx={{ display: 'flex' }}>
                    <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                      {item.title}
                    </Typography>
                    <Typography variant="caption">{`  :  ${item.key}`}</Typography>
                  </Box>
                ))}
              </div>
              <img
                width={200}
                src="https://assets.pikiran-rakyat.com/crop/85x0:725x439/x/photo/2021/10/07/472467860.jpg"
                alt="ktp-img"
              />
            </Stack>
          </CardContent>
        </Card>
      </Drawer>
    </Page>
  );
}
