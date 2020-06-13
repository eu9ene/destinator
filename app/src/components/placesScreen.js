import Grid from "@material-ui/core/Grid";
import React, {useState} from "react";
import {PlacesMap} from "../components/map";
import {PlaceCard} from "./placeCard";
import InfiniteScroll from 'react-infinite-scroller';
import Skeleton from "@material-ui/lab/Skeleton";
import CircularProgress from "@material-ui/core/CircularProgress";


export const PlacesScreen = (props) => {
    const places = props.places;

    const [hoverPlace, setHoverPlace] = useState('');
    const [geoBounds, setGeoBounds] = useState(null);

    const handleOnHover = (place) => {
        setHoverPlace(place)
    };
    const handleMouseLeave = () => {
        setHoverPlace(null)
    };

    const handleOnBoundsChange = bounds => {
        setGeoBounds(bounds);
        window.scrollTo(0, 0);
        props.handleOnBoundsChange && props.handleOnBoundsChange(bounds);
    };

    return <Grid container spacing={3}>
        <Grid item md={7}>
            {props.addComponent}

            {places == null && <CircularProgress/>}
            {places != null &&
            <InfiniteScroll
                loadMore={(page) => props.handleLoadMore && props.handleLoadMore(geoBounds)}
                hasMore={props.hasMore}
                // threshold={0}
                pageStart={1}
            >
                <Grid container spacing={3}>
                    {[...places].map((place, index) => (
                        <Grid key={place.id} item md={6} style={{order: index}}>
                            <PlaceCard place={place}
                                       handleOnHover={() => handleOnHover(place)}
                                       handleMouseLeave={() => handleMouseLeave()}/>
                        </Grid>))}
                </Grid>
            </InfiniteScroll>}

        </Grid>
        <Grid item md={5}>
            <PlacesMap places={places}
                       mainPlace={props.mainPlace}
                       hoverPlace={hoverPlace}
                       handleOnBoundsChange={handleOnBoundsChange}/>
        </Grid>
    </Grid>
};