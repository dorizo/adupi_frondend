import { Button, Card, CardContent, CardHeader, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, TextField } from "@mui/material";
import BarMobile from "src/components/BarMobile";
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import { ADD_MITRALAMPIRANIMAGE, DELETE_LAMPIRANIMAGE, GET_mitraLampiran } from "src/api/mitralampiran";
import { useQuery } from "react-query";
import { useState } from "react";
import ButtonUpload from "src/components/Button/ButtonUpload";
import { LoadingButton } from "@mui/lab";
import TextInput from "src/components/TextInput";
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import dummybarang from '../../assets/dummy-barang.jpg';
import Image from "src/components/Image";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
export default function LampiranByFasilitator() {
    
        const params = useParams();
        const { data, refetch, isLoading }  = useQuery(
        ['GET_ALL_MASALAH', params?.mitraCode],() => GET_mitraLampiran(params?.mitraCode),
        {
            refetchOnWindowFocus: false,
        }
        );
        const [openmodal, setOpenmodal] = useState(false);
        const [selectedImg, setSelectedImg] = useState('');
        const [Modalitems, setModalitems] = useState('');
        const [mitraLampiranImageNamevalue, setmitraLampiranImageNamevalue] = useState('');
        const [loadingbutton ,setloadingbutton] = useState(true);
        const [loading, setLoading] = useState(false);
        const { enqueueSnackbar } = useSnackbar();
        const imageupload = async (value) => {
        console.log(value);
        setModalitems(value);
        setOpenmodal(true);
        setSelectedImg("");
        setloadingbutton(false);
        setmitraLampiranImageNamevalue("");
        }
        const handleClose = () => {
        setOpenmodal(false);
        };


        const handleUploadClick = (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setSelectedImg(reader.result);
        };
        setLoading(false);
        setloadingbutton(false);
        };
        const Uploadimagebase = async () => {
        if(mitraLampiranImageNamevalue === ''){

            enqueueSnackbar("data belum diisi", { variant: 'warning' , autoHideDuration:500 });
            return;
        };

        console.log(Modalitems?.mitraLampiranCode);
        setloadingbutton(true);
        const response = await ADD_MITRALAMPIRANIMAGE({MitraLampiranImageKeterangan:mitraLampiranImageNamevalue , MitraLampiranImageFoto:selectedImg , MitraLampiranCode:Modalitems?.mitraLampiranCode, MitraCode:params?.mitraCode});
        if (response.status === 422) {
            const asdf = response.data.errors;
            const keys = asdf && Object.keys(asdf);
            keys.forEach((key) => {
            enqueueSnackbar(asdf[key].msg, { variant: 'warning' });
            });
        }
        if (response.status === 200) {
            await enqueueSnackbar(response.data.message, { variant: 'success' });
            refetch();
            setOpenmodal(false);
        }
        if (response.status === 400) {
            await enqueueSnackbar(response.data.message, { variant: 'error' });
        }
        if (response.status === 500) {
            await enqueueSnackbar('Internal server error', 'error');
        }
        };
        if(isLoading){
        console.log("belumselesai");
        }
        const hapus = async (e) =>{
        console.log(e);
        var result;  
        var r = confirm("Yakin Ingin Menghapus Data");  
        if (r == true) {  
            const response = await DELETE_LAMPIRANIMAGE({id:e.MitraLampiranImageCode});
            if (response.data.status === 200) {
            enqueueSnackbar("data Berhasil di hapus", { variant: 'success' });
            await refetch();
            } 
        } 

        }
return (
    <>
    <Dialog fullScreen open={openmodal} onClose={handleClose}>
        <DialogTitle>{Modalitems?.mitraLampiranName}</DialogTitle>
        <DialogContent>
        <TextField
            fullWidth
            style={{marginBottom:5}}
            id="longitude"
            name="longitude"
            type="text"
            multiline
            minRows={4}
            maxRows={10}
            onChange={(e)=>setmitraLampiranImageNamevalue(e.target.value)}
            value={mitraLampiranImageNamevalue}
            /> 
          {selectedImg && (
              <a style={{ width: '100%' }} role="button" tabIndex={0} >
                <img style={{ margin: 10 }} src={selectedImg} alt={`img-nota`} />
              </a>
            )}
          <ButtonUpload disabled={selectedImg} upload={handleUploadClick} component="label" label="Unggah File" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <LoadingButton loading={loadingbutton} onClick={Uploadimagebase}>Upload</LoadingButton>
        </DialogActions>
      </Dialog>
    <BarMobile title={'Detail Lampiran'} />
    {data?.data?.data.map((value,key) => (
        <Card style={{margin:10}} key={key}>
        <CardHeader
        title={value.mitraLampiranName}
        action={
            <IconButton aria-label="settings" onClick={()=>imageupload(value)}>
                <CameraEnhanceIcon />
            </IconButton>
        }
        >
        </CardHeader>
      
        <CardContent>
        {
            value.mitra?.map((value1,key1) => (
                <>
                <Card key={key1} style={{margin:3}}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={()=>hapus(value1)}>
                            <DeleteForeverIcon />
                        </IconButton>
                    }
                    >
                    </CardHeader>
                    <CardContent>
                        <Grid container>
                            <Grid item xs={8} >
                            {value1?.MitraLampiranImageKeterangan}
                            </Grid>
                            <Grid item xs={4} >
                            <Image
                                style={{ width: 100 }}
                                src={value1?.MitraLampiranImageFoto}
                                alt={`img-barang`}
                                folder="mesin"
                                dummy={dummybarang}
                            />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
                </>

            ))
        }
        </CardContent>
    </Card>
        ))}
   
    </>
  )

}