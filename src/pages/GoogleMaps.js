import React, { useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { Container, Stack, Typography } from '@mui/material';
import Page from '../components/Page';

export default function GoogleMaps() {
  const mapRef = useRef();

  // load and prepare data
  // get map bounds
  // get clusters

  // return map
  return (
    <Page title="Peta Sebaran">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Peta Sebaran
          </Typography>
        </Stack>
        <div style={{ height: '80vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDttiQFKmTxsGE1Nb5tW6cq2c-rwVELAas' }}
            defaultCenter={{ lat: -6.258752, lng: 106.6201363 }}
            defaultZoom={12}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map }) => {
              mapRef.current = map;
            }}
          >
            {/* markers here */}
          </GoogleMapReact>
        </div>
      </Container>
    </Page>
  );
}
