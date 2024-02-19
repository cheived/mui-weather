import { Box, Card, CardContent, Typography } from "@mui/material"
import NorthIcon from '@mui/icons-material/North';
function Conditions(props) {

    return (
        <Card >
            <CardContent >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="h5">{props.info.current.condition.text}</Typography>
                    <img src={props.info.current.condition.icon} width='32px' alt='condition' />
                </Box>
                <Typography variant="h5" sx={{ mt: 1 }}> {props.info.current.temp_c}ºC</Typography>
                <Typography color="text.secondary">Feels like: {Math.floor(props.info.current.feelslike_c)}ºC</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Typography variant="h5">Wind: {props.info.current.wind_dir}</Typography>
                    <NorthIcon sx={{ transform: `rotate(${props.info.current.wind_degree}deg)` }}></NorthIcon>
                </Box>
                <Typography variant="h5">UV index: {props.info.current.uv}</Typography>
                <Typography variant="h5">Pressure: {Math.floor(props.info.current.pressure_mb / 1.333)} mmHg</Typography>
                <Typography variant="h5">Humidity: {props.info.current.humidity}%  </Typography>
            </CardContent>
        </Card >
    )
}

export default Conditions