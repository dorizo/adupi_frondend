import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_ALL_PEMBELI } from '../../../api/pembeli';
import { GET_PENJUALAN_SEMUA_MITRA_PERBULAN_PABRIK } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function PenjualanMitraPerbulanPabrik() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pembeliCode, setPembeliCode] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleReset = () => {
    setPembeliCode(null);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFilter = () => {
    refetch(tahun?.value, pembeliCode?.value);
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GET_PENJUALAN_SEMUA_MITRA_PERBULAN_PABRIK', tahun?.value], () =>
    GET_PENJUALAN_SEMUA_MITRA_PERBULAN_PABRIK(tahun?.value, pembeliCode?.value)
  );
  const { data: pembeliData } = useQuery('GET_ALL_PEMBELI', () => GET_ALL_PEMBELI(null));
  const listPembeli = pembeliData && pembeliData?.data?.data;

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
        name: v.pembeli,
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
        text: 'Penjualan Perbulan Per Pabrik',
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
      {pembeliCode && <Typography variant="caption">, Pembeli : {pembeliCode.title}</Typography>}

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
