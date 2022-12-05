import InfoIcon from '@mui/icons-material/Info';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import PropTypes from 'prop-types';

export default function Action(props) {
  const { actionOpen, actionClose, anchorEl, handleDetail, handleVerifAnggota, handleMasalah , handleEdit } = props;
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
        <ListItemText>Detail</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleMasalah}>
        <ListItemIcon>
          <BrokenImageIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>List Masalah</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleVerifAnggota}>
        <ListItemIcon>
          <PeopleOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Anggota</ListItemText>
      </MenuItem>
      <MenuItem onClick={handleEdit}>
        <ListItemIcon>
          <PeopleOutlineIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
    </Menu>
  );
}

Action.propTypes = {
  actionOpen: PropTypes.any,
  actionClose: PropTypes.any,
  handleDetail: PropTypes.any,
  handleVerifAnggota: PropTypes.any,
  handleMasalah: PropTypes.any,
  anchorEl: PropTypes.any,
};
