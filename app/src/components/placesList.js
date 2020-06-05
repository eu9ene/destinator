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
    gridList: {
        // flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        // transform: 'translateZ(0)',
    },
}));

export const PlacesList = (props) => {
    const classes = attrStyles();
    const places = props.places;

    return <Grid container className={classes.gridList} spacing={3}>
        {places != null && [...places].map((attr, index) => (
            <Grid key={attr.id} item md={4} style={{order: index}} className={classes.item}>
                <PlaceCard attr={attr}
                           handleOnHover={() => props.handleOnHover(attr)}
                           handleMouseLeave={() => props.handleMouseLeave()}/>
            </Grid>))}
    </Grid>

};