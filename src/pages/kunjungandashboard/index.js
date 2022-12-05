import { Button, Card, Container, Grid } from "@mui/material";
import { useQuery } from "react-query";
import { GET_ALL_MASALAH_DASHBOARD } from "src/api/masalah";
import NextPlanIcon from '@mui/icons-material/NextPlan';
import { useNavigate } from "react-router-dom";

export default function Kunjungandashboard({ type = null }) {
    const { data : totalmasalah , isLoading:lodingmasalah } = useQuery(['GET_ALL_MASALAH_DASHBOARD'], () =>
    GET_ALL_MASALAH_DASHBOARD()
    );
    let navigate = useNavigate();
    // console.log();
    const pindah = async (id) =>{
    const datab = '/dashboard/detailmasalahstatus/'+id;
    navigate(datab, { replace: true });
    console.log(datab);
     
        // window.location.href='detailmasalahstatus/'+id;
        // props.history.push();
    }
    return(
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Card style={{padding:20}}>
                        <h5>Masalah Terselesaikan</h5>
                        <h1>{totalmasalah?.data?.data.selesai}</h1>
                        <Button  onClick={() => pindah("selesai")} variant="contained" endIcon={<NextPlanIcon />}>
                        Detail
                        </Button>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card style={{padding:20}}>
                        <h5>Masalah Belum Terselesaikan</h5>
                        <h1>{totalmasalah?.data?.data.belum}</h1>
                        <Button  onClick={() => pindah("dalam peninjauan")}  variant="contained" endIcon={<NextPlanIcon />}>
                        Detail
                        </Button>
                        
                    </Card>
                </Grid>
                
                <Grid item xs={4}>
                <Card style={{padding:20}}>
                        <h5>Fasilitator Aktif Hari Ini</h5>
                        <h1>{totalmasalah?.data?.data.faslilitator}</h1>
                        <Button  onClick={() =>navigate("/dashboard/detaillogfasilitator")}  variant="contained" endIcon={<NextPlanIcon />}>
                        Detail
                        </Button>
                        
                    </Card>
                </Grid>
            </Grid>
        </Container>
    )
}