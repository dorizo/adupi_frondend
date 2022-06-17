import { Card, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useQuery } from 'react-query';
import { GET_NV_ANGGOTA_BY_MITRA_ID, GET_VERIVY_ANGGOTA_BY_MITRA_ID, VERIFIKASI_ANGGOTA } from '../../api/anggota';
import useTable from '../../hooks/useTable/index';
import { fDateTime } from '../../utils/formatTime';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
  {
    id: 'nama',
    numeric: false,
    disablePadding: true,
    label: 'Nama',
  },
  {
    id: 'nik',
    numeric: false,
    disablePadding: true,
    label: 'NIK',
  },
  {
    id: 'jenisKelamin',
    numeric: false,
    disablePadding: true,
    label: 'Jenis Kelamin',
  },
  {
    id: 'location',
    numeric: false,
    disablePadding: true,
    label: 'Location',
  },

  {
    id: 'alamat',
    numeric: false,
    disablePadding: true,
    label: 'Alamat',
  },
  {
    id: 'createAt',
    numeric: false,
    disablePadding: true,
    label: 'Create',
  },
];

export default function ListAnggota({ mitraCode, type = 'no' }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSelected] = React.useState(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const { data, isLoading, refetch } = useQuery(
    [type === 'no' ? 'GET_NV_ANGGOTA_BY_MITRA_ID' : 'GET_VERIFY_ANGGOTA_BY_MITRA_ID', mitraCode],
    () => (type === 'no' ? GET_NV_ANGGOTA_BY_MITRA_ID(mitraCode) : GET_VERIVY_ANGGOTA_BY_MITRA_ID(mitraCode))
  );
  const rows = data && data?.data?.data;

  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });
  const handleActionOpen = (event, item) => {
    setItemSelected(item);
    setAnchorEl(event.currentTarget);
  };
  const handleDetail = () => {
    setDialogOpen(true);
  };
  const handleVerifikasi = async (values) => {
    console.log(values, itemSelected?.anggotaCode);
    setLoading(true);
    const response = await VERIFIKASI_ANGGOTA(values, itemSelected?.anggotaCode);
    if (response.status === 400) {
      enqueueSnackbar(response.data.message, { variant: 'warning' });
    }
    if (response.status === 422) {
      const asdf = response.data.errors;
      const keys = asdf && Object.keys(asdf);
      keys.forEach((key) => {
        enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
      });
    }
    if (response.status === 200) {
      await refetch();
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      setDialogOpen(false);
      handleActionClose();
    }
    await setLoading(false);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  const actionOpen = Boolean(anchorEl);
  return (
    <>
      <Card>
        {list &&
          TableComponent(
            list.map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              return (
                <TableRow onClick={(event) => handleActionOpen(event, row)} hover tabIndex={-1} key={index}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.nama}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.nik}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.jenisKelamin}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {`Lat : ${row.lat}`} <br />
                    {`Lng : ${row.long}`}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.alamat}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {fDateTime(row.createAt)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
      </Card>
      {
        <Action
          type={type}
          actionOpen={actionOpen}
          handleDetail={handleDetail}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
        />
      }
      {dialogOpen && (
        <DialogComponent
          processing={loading}
          handleVerifikasi={handleVerifikasi}
          onClose={() => setDialogOpen(false)}
          item={itemSelected}
          open={dialogOpen}
        />
      )}
    </>
  );
}
