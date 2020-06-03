import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@material-ui/icons/Place';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from 'react-router';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";

const Marker = React.memo(({place}) => {
    const history = useHistory();
    return <Tooltip title={place.name}>
        <IconButton onClick={() => history.push(`/place/${place.id}`)}>
            <PlaceIcon fontSize='large'/></IconButton>
    </Tooltip>
});

const getStyles = makeStyles((theme) => ({
    map: {
        height: '88%', width: '40%', position: 'fixed'
    }
}));

export const SimpleMap = React.memo(props => {
    const places = props.places;
    const defaultCenter = {lat: 49.273, lng: -123.203};
    const classes = getStyles();
    const center = places != null && places.length > 0
        ? {
            lat: places[0].latitude,
            lng: places[0].longitude
        }
        : defaultCenter;

    // todo: token to env
    return <Paper className={classes.map}>
        <GoogleMapReact
            bootstrapURLKeys={{key: ""}}
            defaultCenter={center}
            defaultZoom={10}
        >
            {places != null && places.map(p =>
                (<Marker key={p.id}
                         lat={p.latitude}
                         lng={p.longitude}
                         place={p}
                />))}
        </GoogleMapReact>
    </Paper>
});



