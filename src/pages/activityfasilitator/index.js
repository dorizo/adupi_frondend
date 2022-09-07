import { Button, Card, Container, Grid, TableCell, TableRow } from "@mui/material";
import { useQuery } from "react-query";
import {  GET_ALL_ACTIVITI_DASHBOARDLIST } from "src/api/masalah";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { useParams } from "react-router-dom";
import useTable from '../../hooks/useTable/index';
import { fDateTime } from "src/utils/formatTime";

const headCells = [
    {
      id: 'Nama Fasilitator',
      numeric: false,
      disablePadding: true,
      label: 'Nama Fasilitator',
    },
    {
      id: 'Log Proses',
      numeric: false,
      disablePadding: true,
      label: 'Log Status',
    },
    {
      id: 'tanggal',
      numeric: false,
      disablePadding: true,
      label: 'Tanggal',
    },
  ];
  
export default function Activityfasilitator({ type = null }) {
    const paramsx  = useParams();
    const { data : totalmasalah , isLoading:lodingmasalah } = useQuery(['GET_ALL_MASALAH_DASHBOARDLIST'], () =>
    GET_ALL_ACTIVITI_DASHBOARDLIST()
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
                      {row?.nama}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {row.fasilitator_logsName}
                    </TableCell>
                    <TableCell id={labelId} scope="row">
                      {fDateTime(row.fasilitator_logsDate)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
        </Card>
        </Container>
    )
}