import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@material-ui/icons/Place';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from 'react-router';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getGoogleKey} from "../redux/selectors";
import {loadSecretsCommand} from "../redux/actions";

const Marker = React.memo((props) => {
    const history = useHistory();
    const place = props.place;
    return <Tooltip title={place.name}>
        <IconButton onClick={() => history.push(`/place/${place.id}`)}>
            <PlaceIcon color={props.color} fontSize={props.fontSize}/>
        </IconButton>
    </Tooltip>
});

const getStyles = makeStyles((theme) => ({
    map: {
        height: '90%', width: '40%', position: 'fixed'
    }
}));


export const PlacesMap = props => {
    const googleKey = useSelector(getGoogleKey);
    const dispatch = useDispatch();

    useEffect(() => {
        if (googleKey == null)
            dispatch(loadSecretsCommand());
    });

    const places = props.places;
    const hoverPlace = props.hoverPlace;
    const mainPlace = props.mainPlace;

    const defaultCenter = {lat: 49.273, lng: -123.203};
    const classes = getStyles();
    const centerPlace = mainPlace != null
        ? mainPlace
        : places != null && places.length > 0
            ? places[0]
            : null;

    const center = centerPlace != null
        ? {
            lat: centerPlace.latitude,
            lng: centerPlace.longitude
        }
        : defaultCenter;

    const onChange = ({center, zoom, bounds, marginBounds}) => {
        if (props.handleOnBoundsChange != null)
            props.handleOnBoundsChange(bounds)
    };

    return <Paper className={classes.map}>
        {googleKey && <GoogleMapReact
            bootstrapURLKeys={{key: googleKey}}
            defaultCenter={center}
            defaultZoom={8}
            onChange={onChange}
            distanceToMouse={() => {
            }}>

            {places != null && places.map(p =>
                (p !== hoverPlace && <Marker key={p.id}
                                             lat={p.latitude}
                                             lng={p.longitude}
                                             place={p}
                                             color={'default'}
                                             fontSize={'medium'}/>))}
            {hoverPlace != null && <Marker key={hoverPlace.id}
                                           lat={hoverPlace.latitude}
                                           lng={hoverPlace.longitude}
                                           place={hoverPlace}
                                           color={'secondary'}
                                           fontSize={'large'}/>}
            {mainPlace != null && <Marker key={mainPlace.id}
                                          lat={mainPlace.latitude}
                                          lng={mainPlace.longitude}
                                          place={mainPlace}
                                          color={'primary'}
                                          fontSize={'large'}/>}
            < /GoogleMapReact>}
                </Paper>
                };



