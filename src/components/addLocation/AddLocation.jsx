import { LoadingButton } from "@mui/lab"
import { Typography, Box, TextField, Alert, Autocomplete } from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';

function AddLocation(props) {
    const [state, setState] = useState('');
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState('');
    const [searchLoading, setSearchLoading] = useState(false)
    const [searchResult, setSearchResult] = useState([])

    async function getApi(city) {
        setLoading(true);
        await Promise.all([
            fetch(`https://api.pexels.com/v1/search?query=${city.split(',')[0]}&per_page=1`, {
                headers: {
                    Authorization: 'Nkc7Mom1PPnJBnr6TNrtfNYZUBs3JE6jlnXOnIHILPWEY0aok1AbRVd2'
                }
            })
                .then(res => res.json()),
            fetch(`https://api.weatherapi.com/v1/forecast.json?key=e3ea5926f9074031a78195423230312&q=${city}&days=3&lang=en`)
                .then(res => res.json())
        ])
            .then(res => {
                setAlert(<Alert variant="outlined" severity="success">{res[1].location.name} successfully added</Alert>)
                props.setState(oldState => [...oldState, { ...res[1], type: { home: true, favorite: false }, img: res[0] }])
            })
            .catch((error) => {
                setAlert(<Alert variant="outlined" severity="error">Error: {error.message}</Alert>)
            })
            .finally(() => {
                setLoading(false);
                setState('');
                setTimeout(() => { setAlert() }, 3000)
            });
    }

    async function getSearch(input) {
        if (input.length > 0) {
            setSearchLoading(true);
            return await fetch(`https://api.weatherapi.com/v1/search.json?key=e3ea5926f9074031a78195423230312&q=${input}`)
                .then(res => res.json().then(res => {
                    setSearchResult(res)
                    setSearchLoading(false);
                }))
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, textAlign: 'center' }}>
            <Typography variant="h5">Add your own location</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Autocomplete
                    disablePortal
                    noOptionsText={'Start enter...'}
                    autoHighlight={true}
                    // blurOnSelect={true}
                    options={searchResult.map((item) => {
                        return `${item.name}, ${item.region}, ${item.country}`
                    })}
                    onInput={event => getSearch(event.target.value)}
                    sx={{ width: 200 }}
                    renderInput={(params) => <TextField value={state} onInput={event => setState(event.target.value)} {...params} label="Enter location"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {searchLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />}
                />
                <LoadingButton
                    disabled={state.length < 1}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<AddIcon />}
                    variant="contained"
                    onClick={() => getApi(state)}
                >
                    Add
                </LoadingButton>
            </Box>
            {alert}
        </Box>
    )
}

export default AddLocation




