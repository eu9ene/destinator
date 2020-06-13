import React, {useEffect} from 'react';
import GoogleMapReact from 'google-map-react';
import PlaceIcon from '@material-ui/icons/Place';
import IconButton from "@material-ui/core/IconButton";
import {useHistory} from 'react-router';
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {getGoogleKey} from "../redux/selectors";
import {loadSecretsCommand} from "../redux/actions";
import Popover from "@material-ui/core/Popover";
import Box from "@material-ui/core/Box";
import {PlaceSmallCard} from "./placeSmallCard";

const useStyles = makeStyles((theme) => ({
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    marker: {
        position: 'absolute',
        transform: 'translate(-50%, -100%)'
    }
}));

const Marker = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const place = props.place;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [color, setColor] = React.useState(props.color);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setColor('secondary')
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setColor(props.color);
    };

    const open = Boolean(anchorEl);

    return <>
        <IconButton className={classes.marker} onClick={() => history.push(`/place/${place.id}`)}>
            <PlaceIcon color={color} fontSize={props.fontSize}
                       aria-owns={open ? 'mouse-over-popover' : undefined}
                       aria-haspopup="true"
                       onMouseEnter={handlePopoverOpen}
                       onMouseLeave={handlePopoverClose}/>
        </IconButton>
        <Popover
            id="mouse-over-popover"
            className={classes.popover}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            // disableRestoreFocus
        >

            <PlaceSmallCard place={place}/>
        </Popover>

    </>

};

const getStyles = makeStyles((theme) => ({
    map: {
        height: '90%', width: '40%', position: 'fixed'
    }
}));


export const PlacesMap = props => {
    const googleKey = useSelector(getGoogleKey);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadSecretsCommand());
    }, []);

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
            // center={center}
            defaultZoom={8}
            onChange={onChange}
            distanceToMouse={() => {
            }}>

            {places != null && places.map(p =>
                (p !== hoverPlace && <Marker key={p.id}
                                             lat={p.latitude}
                                             lng={p.longitude}
                                             place={p}
                                             color={'action'}
                                             fontSize={'large'}/>))}
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
        </GoogleMapReact>
        }
    </Paper>
};



