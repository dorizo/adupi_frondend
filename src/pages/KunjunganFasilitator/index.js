import { AppBar, Button, Card, Container, Dialog, Divider, Grid, IconButton, ImageList, ImageListItem, List, ListItem, ListItemText, Modal, Stack, TableCell, TableRow, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useQuery } from 'react-query';
import { fDateSuffix, fDateTime } from '../../utils/formatTime';
import { deletekunjungannonmitra, GET_ALL_KUNJUNGAN } from '../../api/kunjungan';
import Page from '../../components/Page';
import useTable from '../../hooks/useTable/index';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { GET_viewimagekunjungan } from 'src/api/kunjunganmitra';
import Image from 'src/components/Image';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import EditIcon from '@mui/icons-material/Edit';
const headCells = [
  
  {
    id: 'judul',
    numeric: false,
    disablePadding: true,
    label: 'Judul',
  },
  {
    id: 'descripsi',
    numeric: false,
    disablePadding: true,
    label: 'Deskripsi',
  },
  {
    id: 'tanggal',
    numeric: false,
    disablePadding: true,
    label: 'Check-In',
  },
  {
    id: 'tanggal1',
    numeric: false,
    disablePadding: true,
    label: 'Check-Out',
  },
  {
    id: 'detail',
    numeric: false,
    disablePadding: true,
    label: 'detail',
  },
];

export default function KunjunganFasilitator() {
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
    let details = await GET_viewimagekunjungan(row.kunjunganCode,'non mitra');
    Setviewimage(details?.data?.data);
  
}
  const { data, isLoading,refetch } = useQuery('GET_ALL_KUNJUNGAN', GET_ALL_KUNJUNGAN);

  const rows = data && data?.data?.data;

  const { TableComponent, list } = useTable({
    header: headCells,
    rows: rows || [],
    loading: isLoading,
  });

  
  const hapusdata = async (row) =>  {
    // console.log(row);
    if (confirm("APAKAH ANDA YAKIN AKAN MENGHAPUS DATA") == true) {
      const m = await deletekunjungannonmitra({kunjunganCode:row.kunjunganCode , deleteAt:fDateSuffix(new Date())} );
      console.log(m);
      refetch();
    } else {
     console.log("gagal");
    }
  }

  const editdata = async (row) =>  {
    console.log(new Date());
  }

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
                  Detail Data
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container spacing={2}>
              <Grid item xs={6}>
              <List>
              <ListItem button>
                <ListItemText primary="Nama Fasilitator" secondary={kunjungan?.fasilitator?.nama} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Judul" secondary={kunjungan?.judul} />
                </ListItem>
                <Divider />
                <ListItem button>
                  <ListItemText primary="Judul" secondary={kunjungan?.deskripsi} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Chekin" secondary={kunjungan?.createAt} />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Chekout" secondary={kunjungan?.updateAt} />
                </ListItem>
              </List>
              </Grid>
              <Grid item xs={6}>
                <ImageList sx={{height: 200 }} cols={3} rowHeight={164}>
                      {viewimage?.map((li, i) => (
                    <ImageListItem>
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
            Kunjungan Fasilitator Non Mitra
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
                      {row.judul}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.deskripsi}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {fDateTime(row.createAt)}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.updateAt?fDateTime(row.updateAt):"BELUM CHECK OUT"}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
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
