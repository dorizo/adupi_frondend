import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_MITRA_ALL_BY_SU_YES } from '../../../api/mitra';
import { GET_ALL_PEMBELI } from '../../../api/pembeli';
import { GET_PENJUALAN_MITRA_PERBULAN_PABRIK } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function PenjualanPerMitraPerbulanPabrik() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [mitraCode, setMitraCode] = useState(null);
  const [pembeliCode, setPembeliCode] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    setMitraCode(null);
    setPembeliCode(null);
  };
  const handleFilter = () => {
    refetch(tahun?.value, pembeliCode?.value, mitraCode?.value);
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GET_PENJUALAN_MITRA_PERBULAN_PABRIK', tahun?.value], () =>
    GET_PENJUALAN_MITRA_PERBULAN_PABRIK(tahun?.value, pembeliCode?.value, mitraCode?.value)
  );
  const { data: mitraData } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
  const { data: pembeliData } = useQuery('GET_ALL_PEMBELI', () => GET_ALL_PEMBELI(null));

  const listMitra = mitraData && mitraData?.data?.data;
  const listPembeli = pembeliData && pembeliData?.data?.data;

  const mitraOption =
    listMitra &&
    listMitra?.map((m) => {
      const option = { value: m.mitraCode, title: m.nama };
      return option;
    });

  const pembeliOption =
    listPembeli &&
    listPembeli?.map((m) => {
      const option = { value: m.pembeliCode, title: m.pembeli };
      return option;
    });

  const list = data && data?.data?.data;
  const seriesData =
    !isLoading &&
    list &&
    list?.map((v) => {
      const chartData = [...Array(12)].map(() => 0);
      chartData[v.bulan - 1] = v.berat;
      const s = {
        name: v.nama,
        data: chartData,
      };
      return s;
    });
  const state = {
    series: seriesData,
    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'straight',
      },
      title: {
        text: 'Penjualan Per Mitra Perbulan Per Pabrik',
        align: 'left',
      },
      grid: {
        row: {
          colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
          opacity: 0.5,
        },
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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter
      </Button>

      <ReactApexChart options={state.options} series={state.series} type="bar" height={350} />
      <Typography variant="caption">*Tahun : {tahun?.title}</Typography>
      {pembeliCode && <Typography variant="caption">, Pemebeli : {pembeliCode.title}</Typography>}

      {mitraCode && <Typography variant="caption">, Mitra : {mitraCode.title}</Typography>}

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
            label="Mitra"
            options={mitraOption}
            loading={loading}
            value={mitraCode}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setMitraCode(newVal)}
          />
          <AutoCompleteLoading
            label="Pembeli"
            options={pembeliOption}
            loading={loading}
            value={pembeliCode}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setPembeliCode(newVal)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReset} autoFocus>
            Reset
          </Button>
          <Button onClick={handleFilter} autoFocus>
            Filter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
