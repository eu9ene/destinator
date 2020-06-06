import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {PlaceCard} from "./placeCard";


const attrStyles = makeStyles((theme) => ({
    item: {
        // flexGrow: 1
        // width: '25%',
        // minWidth: '80px'
    },
    grid: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: '1300px',
        // width: '100%',
        // width: '1980px',
        // alignItems: 'flex-start',
        // justify: 'flex-start',
        alignContent: 'flex-start'
    }
}));

export const PlacesGrid= (props) => {
    const classes = attrStyles();
    const places = props.places;

    return <Grid container className={classes.grid} spacing={3}>
        {places != null && [...places].map((place, index) => (
            <Grid key={place.id} item md={3} style={{order: index}} className={classes.item}>
                <PlaceCard attr={place}/>
            </Grid>))}
    </Grid>

};