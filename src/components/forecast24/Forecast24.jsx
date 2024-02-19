import { Box, Card, CardContent, Divider, Stack, Typography } from "@mui/material"

function Forecast24(props) {

    function calcForecast(arr) {
        const today = arr.forecast.forecastday[props.num].hour.filter((item) => {
            if (new Date() <= new Date(item.time) || new Date().getHours() === new Date(item.time).getHours()) {
                return item
            }
        })
        if (today.length < 24) {
            return [...today, ...arr.forecast.forecastday[props.num + 1].hour].slice(0, 24)
        }
        return today
    }
    return (
        <Card>
            <CardContent sx={{ display: 'grid', gap: 1.5 }}>
                <Typography variant="h5">{props.num === 0 ? '24-hours forecast' : 'Tomorrow forecast'}</Typography>
                <Stack direction={'row'} gap={2} sx={{ overflow: 'auto', }} >
                    {calcForecast(props.info).map((item) => {
                        return (
                            <Box sx={{ textAlign: 'center' }} >
                                <Typography color={'text.secondary'} >
                                    {new Date(item.time).getHours() + ':00'}
                                </Typography>
                                <Divider></Divider>
                                <Typography mt={0.5}>{Math.floor(item.temp_c)}ºC</Typography>
                            </Box>
                        )
                    })}



                </Stack>

            </CardContent>
        </Card >
    )
}

export default Forecast24