import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import {PlacesList} from "../components/placesList";
import {PlacesMap} from "../components/map";


export const PlacesScreen = (props) => {
    const places = props.places;
    const handleOnBoundsChange = props.handleOnBoundsChange;
    const addComponent = props.addComponent;
    const mainPlace = props.mainPlace;

    const [hoverPlace, setHoverPlace] = useState('');
    const handleOnHover = (place) => {
        setHoverPlace(place)
    };
    const handleMouseLeave = () => {
        setHoverPlace(null)
    };

    return <Grid container spacing={3}>
        <Grid item md={7}>
            {addComponent}
            <PlacesList places={places}
                        handleOnHover={handleOnHover}
                        handleMouseLeave={handleMouseLeave}/>
        </Grid>
        <Grid item md={5}>
            <PlacesMap places={places}
                       mainPlace={mainPlace}
                       hoverPlace={hoverPlace}
                       handleOnBoundsChange={handleOnBoundsChange}/>
        </Grid>
    </Grid>
};