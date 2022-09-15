import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import gesn from '../assets/logo/logo.png';
import lemineral from '../assets/logo/le-minerale.png';
import adupi from '../assets/logo/adupi.png';

export default function BarMobilekunjungan({ title }) {
  const navigation = useNavigate();
  return (
    <>
      <Helmet>
        <title>{`${title} | ADUPI`}</title>
      </Helmet>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static">
          <Toolbar sx = {{background:"#35a4ed"}}>
            <IconButton
              onClick={() => navigation("/mobile")}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {title}
            </Typography>
            
            <img alt="adupi logo" width={80} src={gesn} style={{ marginRight: 2 }} />
            <img alt="adupi logo" width={40} src={adupi} style={{ marginRight: 2 }} />
            <img alt="adupi logo" width={60} src={lemineral} style={{ marginRight: 2 }} />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
