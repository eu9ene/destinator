import Grid from "@material-ui/core/Grid";
import React from "react";
import {Attractions} from "./attractions";


export function Home() {
    return <Grid container xs={12} spacing={3}>
        <Grid item xs={12}>
            <Attractions/>
        </Grid>
    </Grid>
}