// material
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
// component
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

export default function MoreMenu({ handleApprove, handleDetail }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Iconify icon="eva:more-vertical-fill" width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem onClick={handleApprove} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:checkmark-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Approve" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={handleDetail} sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Iconify icon="eva:maximize-outline" width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Detail" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  );
}
MoreMenu.propTypes = {
  handleApprove: PropTypes.func,
  handleDetail: PropTypes.func,
};
