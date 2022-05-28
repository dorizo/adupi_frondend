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
import { ADD_ROLE_PERMISSION, DELETE_ROLE_PERMISSION, GET_ROLE_ALL_PERMISSION } from '../../api/role';
import { GET_PERMISSIONS } from '../../api/permisision';
import Page from '../../components/Page';
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

export default function RoleDetail() {
  const theme = useTheme();
  const params = useParams();
  console.log(params.roleId);
  const [selectPermission, setSelectPermission] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data, isLoading, refetch } = useQuery(['GET_ROLE_ALL_PERMISSION', params.roleId], () =>
    GET_ROLE_ALL_PERMISSION(params.roleId)
  );

  const { data: permiss, isLoading: lpermiss } = useQuery('GET_PERMISSIONS', GET_PERMISSIONS);

  if (isLoading || lpermiss || loading) {
    return <LoadingComponent />;
  }
  const result = data && data.data;

  const permissions = permiss && permiss.data;
  console.log(result);
  console.log(permissions);
  const handleDeletePermission = async (code) => {
    setLoading(true);

    const rst = await DELETE_ROLE_PERMISSION(code);

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
      const rst = await ADD_ROLE_PERMISSION(params.roleId, v.split('|')[0]);
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
    <Page title="Role Detail">
      <Typography variant="h4" gutterBottom>
        Role Permission
      </Typography>
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
          {result &&
            result.data.map((p, i) => (
              <Chip
                key={i}
                style={{ marginTop: 10 }}
                label={p.description}
                onDelete={() => handleDeletePermission(p.rpCode)}
              />
            ))}
        </Stack>
      </Card>
    </Page>
  );
}
