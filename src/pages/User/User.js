// material
import { Avatar, Button, Card, Container, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import Label from '../../components/Label';
// components
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import { UserMoreMenu } from '../../sections/@dashboard/user';
// mock
import USERLIST from '../../_mock/user';
import Action from './Action';
import DialogComponent from './DialogComponent';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export default function User() {
  const [openDialog, setOpenDialog] = useState(false);
  const { TableComponent, list } = useTable({
    header: TABLE_HEAD,
    rows: USERLIST,
    loading: false,
  });

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            onClick={() => setOpenDialog(true)}
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            New User
          </Button>
        </Stack>
        <Card>
          {list &&
            TableComponent(
              list.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ margin: 1 }} alt={row.name} src={row.avatarUrl} />
                        {row.name}
                      </div>
                    </TableCell>
                    <TableCell>{row.company}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell align="left">{row.isVerified ? 'Yes' : 'No'}</TableCell>
                    <TableCell align="left">
                      <Label variant="ghost" color={(row.status === 'banned' && 'error') || 'success'}>
                        {sentenceCase(row.status)}
                      </Label>
                    </TableCell>
                    <TableCell align="right">
                      <Action />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
      </Container>
      <DialogComponent open={openDialog} onClose={() => setOpenDialog(false)} />
    </Page>
  );
}
