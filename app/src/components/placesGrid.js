import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {getPlaces, getHasMore} from "../redux/selectors";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {ImgMediaCard} from "./placeCard";


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

export function PlacesGrid(props) {
    // const attractions = useSelector(getAttractions);
    const classes = attrStyles();
    // const dispatch = useDispatch();
    // const hasMore = useSelector(getHasMore);
    const places = props.places;

    return <Grid container className={classes.grid} spacing={3}>
        {places != null && [...places].map((attr, index) => (
            <Grid key={attr.id} item md={3} style={{order: index}} className={classes.item}>
                <ImgMediaCard  attr={attr}/>
            </Grid>))}
    </Grid>

}