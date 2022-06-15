import InfoIcon from '@mui/icons-material/Info';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';

export default function Action(props) {
  const { actionOpen, actionClose, anchorEl, handleDetail } = props;
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
          <InfoIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Verifikasi Anggota</ListItemText>
      </MenuItem>
    </Menu>
  );
}

Action.propTypes = {
  actionOpen: PropTypes.any,
  actionClose: PropTypes.any,
  handleDetail: PropTypes.any,
  anchorEl: PropTypes.any,
};
