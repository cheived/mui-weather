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

    function getApi(city) {
        setLoading(true);
        fetch(`https://api.pexels.com/v1/search?query=${city.split(',')[0]}&per_page=1`, {
            headers: {
                Authorization: 'Nkc7Mom1PPnJBnr6TNrtfNYZUBs3JE6jlnXOnIHILPWEY0aok1AbRVd2'
            }
        })
            .then(res => res.json())
            .then(img => {
                fetch(`https://api.weatherapi.com/v1/forecast.json?key=e3ea5926f9074031a78195423230312&q=${city}&days=3&lang=en`)
                    .then((res) => {
                        if (res.ok) {
                            res.json().then(res => {
                                setAlert(<Alert variant="outlined" severity="success">{res.location.name} successfully added</Alert>)

                                props.setState(oldState => {
                                    return [...oldState, { ...res, type: { home: true, favorite: false }, img: img }]
                                })
                            })
                        } else {
                            res.json().then(res => { setAlert(<Alert variant="outlined" severity="error">{res.error.message}</Alert>) })
                        }
                    })
                    .finally(() => {
                        setLoading(false);
                        setState('');
                        setTimeout(() => { setAlert() }, 3000)
                    })
            })
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

    function handleInput(event) {
        getSearch(event.target.value)
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
                    onInput={handleInput}
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




