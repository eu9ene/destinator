import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {PlacesGrid} from "../components/placesGrid";
import {useDispatch, useSelector} from "react-redux";
import {getRecs} from "../redux/selectors";
import {loadMyPlacesIdsAll, recommendCommand} from "../redux/actions";
import {PlacesList} from "../components/placesList";


export default function Home() {
    const places = useSelector(getRecs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (places == null) {
            dispatch(recommendCommand());
                        dispatch(loadMyPlacesIdsAll());
        }
    });

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <PlacesList places={places}/>
        </Grid>
    </Grid>
}