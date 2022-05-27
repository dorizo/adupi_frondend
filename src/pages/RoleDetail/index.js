import { Button, Chip, FormControl, InputLabel, Select, Stack, Typography } from '@mui/material';
import LoadingComponent from 'components/LoadingComponent';
import useSnackbar from 'components/SnackBar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { ADD_ROLE_PERMISSION, DELETE_ROLE_PERMISSION, ROLE_ALL_PERMISSION } from 'services/role';
import { GET_PERMISSIONS } from 'services/user';
import MainCard from 'ui-component/cards/MainCard';

export default function Index() {
    const params = useParams();
    const [selectPermission, setSelectPermission] = useState('');
    const [loading, setLoading] = useState(false);
    const { snackBarOpen, SnackBarComponent } = useSnackbar();
    const { data, isLoading, refetch } = useQuery('ROLE_ALL_PERMISSION', () => ROLE_ALL_PERMISSION(params.id));

    const { data: permiss, isLoading: lpermiss } = useQuery('GET_PERMISSIONS', GET_PERMISSIONS);

    if (isLoading || lpermiss || loading) {
        return <LoadingComponent />;
    }
    const result = data && data.data;

    const permissions = permiss && permiss.data;

    const handleDeletePermission = async (code) => {
        setLoading(true);

        const rst = await DELETE_ROLE_PERMISSION(code);

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

        const rst = await ADD_ROLE_PERMISSION(params.id, selectPermission);

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
                <h5>Role Permission</h5>
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
                                                    <option value={p.permissionCode}>{p.description}</option>
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

                    {result.data[0].module &&
                        result.data[0].module.map((p) => (
                            <>
                                <Typography>{p.module}</Typography>
                                <Stack direction="row" style={{ marginTop: 4, display: 'flex', flexWrap: 'wrap' }} spacing={1}>
                                    {p.permission.map((m) => (
                                        <Chip
                                            style={{ marginTop: 10 }}
                                            label={m.description}
                                            onDelete={() => handleDeletePermission(m.rpCode)}
                                        />
                                    ))}
                                </Stack>
                            </>
                        ))}
                </MainCard>
            </MainCard>
            <SnackBarComponent />
        </div>
    );
}
