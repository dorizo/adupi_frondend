import { Box, Button, Card, CardContent, Container, Grid, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers';
// import { useMee } from 'contexts/MeContext';
import * as React from 'react';
import Page from '../../components/Page';
import SelectInput from '../../components/SelectInput';

const date = new Date();
const y = date.getFullYear();
const m = date.getMonth();
const startInit = new Date(y, m, 1);
const endInit = new Date(y, m + 1, 0);

export default function Export() {
  const [start, setStart] = React.useState(startInit);
  const [end, setEnd] = React.useState(endInit);
  const [type, setType] = React.useState('penjualan');

  const downloadFile = () => {
    /* eslint-disable prefer-const */
    /* eslint-disable no-alert */
    /* eslint-disable no-useless-escape */
    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    };
    let filePath = '';
    if (type === 'pembelian') {
      filePath = `${process.env.REACT_APP_API_URL_SSL}export/beliSampah/`;
    } else {
      filePath = `${process.env.REACT_APP_API_URL_SSL}export/jualSampah/`;
    }
    fetch(filePath, {
      headers,
      params: {
        start,
        end,
      },
    })
      .then(async (response) => {
        const b = await response.blob();
        let a = document.createElement('a');
        let url = URL.createObjectURL(b);
        a.href = url;
        a.download = `${type}.xlsx`;
        a.click();
      })
      .catch((err) => alert(err));
  };
  return (
    <Page title="Export data">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Export data
          </Typography>
        </Stack>
        <Card>
          <CardContent>
            <Grid container direction="row" alignItems="center" justifyContent="space-between" mb={5}>
              <Grid item xs={3}>
                <SelectInput
                  option={[
                    { value: 'pembelian', label: 'Pembelian' },
                    { value: 'penjualan', label: 'Penjualan' },
                  ]}
                  label=""
                  variant="outlined"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                />
              </Grid>
              <Grid item xs={3}>
                <DesktopDatePicker
                  label="Dari"
                  inputFormat="dd/MM/yyyy"
                  value={start}
                  onChange={(_, newVal) => setStart(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item xs={3}>
                <DesktopDatePicker
                  label="Sampai"
                  inputFormat="dd/MM/yyyy"
                  value={end}
                  onChange={(_, newVal) => setEnd(newVal)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Button size="large" variant="contained" onClick={downloadFile} color="primary">
                Export Excel
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Page>
  );
}
