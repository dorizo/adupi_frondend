import {
  Box,
  Button,
  Card,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';
import {
  ADD_USER_PERMISSION,
  ADD_USER_ROLE,
  DELETE_USER_PERMISSION,
  DELETE_USER_ROLE,
  GET_USER_PERMISSION,
  GET_USER_ROLE,
} from '../../api/user';
import { GET_ROLES } from '../../api/role';
import { GET_PERMISSIONS } from '../../api/permisision';
import LoadingComponent from '../../components/LoadingComponent';

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function Index() {
  const theme = useTheme();
  const params = useParams();
  const [selectRole, setSelectRole] = useState('');
  const [selectPermission, setSelectPermission] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, refetch } = useQuery(['GET_USER_PERMISSION', params.id], () =>
    GET_USER_PERMISSION(params.id)
  );
  const {
    data: uRole,
    isLoading: uloading,
    refetch: rfrole,
  } = useQuery(['GET_USER_ROLE', params.id], () => GET_USER_ROLE(params.id));

  const { data: roless, isLoading: lroles } = useQuery('GET_ROLES', GET_ROLES);

  const { data: permiss, isLoading: lpermiss } = useQuery('GET_PERMISSIONS', GET_PERMISSIONS);

  if (isLoading || lroles || loading || lpermiss || uloading) {
    return <LoadingComponent />;
  }
  const userPermission = data && data.data;

  const userRole = uRole && uRole.data;

  const roles = roless && roless.data;

  const permissions = permiss && permiss.data;

  const handleDeleteRole = async (code) => {
    setLoading(true);

    const rst = await DELETE_USER_ROLE(code);

    if (rst.status === 200) {
      await rfrole();
      await enqueueSnackbar(rst.data.message, { variant: 'success' });
    }
    if (rst.status === 400) {
      await enqueueSnackbar(rst.data.message, { variant: 'error' });
    }
    setLoading(false);
  };
  const handleAddRole = async () => {
    setLoading(true);

    const rst = await ADD_USER_ROLE(params.id, selectRole);
    if (rst.status === 200) {
      await rfrole();
      await enqueueSnackbar(rst.data.message, { variant: 'success' });
    }
    if (rst.status === 400) {
      await enqueueSnackbar(rst.data.message, { variant: 'error' });
    }
    setLoading(false);
    setSelectRole(null);
  };
  const handleDeletePermission = async (code) => {
    setLoading(true);

    const rst = await DELETE_USER_PERMISSION(code);

    if (rst.status === 200) {
      await refetch();
      await enqueueSnackbar(rst.data.message, { variant: 'success' });
    }
    if (rst.status === 400) {
      await enqueueSnackbar(rst.data.message, { variant: 'error' });
    }
    setLoading(false);
  };
  const handleAddPermission = async () => {
    setLoading(true);
    selectPermission.forEach(async (v) => {
      const rst = await ADD_USER_PERMISSION(params.id, v.split('|')[0]);
      if (rst.status === 200) {
        await refetch();
        await enqueueSnackbar(rst.data.message, { variant: 'success' });
      }
      if (rst.status === 400) {
        await enqueueSnackbar(rst.data.message, { variant: 'error' });
      }
    });
    setSelectPermission([]);
    setLoading(false);
  };
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectPermission(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  return (
    <div>
      <Card style={{ padding: 10 }}>
        <h5>Detail User</h5>
        <Card style={{ padding: 10 }}>
          <Typography sx={{ marginBottom: 2 }}>Role</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl margin="dense" fullWidth>
              <InputLabel id="demo-simple-select-label">Role</InputLabel>
              <Select
                value={selectRole}
                onChange={(e) => setSelectRole(e.target.value)}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="type"
                name="type"
              >
                {roles.data.map((r, i) => (
                  <MenuItem key={i} value={r.roleCode}>
                    {r.role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button disabled={!selectRole} onClick={handleAddRole} sx={{ marginLeft: 2 }}>
              Tambah
            </Button>
          </div>

          <Stack direction="row" style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap' }} spacing={1}>
            {userRole &&
              userRole.data.map((role, i) => (
                <Chip
                  key={i}
                  style={{ marginTop: 10 }}
                  label={role.role}
                  onDelete={() => handleDeleteRole(role.ruCode)}
                />
              ))}
          </Stack>
        </Card>
        <Card style={{ padding: 10 }}>
          <Typography sx={{ marginBottom: 2 }}>Permision</Typography>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="grouped-select">Permission</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={selectPermission}
                onChange={handleChange}
                input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value.split('|')[1]} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {permissions.data &&
                  permissions.data.map((p) => (
                    <MenuItem
                      key={p.permissionCode}
                      value={`${p.permissionCode}|${p.description}`}
                      style={getStyles(p.description, selectPermission, theme)}
                    >
                      {p.description}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <Button disabled={!selectPermission} onClick={handleAddPermission} sx={{ marginLeft: 2 }}>
              Tambah
            </Button>
          </div>
          <Stack direction="row" style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap' }} spacing={1}>
            {userPermission &&
              userPermission.data.map((p, i) => (
                <Chip
                  key={i}
                  style={{ marginTop: 10 }}
                  label={p.description}
                  onDelete={() => handleDeletePermission(p.upCode)}
                />
              ))}
          </Stack>
        </Card>
      </Card>
    </div>
  );
}
