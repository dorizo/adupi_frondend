import { Card, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useQuery } from 'react-query';
import { VERIFIKASI_ANGGOTA } from '../../api/anggota';
import { GET_ALL_MASALAH_BY_MITRA } from '../../api/masalah';
import Image from '../../components/Image';
import Label from '../../components/Label';
import useTable from '../../hooks/useTable/index';
import { fDateTime } from '../../utils/formatTime';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
  {
    id: 'jenisMasalah',
    numeric: false,
    disablePadding: true,
    label: 'Jenis Masalah',
  },
  {
    id: 'deskripsi',
    numeric: false,
    disablePadding: true,
    label: 'Deskripsi',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'foto',
    numeric: false,
    disablePadding: true,
    label: 'Foto',
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

  const { data, isLoading, refetch } = useQuery(['GET_ALL_MASALAH_BY_MITRA', mitraCode], () =>
    GET_ALL_MASALAH_BY_MITRA(mitraCode)
  );
  const rows = data && data?.data?.data;

  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });
  const handleActionOpen = (event, item) => {
    if (type === 'no') {
      setItemSelected(item);
      setAnchorEl(event.currentTarget);
    }
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
                <TableRow hover tabIndex={-1} key={index}>
                  <TableCell>{row.no}</TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.jenisMasalah}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {row.deskripsi}
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    <Label variant="ghost" color={row.status === 'Selesai' ? 'success' : 'error'}>
                      {row.status}
                    </Label>
                  </TableCell>

                  <TableCell id={labelId} scope="row">
                    <Image src={row.foto} folder="masalah" style={{ width: 60 }} alt={`img-masalah-${index}`} />
                  </TableCell>
                  <TableCell id={labelId} scope="row">
                    {fDateTime(row.createAt)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
      </Card>
      {actionOpen && type === 'no' && (
        <Action
          actionOpen={actionOpen}
          handleDetail={handleDetail}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
        />
      )}
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
