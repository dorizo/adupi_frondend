import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_MITRA_ALL_BY_SU_YES } from '../../../api/mitra';
import { GET_PEMBELIAN_MITRA_PERBULAN, GET_PEMBELIAN_MITRA_PERBULANLINE } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function PembelianPerMitraPerbulanline({ type = 'line' }) {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [mitraCode, setMitraCode] = useState(null);
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
  };
  const handleFilter = () => {
    refetch(tahun?.value, mitraCode?.value);
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GET_PEMBELIAN_MITRA_PERBULANLINE', tahun?.value], () =>
    GET_PEMBELIAN_MITRA_PERBULANLINE(tahun?.value, mitraCode?.value)
  );
  const { data: mitraData } = useQuery('GET_MITRA_ALL_BY_SU_YES', GET_MITRA_ALL_BY_SU_YES);
  const listMitra = mitraData && mitraData?.data?.data;
  const mitraOption =
    listMitra &&
    listMitra?.map((m) => {
      const option = { value: m.mitraCode, title: m.nama };
      return option;
    });

    // console.log();
  let state = null;
  if (type === 'line') {
    // const list = data && data?.data?.data;
    // const seriesData =
    //   !isLoading &&
    //   list &&
    //   list?.map((v) => {
    //     const chartData = [...Array(12)].map(() => 0);
    //     chartData[v.bulan - 1] = v.berat / 1000;
        
    //     console.log(v.bulan);
    //   console.log(v);
    //     const s = {
    //       name: v.nama,
    //       data: chartData,
    //     };
    //     return s;
    //   });
    //   console.log(seriesData);
    state = {
      series:!isLoading && data?.data?.data,
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
          text: 'total pembelian per bulan permitra dalam setahun (dalam ton)',
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
  } else {
    const list = data && data?.data?.data;
    const series = (list && list?.map((d) => d.jumlah)) || [];
    const labels = (list && list?.map((d) => d.nama)) || [];
    state = {
      series,
      options: {
        chart: {
          width: 380,
          type: 'pie',
        },
        title: {
          text: `% Pembelian per mitra (dalam setahun) `,
        },
        labels,
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: 'bottom',
              },
            },
          },
        ],
      },
    };
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filters
      </Button>

      <ReactApexChart options={state.options} series={state.series} type={type} height={350} />
      <Typography variant="caption">*Tahun : {tahun?.title}</Typography>
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
