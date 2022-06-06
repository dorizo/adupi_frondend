import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

export default function BarMobile({ title }) {
  const navigation = useNavigate();
  return (
    <>
      <Helmet>
        <title>{`${title} | ADUPI`}</title>
      </Helmet>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar color="transparent" position="static">
          <Toolbar>
            <IconButton
              onClick={() => navigation(-1)}
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
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
