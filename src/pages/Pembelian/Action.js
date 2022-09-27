import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ListItemIcon, Menu, MenuItem } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import PropTypes from 'prop-types';

export default function Action(props) {
  const { actionOpen, actionClose, anchorEl, handelDelete, handleEdit } = props;
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
      <MenuItem onClick={handleEdit}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Edit</ListItemText>
      </MenuItem>
      {/* <MenuItem onClick={handelDelete}>
        <ListItemIcon>
          <DeleteIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Delete</ListItemText>
      </MenuItem> */}
    </Menu>
  );
}

Action.propTypes = {
  actionOpen: PropTypes.any,
  actionClose: PropTypes.any,
  handelDelete: PropTypes.any,
  handleEdit: PropTypes.any,
  anchorEl: PropTypes.any,
};
