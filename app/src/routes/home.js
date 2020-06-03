import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecs} from "../redux/selectors";
import {loadMyPlacesIdsAll, recommendCommand} from "../redux/actions";
import {PlacesList} from "../components/placesList";
import {SimpleMap} from "../components/map";


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
        <Grid item md={7}>
            <PlacesList places={places}/>
        </Grid>
        <Grid item md={5} >
                <SimpleMap places={places}/>
        </Grid>
    </Grid>
}