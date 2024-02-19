import { Grid } from "@mui/material"
import Conditions from "../conditions/Conditions"
import TempChart from "../tempChart/TempChart"
import Forecast24 from "../forecast24/Forecast24"
function LocationPage(props) {
    return (
        <>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                <Grid item xs={12} lg={6}>
                    <Conditions info={props.info}></Conditions>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <TempChart info={props.info}></TempChart>
                </Grid>
                <Grid item xs={12}>
                    <Forecast24 info={props.info} num={0}></Forecast24>
                </Grid>
                <Grid item xs={12}>
                    <Forecast24 info={props.info} num={1}></Forecast24>
                </Grid>
            </Grid>
        </>
    )
}

export default LocationPage