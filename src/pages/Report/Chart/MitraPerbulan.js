import { Button, Dialog, DialogActions, Typography, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_ALL_PROVINSI, GET_KABUPATEN } from '../../../api/wilayah';
import { GET_JUMLAH_MITRA_PERBULAN_KAB } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function MitraPerbulan() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [provinsi, setProvinsi] = useState();
  const [provinsiS, setProvinsiS] = useState({ value: '31', title: 'DKI JAKARTA' });
  const [kabupatenS, setKabupatenS] = useState({ title: 'KOTA ADM. JAKARTA PUSAT', value: '31.71' });
  const [kabupaten, setKabupaten] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function getPro() {
    setLoading(true);
    GET_ALL_PROVINSI()
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            return { value: p.wilayahCode, title: p.wilayah };
          });
        if (provinsiS) {
          getKab(provinsiS);
        }
        setProvinsi(list);
      })
      .catch((e) => {
        setProvinsi();
        console.log(e);
      });
    setLoading(false);
  }
  async function getKab(id) {
    setLoading(true);
    GET_KABUPATEN(id)
      .then((res) => {
        const list =
          res &&
          res.data?.data?.map((p) => {
            return { value: p.wilayahCode, title: p.wilayah };
          });
        setKabupaten(list);
      })
      .catch((e) => {
        setKabupaten();
        console.log(e);
      });
    setLoading(false);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFilter = () => {
    refetch(tahun?.value, kabupatenS?.value);
    setOpen(false);
  };
  const handleChangeProvinsi = (_, v) => {
    setProvinsiS(v);
    getKab(v.value);
  };
  const handleChangeKabupaten = (_, v) => {
    setKabupatenS(v);
  };
  const { data, isLoading, refetch } = useQuery(
    ['GET_JUMLAH_MITRA_PERBULAN_KAB', tahun?.value, kabupatenS?.value],
    () => GET_JUMLAH_MITRA_PERBULAN_KAB(tahun?.value, kabupatenS?.value)
  );
  const list = data && data?.data?.data;
  const chartData = [...Array(12)].map(() => 0);
  if (!isLoading) {
    list?.forEach((v) => {
      chartData[v.bulan - 1] = v.jumlah;
    });
  }
  const state = {
    series: [
      {
        name: 'Mitra',
        data: chartData,
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      title: {
        text: `Jumlah Mitra Perbulan `,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },

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
  useEffect(() => {
    getPro();
  }, []);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter
      </Button>

      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      <Typography variant="caption">
        *Tahun : {tahun?.title} , Kab : {kabupatenS.title}
      </Typography>
      {kabupatenS && <Typography variant="caption">, Kab : {kabupatenS.title}</Typography>}
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Filter Chart</DialogTitle>
        <DialogContent>
          <AutoCompleteLoading
            label="Tahun"
            options={yearOption}
            loading={loading}
            value={tahun}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setTahun(newVal)}
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFilter} autoFocus>
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
