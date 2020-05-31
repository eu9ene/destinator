import Grid from "@material-ui/core/Grid";
import React from "react";
import {PlacesGrid} from "../components/placesGrid";
import {useSelector} from "react-redux";
import {getRecs} from "../redux/selectors";


export default function Home() {
    const places = useSelector(getRecs);
    return <Grid container  spacing={3}>
        <Grid item xs={12}>
            <PlacesGrid places={places}/>
        </Grid>
    </Grid>
}