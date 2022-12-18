import { AppBar, Button, Card, Container, Dialog, Divider, Grid, IconButton, ImageList, ImageListItem, List, ListItem, ListItemText, Stack, TableCell, TableRow, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { fDateSuffix, fDateTime, fDatetimework } from '../../utils/formatTime';
import { deletekunjunganmitra, GET_ALL_KUNJUNGAN, GET_ALL_KUNJUNGANMITRA } from '../../api/kunjungan';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'src/components/Image';
import { useState } from 'react';
import { GET_viewimagekunjungan } from 'src/api/kunjunganmitra';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';

const headCells = [
  
  {
    id: 'Nama Mitra',
    numeric: false,
    disablePadding: true,
    label: 'NAMA MITRA',
  },
  {
    id: 'Nama Fasilitator',
    numeric: false,
    disablePadding: true,
    label: 'Nama Fasilitator',
  },
  {
    id: 'Tanggal Check In',
    numeric: false,
    disablePadding: true,
    label: 'Tanggal Check In',
  },
  {
    id: 'Capaian',
    numeric: false,
    disablePadding: true,
    label: 'Capaian',
  },
  {
    id: 'rata2 pembelian',
    numeric: false,
    disablePadding: true,
    label: 'rata2 pembelian',
  },
  {
    id: 'pekerjan',
    numeric: false,
    disablePadding: true,
    label: 'Jumlah Pekerja',
  },
  {
    id: 'Pendampingan',
    numeric: false,
    disablePadding: true,
    label: 'pendampingan',
  },
  {
    id: 'detail',
    numeric: false,
    disablePadding: true,
    label: 'mode',
  },
];

export default function Kunjunganmitra() {
  const { data, isLoading,refetch } = useQuery('GET_ALL_KUNJUNGAN', GET_ALL_KUNJUNGANMITRA);
  const [kunjungan , Setkunjungan] = useState(null);
  const [viewimage , Setviewimage] = useState(null);
  const [openmodel , Setopenmodel] = useState(false);
  const handleClose = () => {
    Setopenmodel(false);
  }


  const rubahposisi = async (row) =>  {
    console.log(row);
    Setopenmodel(true);
    Setkunjungan(row);
    let details = await GET_viewimagekunjungan(row.kunjungan_absenCode,'mitra');
    Setviewimage(details?.data?.data);
  
}

const hapusdata = async (row) =>  {
  console.log(row);
  if (confirm("APAKAH ANDA YAKIN AKAN MENGHAPUS DATA") == true) {
    const m = await deletekunjunganmitra({Kunjungan_formCode:row.Kunjungan_formCode , createAt:fDateSuffix(new Date())} );
    console.log(m);
    refetch();
  } else {
   console.log("gagal");
  }

}

const editdata = async (row) =>  {
  console.log(row);

}
  const rows = data && data?.data?.data;

  console.log(rows);

  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });

  return (
    <Page title="Kunjungan Fasilitator">
      <Container>

      <Dialog
            fullScreen
            open={openmodel}
            onClose={handleClose}
          >
            <AppBar sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  Detail Mitra {kunjungan?.nama}
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <List>
              <ListItem button>
                <ListItemText primary="Capaian Mitra" secondary={kunjungan?.Kunjungan_formCapaian} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Harga Pembelian" secondary={kunjungan?.Kunjungan_formHargaPembelian} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Keterlambatan" secondary={kunjungan?.Kunjungan_formKeterlambatan} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="Pekerja" secondary={kunjungan?.Kunjungan_formPekerja} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="pendampingan" secondary={kunjungan?.Kunjungan_formPendampingan} />
              </ListItem>
              {/* <ListItem button>
                <ListItemText primary="NAMA FASILITATOR" secondary={kunjungan?.nama_fasilitator} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="NAMA FASILITATOR" secondary={kunjungan?.nama_fasilitator} />
              </ListItem> */}
              <ListItem button>
                <ListItemText primary="NAMA FASILITATOR" secondary={kunjungan?.nama_fasilitator} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="TANGGAL CHECK IN" secondary={kunjungan?.kunjungan_absen_date?fDatetimework(kunjungan?.kunjungan_absen_date):kunjungan?.kunjungan_absen_date} />
              </ListItem>
              <ListItem button>
                <ListItemText primary="TANGGAL CHECK OUT" secondary={kunjungan?.x?fDatetimework(kunjungan?.x):kunjungan?.x} />
              </ListItem>

              
            </List>
              </Grid>
              <Grid item xs={6}>
              <ImageList sx={{height: 200 }} cols={3} rowHeight={164}>
                    {viewimage?.map((li, i) => (
                  <ImageListItem key={i}>
                 <Image
                        src={li?.foto}
                        alt={`img-barang`}
                        folder="kunjungan" 
                      />
                  </ImageListItem>
                   ))}
                 </ImageList>
              </Grid>
            </Grid>
          </Dialog>






        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Kunjungan Fasilitator  Mitra
          </Typography>
        </Stack>

        <Card>
          {list &&
            TableComponent(
              list.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.nama} 
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.nama_fasilitator}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.kunjungan_absen_date?fDatetimework(row.kunjungan_absen_date):row.kunjungan_absen_date}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formCapaian}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formHargaPembelian}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formPekerja}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.Kunjungan_formPendampingan}
                    </TableCell>
                    <TableCell id={labelId} scope="row" width={300}>
                      
                    <Button  onClick={() => hapusdata(row)} >
                        <DeleteSweepIcon/>
                      </Button>
                      
                      {/* <Button  onClick={() => editdata(row)} >
                        <EditIcon/>
                      </Button> */}
                      <Button  onClick={() => rubahposisi(row)} >
                        <ReadMoreIcon/>
                      </Button>
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
