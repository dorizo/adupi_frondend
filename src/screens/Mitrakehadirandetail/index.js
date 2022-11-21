import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { GET_MITRA_DETAIL_BY_FASILITATOR } from "src/api/mitra";
import BarMobile from "src/components/BarMobile";
import { LoadingButton } from "@mui/lab";
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import { useEffect, useState } from "react";
import Detailmitracomp from "./detailmitra";
import { ADD_KUNJUNGANMITRA, GET_KunjunganTanggal } from "src/api/kunjunganmitra";
import { useSnackbar } from "notistack";
import { CEK_KUNJUNGAN } from "src/api/kunjungan";
export default function Mitrakehadirandetail() {
    
    const params = useParams();
    const [statuscode , setstatuscode] = useState("checkin");
    const navigate = useNavigate();
  
    const { enqueueSnackbar } = useSnackbar();
    let newDate = new Date();
    let tanggalsekarang = newDate.getFullYear()+"-"+(newDate.getMonth() + 1)+"-"+newDate.getDate();

    const { data: dataMitra } =   useQuery(['GET_MITRA_DETAIL_BY_FASILITATOR', params.mitraCode], () =>
    GET_MITRA_DETAIL_BY_FASILITATOR(params.mitraCode)
    );
    const {data:mitradetail , refetch:detailrefech} = useQuery(['GET_KunjunganTanggal' , [params.mitraCode,tanggalsekarang] ],()=>
    GET_KunjunganTanggal(params.mitraCode , tanggalsekarang));
    const datasingle = dataMitra?.data?.data;

    if(mitradetail?.data?.data?.length != 0){
      useEffect(() => {
        if(mitradetail?.data?.data?.[0].kunjungan_absen_status == "checkin"){
              setstatuscode("checkout");
        };
      });
    }
    const checkin = async (id) => {
      if(statuscode == "checkout"){

             const CEKDATA = await CEK_KUNJUNGAN(mitradetail?.data?.data?.[0]?.kunjungan_absenCode);
             console.log(CEKDATA);
            if((CEKDATA?.data?.data?.masalahform) < 1){
              await enqueueSnackbar('Anda Belum Mengisi Form masalah',  { variant: 'error' });
              return true;
            }else if(CEKDATA?.data?.data?.masalahfoto < 1){
              await enqueueSnackbar('Anda Belum Melakukan Pengambilan foto',  { variant: 'error' });
              return true;
            }else{
              await enqueueSnackbar('Berhasil Melakukan Kunjungan',  { variant: 'success' });
            };
            navigate("/mobile/list-kehadiranmitra");
      };
      const data  = await ADD_KUNJUNGANMITRA({"kunjungan_absen_name" : datasingle?.gudang?.[0]?.usahaCode , "kunjungan_absen_date": tanggalsekarang+" "+newDate.getHours()+":"+newDate.getMinutes()+":"+newDate.getSeconds(),"kunjungan_absen_status":statuscode,"mitraCode":params.mitraCode});
      if(data.status === 200){
        // console.log(data.status);
        setstatuscode("checkout");
      }else{
        setstatuscode("checkin");

      }

      await detailrefech();
      
    }
    return (
        <>
          <BarMobile title={'Kunjungan'} />   
            <Card style={{ marginTop: 5}}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    {datasingle?.nama}
                    </Typography>
                    <Typography gutterBottom variant="body1" component="div">
                    {datasingle?.noHp}
                    </Typography>
                    <Typography gutterBottom variant="body2" component="div">
                    {datasingle?.gudang?.[0]?.alamat} ,{datasingle?.wilayah?.desa?.wilayah}  {datasingle?.wilayah?.kabupaten?.wilayah}  {datasingle?.wilayah?.kecamatan?.wilayah} 
                    </Typography>
                </CardContent>
                <CardActions style={ {display: "flex",justifyContent: "flex-end"}}>
                <LoadingButton
                    loadingPosition="start"
                    startIcon={<FollowTheSignsIcon />}
                    variant="outlined"
                    onClick={() => checkin(datasingle?.mitraCode)}
                    style={{background: statuscode === 'checkin'?"blue":"red" , color:"white"}}
                  >
                    {statuscode}
                  </LoadingButton>
                </CardActions>
                <CardActions>
                
                </CardActions>
            </Card>
           {statuscode === "checkout" ? <Detailmitracomp title={mitradetail?.data?.data?.[0]?.kunjungan_absenCode}  />:<></> }
            
          </>
    );
}