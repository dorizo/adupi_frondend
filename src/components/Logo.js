import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import logo from '../assets/logo/logo-black.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logoo = (
    <Box sx={{ width: 80, height: 80, ...sx }}>
      <img alt="adupi logo" width={80} src={logo} />
    </Box>
  );

  if (disabledLink) {
    return <>{logoo}</>;
  }

  return <RouterLink to="/">{logoo}</RouterLink>;
}
