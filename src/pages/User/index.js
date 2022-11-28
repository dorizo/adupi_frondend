import { Button, Card, Container, Stack, TableCell, TableRow } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import * as React from 'react';
import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router';
import Label from '../../components/Label';
import { ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER } from '../../api/user';
import DialogConfirm from '../../components/DialogConfirm';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import Action from './Action';
import DialogComponent from './DialogComponent';

const headCells = [
  //   {
  //     id: 'name',
  //     numeric: false,
  //     disablePadding: true,
  //     label: 'Nama',
  //   },
  {
    id: 'email',
    numeric: false,
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'status',
    numeric: false,
    disablePadding: true,
    label: 'Status',
  },
  {
    id: 'Role',
    numeric: false,
    disablePadding: true,
    label: 'Role',
  },
  {
    id: 'NamaMitra',
    numeric: false,
    disablePadding: true,
    label: 'Nama Mitra',
  },
  {
    id: 'active',
    numeric: false,
    disablePadding: true,
    label: 'Active',
  },
];

export default function Index() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [alertText, setAlertText] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [itemSelected, setItemSelected] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useQuery('GET_USERS', GET_USERS);

  const { enqueueSnackbar } = useSnackbar();

  const rows = data && data?.data?.data;
  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });
  // HANDLE ACTION
  const handleActionOpen = (event, item) => {
    setItemSelected(item);
    setAnchorEl(event.currentTarget);
  };
  const handleActionClose = () => {
    setItemSelected(null);
    setAnchorEl(null);
  };
  // HANDLE MODAL
  const handleEdit = () => {
    setDialogOpen(true);
  };
  const handleDetail = () => {
    navigate(`/dashboard/user/detail/${itemSelected.userCode}`);
  };
  // HANDLE ALERT
  const handleAlertOpen = (text) => {
    setAlertText(text);
    setAlertOpen(true);
  };
  const handleAlertClose = () => {
    setAlertText('');
    setAlertOpen(false);
  };

  const deleteMutation = useMutation((params) => DELETE_USER(params.id), {
    onSuccess: async (res) => {
      const variant = res.status === 200 ? 'success' : 'warning';
      await enqueueSnackbar(res.data.message, { variant });
      await refetch();
      handleActionClose();
      handleAlertClose();
      setItemSelected(null);
    },
    onError: async (e) => {
      await enqueueSnackbar(e.message, 'error');
    },
  });
  // HANDLE ACTION
  const onAdd = async (data, callbackSetError) => {
    setLoading(true);
    const response = await ADD_USER(data);
    if (response.status === 400) {
      callbackSetError(response.data.error.form);
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
    if (response.status === 500) {
      await enqueueSnackbar('Internal server error', 'error');
    }
    await setLoading(false);
  };
  const onUpdate = async (data, id, callbackSetError) => {
    setLoading(true);
    const response = await UPDATE_USER(data, id);
    if (response.data.status === 400) {
      callbackSetError(response.data.error.form);
    }
    if (response.data.status === 200) {
      await refetch();
      await enqueueSnackbar(response.data.message, { variant: 'success' });
      handleActionClose();
      setDialogOpen(false);
      setItemSelected(null);
    }
    await setLoading(false);
  };
  const onDelete = async () => {
    deleteMutation.mutate({ id: itemSelected.userCode });
  };
  const handleConfirm = async () => {
    await onDelete();
  };

  const actionOpen = Boolean(anchorEl);
  const processing = loading || deleteMutation.isLoading || isLoading;
  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Role
          </Typography>

          <Button onClick={() => setDialogOpen(true)} variant="contained">
            Tambah
          </Button>
        </Stack>
        <Card>
          {list &&
            TableComponent(
              list.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    label={labelId}
                    onClick={(event) => handleActionOpen(event, row)}
                    hover
                    tabIndex={-1}
                    key={index}
                  >
                    <TableCell>{row.no}</TableCell>
                    {/* <TableCell component="th" id={labelId} scope="row" padding="none">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ margin: 1 }} alt={row.name} src={row.photo} />
                        {row.name}
                      </div>
                    </TableCell> */}
                    <TableCell>{row?.email}</TableCell>
                    <TableCell>{row?.status}</TableCell>
                    <TableCell>{row?.role}</TableCell>
                    <TableCell>{row?.userdata}</TableCell>
                    <TableCell align="left">
                      <Label variant="ghost" color={row.isActive ? 'success' : 'error'}>
                        {row.isActive ? 'Active' : 'InActive'}
                      </Label>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
      </Container>
      {dialogOpen && (
        <DialogComponent
          processing={processing}
          onAdd={onAdd}
          onUpdate={onUpdate}
          onClose={() => setDialogOpen(false)}
          item={itemSelected}
          open={dialogOpen}
        />
      )}
      {actionOpen && (
        <Action
          actionOpen={actionOpen}
          handleEdit={handleEdit}
          handleDetail={handleDetail}
          handelDelete={() => handleAlertOpen('Apakah yakin mau delete')}
          anchorEl={anchorEl}
          actionClose={handleActionClose}
        />
      )}
      {alertOpen && (
        <DialogConfirm
          processing={processing}
          alertClose={handleAlertClose}
          alertOpen={alertOpen}
          handleConfirm={handleConfirm}
          text={alertText}
        />
      )}
    </Page>
  );
}
