import { Button, Container, Drawer, Stack, Typography } from '@mui/material';
import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Tooltip } from 'react-leaflet';
import { useQuery, useQueryClient } from 'react-query';
import { GET_ALL_ANGGOTA, GET_ALL_ANGGOTA_BY_WILAYAH } from '../../api/dashboard';
import { GET_ALL_PROVINSI, GET_KABUPATEN, GET_KECAMATAN } from '../../api/wilayah';
import AutoCompleteLoading from '../../components/AutoCompleteLoading';
import Page from '../../components/Page';
import DetailAnggota from './DetailAnggota';
// import { jakartaBarat } from '../../kml/jakarta/barat';
// import { jakartaSelatan } from '../../kml/jakarta/selatan';
// import { jakartaTimur } from '../../kml/jakarta/timur';
// import { jakartaPusat } from '../../kml/jakarta/pusat';

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
export default function PetaSebaran() {
  const [loading, setLoading] = useState(false);
  const [loadingG, setLoadingG] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [provinsi, setProvinsi] = useState();
  const [provinsiS, setProvinsiS] = useState(null);
  const [kabupatenS, setKabupatenS] = useState(null);
  const [kabupaten, setKabupaten] = useState();
  const [kecamatanS, setKecamatanS] = useState(null);
  const [list, setList] = useState([]);
  const [kecamatan, setKecamatan] = useState();
  const [anggota, setAnggota] = useState(null);

  const queryClient = useQueryClient();
  async function getAllAnggota() {
    setLoadingG(true);
    const data = await queryClient.fetchQuery('GET_ALL_ANGGOTA_DAHSBOARD', GET_ALL_ANGGOTA);
    if (data.status === 200) {
      setList(data.data.data);
    }
    setLoadingG(false);
  }
  async function getAllAnggotaWilayah(v) {
    setLoadingG(true);
    const data = await queryClient.fetchQuery(['GET_ALL_ANGGOTA_BY_WILAYAH', v], () => GET_ALL_ANGGOTA_BY_WILAYAH(v));
    if (data.status === 200) {
      setList(data.data.data);
    }
    setLoadingG(false);
  }
  async function getPro() {
    setLoading(true);
    const data = await queryClient.fetchQuery('GET_ALL_PROVINSI', GET_ALL_PROVINSI);
    if (data.status === 200) {
      setProvinsi(setOption(data.data.data));
    }
    setLoading(false);
  }
  async function getKab(id) {
    setLoading(true);
    const data = await queryClient.fetchQuery(['GET_KABUPATEN', id], () => GET_KABUPATEN(id));
    if (data.status === 200) {
      setKabupaten(setOption(data.data.data));
    }
    setLoading(false);
  }
  async function getKec(id) {
    setLoading(true);
    const data = await queryClient.fetchQuery(['GET_KECAMATAN', id], () => GET_KECAMATAN(id));
    if (data.status === 200) {
      setKecamatan(setOption(data.data.data));
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
    getAllAnggotaWilayah(v);
  };
  const handleReset = () => {
    setKabupaten();
    setKecamatan();
    setKecamatanS(null);
    setKabupatenS(null);
    setProvinsiS(null);
    getAllAnggota();
  };
  const handleSelectAnggota = (a) => {
    setAnggota(a);
    setDrawerOpen(true);
  };
  useEffect(() => {
    getPro();
    getAllAnggota();
  }, []);
  return (
    <Page title="Dashboard Peta Sebaran">
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
        <Typography variant="caption">
          Result : {loadingG ? 'loading... ' : `${list && list.length} anggota`}{' '}
        </Typography>
        {/* <Button onClick={() => setDrawerOpen(true)} size="small" variant="text" color="info">
          Lihat transaksi
        </Button> */}
        <MapContainer style={{ height: '746px', width: '100%' }} center={center} zoom={2} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {list &&
            list.map((a, i) => (
              <Marker
                key={i}
                position={[a.lat, a.long]}
                eventHandlers={{ click: () => handleSelectAnggota(a) }}
                icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
              >
                <Tooltip>
                  Nama : {a.nama} <br />
                  Alamat : {a.alamat} <br />
                </Tooltip>
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
        <DetailAnggota anggota={anggota} />
      </Drawer>
    </Page>
  );
}
