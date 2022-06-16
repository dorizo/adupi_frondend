import { Box, Card, CardContent, CardHeader, Chip, Stack, Typography } from '@mui/material';
import Image from '../../components/Image';
import DetailTransaksi from './DetailTransaksi';

export default function DetailAnggota({ anggota }) {
  return (
    <>
      <Card>
        <CardHeader title={anggota?.nama} subheader={anggota?.nik} />
        <CardContent style={{ paddingTop: 5 }}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <div>
              {[
                { title: 'Jenis Kelamin', key: 'jenisKelamin' },
                { title: 'No HP', key: 'noHp' },
                { title: 'Provinsi', key: 'provinsi' },
                { title: 'Kabupaten', key: 'kabupaten' },
                { title: 'Kecamatan', key: 'kecamatan' },
                { title: 'Desa', key: 'desa' },
                { title: 'Alamat', key: 'alamat' },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex' }}>
                  <Typography variant="caption" sx={{ fontWeight: 'bold' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="caption">{`  :  ${anggota[item.key]}`}</Typography>
                </Box>
              ))}
            </div>
            <div>
              <Chip label={anggota?.mitra?.usahas[0]?.namaUsaha} color="info" style={{ marginBottom: 5 }} />
              <Image
                folder="anggota"
                width={200}
                src={anggota?.ktp}
                dummy="https://assets.pikiran-rakyat.com/crop/85x0:725x439/x/photo/2021/10/07/472467860.jpg"
              />
            </div>
          </Stack>
          <Typography variant="caption">Riwayat</Typography>
          <DetailTransaksi anggotaCode={anggota?.anggotaCode} />
        </CardContent>
      </Card>
    </>
  );
}
