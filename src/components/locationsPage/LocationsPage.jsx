import { useCallback } from "react";
import { Typography, Grid } from "@mui/material";
import LocationCard from "../locationCard/LocationCard";

function LocationsPage(props) {
    const renderItem = useCallback((item, i) => {
        if (item.type[props.type]) {
            return (
                <Grid item xs={12} sm={4} md={4} key={i}>
                    <LocationCard location={item} setState={props.setState} iteration={i}></LocationCard>
                </Grid>)
        }
    }, [props.type, props.setState])

    return (
        <>
            <Typography variant='h5' sx={{ mb: 2 }}>{props.title}</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {props.locations.map(renderItem)}
            </Grid>
        </>
    )
}

export default LocationsPage