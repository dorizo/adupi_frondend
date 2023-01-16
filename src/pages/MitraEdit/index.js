import { Button, Card, CardContent, MenuItem, Select, Stack, TextField } from "@mui/material";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { GET_MITRA_DETAIL_BY_SU } from "src/api/mitra";
import { GET_mitraLampiran } from "src/api/mitralampiran";
import LoadingComponent from "src/components/LoadingComponent";
import useImageViewer from "src/hooks/useImageViewer";
import qs from 'qs';
import axios from "axios";
import { GET_ALL_FASILITATOR } from "src/api/fasilitator";
import { useState } from "react";
import { useEffect } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";

export default function MitraEdit() {
    const params = useParams();
    const { handleOpen: handleOpenImage } = useImageViewer();
    const { data, isLoading } = useQuery(['GET_MITRA_DETAIL_BY_SU', params.mitraCode], () =>
      GET_MITRA_DETAIL_BY_SU(params.mitraCode)
    );
    
    const [fasilitatorCODEr, setfasilitatorCODEr] = useState();
    const [tanggal , setTanggal] = useState();
    //mitraDetail?.createAt?.substring(0, 10)
    const {data : fasilitatordata , loading : fasilitatorlodaing} = useQuery('fasilitatordata' , GET_ALL_FASILITATOR);
    const { data:datalampiran, refetch:refetchlampiran, isLoading:lodinglampiran }  = useQuery(
      ['GET_ALL_MASALAH', params?.mitraCode],() => GET_mitraLampiran(params?.mitraCode),
      {
          refetchOnWindowFocus: false,
      }
      );
    const mitraDetail = data && data?.data?.data;
    useEffect(() => {
        setTanggal(mitraDetail?.createAt?.substring(0, 10));
        console.log(tanggal);
    },[mitraDetail]);
    if (isLoading) {
      return <LoadingComponent />;
    };
    const showForm = async (event) => {
        event.preventDefault();
            let newdate = new Date(tanggal);
            const data = qs.stringify({
                "mitraCode":mitraDetail?.mitraCode,
                "nama" : event.target.nama.value,
                "nik" : event.target.nik.value,
                "noHp" : event.target.noHp.value,
                "jenisMitra" : event.target.jenisMitra.value,
                "alamat" : event.target.alamat.value,
                "fasilitatorCode" : event.target.fasilitatorCode.value,
                "createAt" : format(newdate , "yyyy-MM-dd" ), 
            });
            // console.log(format(newdate , "yyyy-MM-dd" ));
            const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            };
            try {
            const response = await axios.post(process.env.REACT_APP_API_URL_SSL+`qc/editmitra`, data, { headers });
            console.log(response);
            alert(response?.data?.message);
            } catch (error) {
            console.log(error);
            }
    }

    const showForm2 = async (event) => {
        event.preventDefault();
        let newdate = new Date(tanggal);
            const data = qs.stringify({
                "usahaCode":mitraDetail?.gudang?.[0]?.usahaCode,
                "namaUsaha" : event.target.namaUsaha.value,
                "lang" : event.target.lang.value,
                "lat" : event.target.lat.value,
                "alamat" : event.target.alamat.value,
                "luasGudang" : event.target.luasGudang.value,
                "jumlahPekerja" : event.target.jumlahPekerja.value,
                "createAt" : format(newdate , "yyyy-MM-dd" ), 
            });
            const headers = {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
            };
            try {
            const response = await axios.post(process.env.REACT_APP_API_URL_SSL+`qc/editusaha`, data, { headers });
            console.log(response);
            
            alert(response?.data?.message);
            } catch (error) {
            console.log(error);
            }
    }
    
    

    const fasilitatorChange = (event) => {
        setfasilitatorCODEr(event.target.value);
      };
    const updatetanggal =(e) =>{
        console.log(e);
        setTanggal(e);
    }
return(
    <div>
    {fasilitatorCODEr}
        <Card>
            <CardContent>
                <form  onSubmit={showForm}>
                <Stack
                   
                    spacing={2}
                    >
                        <TextField
                        required
                        id="outlined-required"
                        label="nama"
                        name="nama"
                        fullWidth 
                        defaultValue={mitraDetail?.nama}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="NIK"
                        fullWidth 
                        name="nik"
                        defaultValue={mitraDetail?.nik}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="NO HP"
                        fullWidth 
                        name="noHp"
                        defaultValue={mitraDetail?.noHp}
                        />
                        <TextField
                        required
                        id="outlined-required"
                        label="jenis Mitra"
                        fullWidth 
                        name="jenisMitra"
                        defaultValue={mitraDetail?.jenisMitra}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="alamat"
                            fullWidth 
                            name="alamat"
                            defaultValue={mitraDetail?.alamat}
                            />
                            <DesktopDatePicker
                            label="Tanggal Bergabung"
                            name="createAt"
                            value={tanggal}
                            onChange={updatetanggal}
                            renderInput={(params) => <TextField {...params} />}
                            />
                            
                        <Select label="Fasilitator" onChange={fasilitatorChange} name="fasilitatorCode" value={fasilitatorCODEr?fasilitatorCODEr:mitraDetail?.fasilitator?.fasilitatorCode}>
                            {fasilitatordata?.data?.data?.map((choice,index) => (
                            <MenuItem key={index} value={choice?.fasilitatorCode}>
                                {choice?.nama}
                            </MenuItem>
                            ))}
                        </Select>
                    <Button  type="submit" variant="contained">Simpan</Button>
                </Stack>
               </form>
            </CardContent>
        </Card>

        <Card sx={{ mt: 2 }} >
            <CardContent>
            <form  onSubmit={showForm2}>
              
            <Stack
                spacing={2}
                >
                    <TextField
                    required
                    id="outlined-required"
                    label="Nama Usaha"
                    fullWidth 
                    name="namaUsaha"
                    defaultValue={mitraDetail?.gudang?.[0]?.namaUsaha}
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="Longitute"
                    fullWidth 
                    name="lang"
                    defaultValue={mitraDetail?.gudang?.[0]?.lang}
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="latitude"
                    fullWidth 
                    name="lat"
                    defaultValue={mitraDetail?.gudang?.[0]?.lat}
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="Alamat"
                    fullWidth 
                    name="alamat"
                    defaultValue={mitraDetail?.gudang?.[0]?.alamat}
                    />
                    <DesktopDatePicker
                            label="Tanggal Bergabung"
                            name="createAt"
                            value={tanggal}
                            onChange={updatetanggal}
                            renderInput={(params) => <TextField {...params} />}
                            />
                    <TextField
                    required
                    id="outlined-required"
                    label="Luas Gudang"
                    fullWidth 
                    name="luasGudang"
                    defaultValue={mitraDetail?.gudang?.[0]?.luasGudang}
                    />
                    <TextField
                    required
                    id="outlined-required"
                    label="Jumlah Pekerja"
                    fullWidth 
                    name="jumlahPekerja"
                    defaultValue={mitraDetail?.gudang?.[0]?.jumlahPekerja}
                    />
                <Button type="submit" variant="contained">Simpan</Button>
               </Stack>
               </form>
            </CardContent>
        </Card>
    </div>
)

}