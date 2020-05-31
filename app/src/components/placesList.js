import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import React from "react";
import {ImgMediaCard} from "./placeCard";
import GridList from "@material-ui/core/GridList";


const attrStyles = makeStyles((theme) => ({
    item: {
        // flexGrow: 1
        // width: '25%',
        // minWidth: '80px'
    },
    gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
}));

export function PlacesList(props) {
    // const attractions = useSelector(getAttractions);
    const classes = attrStyles();
    // const dispatch = useDispatch();
    // const hasMore = useSelector(getHasMore);
    const places = props.places;

    return <GridList  className={classes.gridList} cols={3.5}>
        {places != null && [...places].map((attr, index) => (
            <Grid key={attr.id} item md={3} style={{order: index}} className={classes.item}>
                <ImgMediaCard  attr={attr}/>
            </Grid>))}
    </GridList>

}