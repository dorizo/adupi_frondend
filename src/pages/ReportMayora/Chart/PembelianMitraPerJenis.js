import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useQuery } from 'react-query';
import { GET_ALL_JENIS_SAMPAH } from '../../../api/jenis_sampah';
import { GET_PEMBELIAN_SEMUA_MITRA_PERJENIS } from '../../../api/report';
import AutoCompleteLoading from '../../../components/AutoCompleteLoading';
import { yearOption } from '../../../utils/yearOption';

const tahunSekarang = new Date().getFullYear();

export default function PembelianMitraPerJenis() {
  const [tahun, setTahun] = useState({ value: tahunSekarang, title: tahunSekarang });
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [jsCode, setJsCode] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    setJsCode(null);
  };
  const handleFilter = () => {
    refetch(jsCode?.value);
    setOpen(false);
  };

  const { data, refetch } = useQuery(['GET_PEMBELIAN_SEMUA_MITRA_PERJENIS', jsCode?.value], () =>
    GET_PEMBELIAN_SEMUA_MITRA_PERJENIS(jsCode?.value)
  );
  const { data: jsData } = useQuery('GET_ALL_JENIS_SAMPAH', GET_ALL_JENIS_SAMPAH);
  const listJS = jsData && jsData?.data?.data;
  const jsOption =
    listJS &&
    listJS?.map((m) => {
      const option = { value: m.jsCode, title: m.jenis };
      return option;
    });

  const list = data && data?.data?.data;
  const series = (list && list?.map((d) => d.jumlah)) || [];
  const labels = (list && list?.map((d) => d.jenis)) || [];
  const state = {
    series,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      title: {
        text: `% Pembelian per jenis (dalam setahun)`,
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

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Filter
      </Button>

      <ReactApexChart options={state.options} series={state.series} type="pie" height={360} />
      <Typography variant="caption">*Jenis : {jsCode ? jsCode.title : 'all'}</Typography>
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
            label="Jenis"
            options={jsOption}
            loading={loading}
            value={jsCode}
            getOptionLabel={(option) => option.title}
            onChange={(_, newVal) => setJsCode(newVal)}
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
