import { Box, Container, Typography } from '@mui/material';
// @mui
import { styled } from '@mui/material/styles';
// components
import Page from '../components/Page';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  return (
    <Page title="Page Under construction">
      <Container>
        <ContentStyle sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant="h3" paragraph>
            Sorry, Under construction!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>we will solve this soon</Typography>

          <Box
            component="img"
            src="/static/illustrations/comingsoon.svg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
        </ContentStyle>
      </Container>
    </Page>
  );
}
