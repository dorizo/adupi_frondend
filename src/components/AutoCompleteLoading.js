import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import PropTypes from 'prop-types';

export default function AutoCompleteLoading({
  options = [],
  loading = false,
  value,
  onChange,
  label = 'Label',
  name,
  id,
}) {
  return (
    <Autocomplete
      id="asynchronous-demo"
      isOptionEqualToValue={(option, value) => option?.title === value?.title}
      getOptionLabel={(option) => option?.title}
      options={options}
      onChange={onChange}
      value={value}
      fullWidth
      loading={loading}
      renderInput={(params) => (
        <TextField
          name={name}
          id={id}
          variant="standard"
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <div>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </div>
            ),
          }}
        />
      )}
    />
  );
}

AutoCompleteLoading.propTypes = {
  options: PropTypes.array,
  loading: PropTypes.bool,
  value: PropTypes.object,
  onChange: PropTypes.func,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};
