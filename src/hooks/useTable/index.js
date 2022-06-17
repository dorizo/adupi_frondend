import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import SearchNotFound from '../../components/SearchNotFound';
import TableHeader from './Head';
import TableToolbar from './Tool';

const useTable = ({ header, rows, loading }) => {
  rows =
    (rows &&
      rows?.map((a, i) => {
        return { ...a, no: i + 1 };
      })) ||
    [];
  const [search, setSearch] = React.useState('');
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

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
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    if (query) {
      const column = array[0] && Object.keys(array[0]);
      return array.filter((a) =>
        column.some((col) => a[col] && a[col].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }
  if (loading) {
    const SkeletonLoad = (
      <>
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            width="100%"
            sx={{ paddingTop: '50px', marginBottom: '20px', borderRadius: 2 }}
          />
        ))}
      </>
    );
    return {
      TableComponent: () => (
        <>
          <TableToolbar value={search} onSearch={handleSearch} />
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <TableHeader header={header} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={header.length + 1}>
                    {SkeletonLoad}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </>
      ),
      list: [],
      search: '',
    };
  }
  const list = rows
    ? stableSort(rows, getComparator(order, orderBy), search).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    : [];
  function TableComponent(children) {
    return (
      <>
        <TableToolbar value={search} onSearch={handleSearch} />
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <TableHeader header={header} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} />
            <TableBody>
              {children}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={header.length + 1} />
                </TableRow>
              )}
              {list.length === 0 && (
                <TableRow>
                  <TableCell align="center" colSpan={header.length + 1} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={search} />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  }
  return {
    TableComponent,
    list,
    search,
  };
};

export default useTable;
