import { Card, CardContent, Typography, CardActions, Button, CardMedia, ButtonGroup } from "@mui/material"
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link as RouterLink } from 'react-router-dom';
import notFound from '../../img/imageNotFound.jpg'
function LocationCard(props) {
    function addPlus(number) {
        if (number > 0) {
            return `+${Math.floor(number)}`
        }
        return Math.floor(number)
    }

    function handleButton(btn) {
        props.setState((prevState) => {
            prevState[props.iteration].type[btn] = !prevState[props.iteration].type[btn]
            return [...prevState]
        })
    }

    return (
        <Card >
            <CardMedia
                sx={{ height: 200 }}
                image={props.location.img.photos[0]?.src.medium ? props.location.img.photos[0].src.medium : notFound}
                title="title"
            />
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.location.location.country}
                </Typography>
                <Typography variant="h5" component="div">
                    {props.location.location.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.location.current.condition.text}
                </Typography>
                <Typography variant="subtitle1">
                    Current: {addPlus(props.location.current.temp_c)}
                </Typography>
                <Typography color="text.secondary">
                    from {addPlus(props.location.forecast.forecastday[0].day.mintemp_c)} to {addPlus(props.location.forecast.forecastday[0].day.maxtemp_c)}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" size="small" component={RouterLink} to={`/${props.location.location.name}`}>Open</Button>
                <ButtonGroup variant="outlined">
                    <Button size="small" variant={props.location.type.favorite ? "contained" : "outlined"} onClick={() => handleButton('favorite')} >
                        <FavoriteBorderOutlinedIcon></FavoriteBorderOutlinedIcon>
                    </Button>
                    <Button size="small" variant={props.location.type.home ? "contained" : "outlined"} onClick={() => handleButton('home')}>
                        <AddOutlinedIcon></AddOutlinedIcon>
                    </Button>
                </ButtonGroup>
            </CardActions>
        </Card >
    )
}

export default LocationCard