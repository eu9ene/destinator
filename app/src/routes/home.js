import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {PlacesGrid} from "../components/placesGrid";
import {useDispatch, useSelector} from "react-redux";
import {getRecs} from "../redux/selectors";
import {recommendCommand} from "../redux/actions";


export default function Home() {
    const places = useSelector(getRecs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (places == null) {
            dispatch(recommendCommand());
        }
    });

    return <Grid container spacing={3}>
        <Grid item xs={12}>
            <PlacesGrid places={places}/>
        </Grid>
    </Grid>
}