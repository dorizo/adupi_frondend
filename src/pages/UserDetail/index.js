import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import LoadingComponent from 'components/LoadingComponent';
import useSnackbar from 'components/SnackBar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { GET_ROLES } from 'services/role';
import {
    ADD_USER_PERMISSION,
    ADD_USER_ROLE,
    DELETE_USER_PERMISSION,
    DELETE_USER_ROLE,
    GET_PERMISSIONS,
    GET_USER_DETAIL_PERMISSION
} from 'services/user';
import MainCard from 'ui-component/cards/MainCard';

export default function Index() {
    const params = useParams();
    const [selectRole, setSelectRole] = useState('');
    const [selectPermission, setSelectPermission] = useState('');
    const [loading, setLoading] = useState(false);
    const { snackBarOpen, SnackBarComponent } = useSnackbar();
    const { data, isLoading, refetch } = useQuery('GET_USER_DETAIL_PERMISSION', () => GET_USER_DETAIL_PERMISSION(params.id));

    const { data: roless, isLoading: lroles } = useQuery('GET_ROLES', GET_ROLES);

    const { data: permiss, isLoading: lpermiss } = useQuery('GET_PERMISSIONS', GET_PERMISSIONS);

    if (isLoading || lroles || loading || lpermiss) {
        return <LoadingComponent />;
    }
    const result = data && data.data;

    const roles = roless && roless.data;

    const permissions = permiss && permiss.data;
    const permission = result.data && result.data.spesialPermission;

    const handleDeleteRole = async (code) => {
        setLoading(true);

        const rst = await DELETE_USER_ROLE(code);

        if (rst.status === 200) {
            await refetch();
            await snackBarOpen(rst.data.success.message, 'success');
        }
        if (rst.status === 400) {
            await snackBarOpen(rst.data.error.message, 'error');
        }
        setLoading(false);
    };
    const handleAddRole = async () => {
        setLoading(true);

        const rst = await ADD_USER_ROLE(params.id, selectRole);
        if (rst.status === 200) {
            await refetch();
            await snackBarOpen(rst.data.success.message, 'success');
        }
        if (rst.status === 400) {
            await snackBarOpen(rst.data.error.message, 'error');
        }
        setLoading(false);
        setSelectRole(null);
    };
    const handleDeletePermission = async (code) => {
        setLoading(true);

        const rst = await DELETE_USER_PERMISSION(code);

        if (rst.status === 200) {
            await refetch();
            await snackBarOpen(rst.data.success.message, 'success');
        }
        if (rst.status === 400) {
            await snackBarOpen(rst.data.error.message, 'error');
        }
        setLoading(false);
    };
    const handleAddPermission = async () => {
        setLoading(true);

        const rst = await ADD_USER_PERMISSION(params.id, selectPermission);

        if (rst.status === 200) {
            await refetch();
            await snackBarOpen(rst.data.success.message, 'success');
        }
        if (rst.status === 400) {
            await snackBarOpen(rst.data.error.message, 'error');
        }
        setSelectPermission(null);
        setLoading(false);
    };
    return (
        <div>
            <MainCard>
                <h5>Detail User</h5>
                <MainCard>
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
                                {roles.data.map((r) => (
                                    <MenuItem value={r.roleCode}>{r.role}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button disabled={!selectRole} onClick={handleAddRole} sx={{ marginLeft: 2 }}>
                            Tambah
                        </Button>
                    </div>

                    <Stack direction="row" style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap' }} spacing={1}>
                        {result.data.role.map((role) => (
                            <Chip style={{ marginTop: 10 }} label={role.role} onDelete={() => handleDeleteRole(role.ruCode)} />
                        ))}
                    </Stack>
                </MainCard>
                <MainCard>
                    <Typography sx={{ marginBottom: 2 }}>Permision</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="grouped-select">Permission</InputLabel>
                            <Select
                                native
                                value={selectPermission}
                                onChange={(e) => setSelectPermission(e.target.value)}
                                defaultValue=""
                                id="grouped-select"
                                label="Grouping"
                            >
                                <option aria-label="None" value="" />
                                {permissions &&
                                    permissions.data.map((m) => (
                                        <>
                                            <optgroup label={m.module}>
                                                {m.permission.map((p) => (
                                                    <option value={p.permissionCode}>
                                                        {p.permission} | {p.description}
                                                    </option>
                                                ))}
                                            </optgroup>
                                        </>
                                    ))}
                            </Select>
                        </FormControl>
                        <Button disabled={!selectPermission} onClick={handleAddPermission} sx={{ marginLeft: 2 }}>
                            Tambah
                        </Button>
                    </div>

                    <Stack direction="row" style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap' }} spacing={1}>
                        {permission.map((p) => (
                            <Chip style={{ marginTop: 10 }} label={p.description} onDelete={() => handleDeletePermission(p.upCode)} />
                        ))}
                    </Stack>
                </MainCard>
            </MainCard>
            <SnackBarComponent />
        </div>
    );
}
