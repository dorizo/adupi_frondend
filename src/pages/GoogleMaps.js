import { Container } from '@mui/material';
import { Circle, CircleMarker, MapContainer, Polygon, Polyline, Popup, Rectangle, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { kml } from '@tmcw/togeojson';
import { jakartaUtara } from '../kml/jakarta/utara';
import kmlUtara from '../kml/jakarta/utara.kml';
import { jakartaBarat } from '../kml/jakarta/barat';
import { jakartaSelatan } from '../kml/jakarta/selatan';
import { jakartaTimur } from '../kml/jakarta/timur';
import { jakartaPusat } from '../kml/jakarta/pusat';

const center = [-6.258752, 106.6201363];

function inside(point, vs) {
  // ray-casting algorithm based on
  // https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html/pnpoly.html

  const x = point[0];
  const y = point[1];

  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i + 1) {
    const xi = vs[i][0];
    const yi = vs[i][1];
    const xj = vs[j][0];
    const yj = vs[j][1];

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }

  return inside;
}

export default function GoogleMaps() {
  const redOptions = { color: 'red' };
  console.log(kml(new DOMParser().parseFromString(kmlUtara, 'text/xml')));
  console.log(jakartaUtara);
  return (
    <MapContainer style={{ height: '100vh', width: '100%' }} center={center} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {jakartaBarat.features.map((f) => (
        <Polygon pathOptions={redOptions} positions={f.geometry.coordinates[0][0].map((v) => [v[1], v[0]])} />
      ))}
      {jakartaSelatan.features.map((f) => (
        <Polygon pathOptions={redOptions} positions={f.geometry.coordinates[0][0].map((v) => [v[1], v[0]])} />
      ))}
      {jakartaTimur.features.map((f) => (
        <Polygon pathOptions={redOptions} positions={f.geometry.coordinates[0][0].map((v) => [v[1], v[0]])} />
      ))}
      {jakartaPusat.features.map((f) => (
        <Polygon pathOptions={redOptions} positions={f.geometry.coordinates[0][0].map((v) => [v[1], v[0]])} />
      ))}
      {jakartaUtara.features.map((f) => (
        <Polygon pathOptions={redOptions} positions={f.geometry.coordinates[0][0].map((v) => [v[1], v[0]])} />
      ))}
    </MapContainer>
  );
}
