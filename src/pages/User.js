// material
import { Avatar, Button, Card, Container, Stack, TableCell, TableRow, Typography } from '@mui/material';
import { sentenceCase } from 'change-case';
import { filter } from 'lodash';
import { Link as RouterLink } from 'react-router-dom';
import Iconify from '../components/Iconify';
import Label from '../components/Label';
// components
import Page from '../components/Page';
import useTable from '../hooks/useTable/index';
import { UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'isVerified', label: 'Verified', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
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
          <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
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
                      <UserMoreMenu />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
      </Container>
    </Page>
  );
}
