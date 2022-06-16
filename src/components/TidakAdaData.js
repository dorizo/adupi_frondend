import { Stack, Typography } from '@mui/material';

export default function TidakAdaData({ text = ' Tidak ada data' }) {
  return (
    <Stack spacing={1}>
      <Typography style={{ marginTop: 10 }} align={'center'}>
        {text}
      </Typography>
    </Stack>
  );
}
