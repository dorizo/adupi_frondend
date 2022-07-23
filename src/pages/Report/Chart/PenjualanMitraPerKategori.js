import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_ALL_KATEGORI_SAMPAH } from '../../../api/kategori_sampah';
import { GET_PENJUALAN_SEMUA_MITRA_PERKATEGORI } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function PenjualanMitraPerKategori() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [ksCode, setKsCode] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    setKsCode(null);
  };
  const handleFilter = () => {
    refetch(ksCode?.value);
    setOpen(false);
  };

  const { data, isLoading, refetch } = useQuery(['GET_PENJUALAN_SEMUA_MITRA_PERKATEGORI', ksCode?.value], () =>
    GET_PENJUALAN_SEMUA_MITRA_PERKATEGORI(ksCode?.value)
  );
  const { data: jsData } = useQuery('GET_ALL_KATEGORI_SAMPAH', GET_ALL_KATEGORI_SAMPAH);
  const listJS = jsData && jsData?.data?.data;
  const jsOption =
    listJS &&
    listJS?.map((m) => {
      const option = { value: m?.ksCode, title: m?.kategori };
      return option;
    });

  const list = data && data?.data?.data;
  const series = (list && list?.map((d) => d.jumlah)) || [];
  const labels = (list && list?.map((d) => d.kategori)) || [];
  const state = {
    series,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels,
      title: {
        text: `Jumlah Penjualan per kategori `,
      },
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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter
      </Button>

      <ReactApexChart options={state.options} series={state.series} type="pie" height={360} />
      <Typography variant="caption">*Jenis : {ksCode ? ksCode.title : 'all'}</Typography>
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
            label="Kategori"
            options={jsOption}
            loading={loading}
            value={ksCode}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setKsCode(newVal)}
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
