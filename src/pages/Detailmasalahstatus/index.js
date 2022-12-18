import { Button, Card, Container, Grid, TableCell, TableRow } from "@mui/material";
import { useQuery } from "react-query";
import {  GET_ALL_MASALAH_DASHBOARDLIST } from "src/api/masalah";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { useParams } from "react-router-dom";
import useTable from '../../hooks/useTable/index';
import { fDateTime } from "src/utils/formatTime";

const headCells = [
    {
      id: 'nama',
      numeric: false,
      disablePadding: true,
      label: 'Status',
    },
    {
      id: 'mitra',
      numeric: false,
      disablePadding: true,
      label: 'Mitra',
    },
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
      id: 'CreateAt',
      numeric: false,
      disablePadding: true,
      label: 'tanggal Start Masalah',
    },
    {
      id: 'updateAt',
      numeric: false,
      disablePadding: true,
      label: 'tanggal Selesai Masalah',
    },
  ];
  
export default function Detailmasalahstatus({ type = null }) {
    const paramsx  = useParams();
    const { data : totalmasalah , isLoading:lodingmasalah } = useQuery(['GET_ALL_MASALAH_DASHBOARDLIST' , paramsx.status], () =>
    GET_ALL_MASALAH_DASHBOARDLIST(paramsx.status)
    );
    // console.log();
    
  const rows = totalmasalah && totalmasalah?.data?.data;
    console.log(totalmasalah);
    const pindah = async (id) =>{
        console.log(id);
    }
    const { TableComponent, list } = useTable({
        header: headCells,
        rows: rows || [],
        loading: lodingmasalah,
      });
    return(
        <Container>
           <Card>
          {totalmasalah &&
            TableComponent(
                totalmasalah?.data?.data?.map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow hover tabIndex={-1} key={index}>
                    <TableCell>{row.no}</TableCell>
                    <TableCell id={labelId} scope="row">
                      {row?.status}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row?.mitra?.nama}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.jenisMasalah}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.deskripsi}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {fDateTime(row.createAt)}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.updateAt?fDateTime(row.updateAt):""}
                      {/* Math.round((new Date(row.createAt) - new Date()) / (1000 * 60 * 60 * 24)) */}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
        </Container>
    )
}