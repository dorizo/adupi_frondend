import CheckCircle from '@mui/icons-material/CheckCircle';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';

export default function Action(props) {
  const { actionOpen, actionClose, anchorEl, handleVerifikasi,handleDetail } = props;
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={actionOpen}
      onClose={actionClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleDetail}>
        <ListItemIcon>
          <CheckCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Detail</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleVerifikasi}>
        <ListItemIcon>
          <CheckCircle fontSize="small" />
        </ListItemIcon>
        <ListItemText>Verifikasi</ListItemText>
      </MenuItem>
    </Menu>
  );
}

Action.propTypes = {
  actionOpen: PropTypes.any,
  actionClose: PropTypes.any,
  handleVerifikasi: PropTypes.any,
  anchorEl: PropTypes.any,
};
