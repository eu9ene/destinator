import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace} from "../redux/selectors";
import {findSimilarCommand, loadPlaceCommand} from "../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {PlaceBigCard} from "../components/placeBigCard";
import {PlacesList} from "../components/placesList";
import {SimpleMap} from "../components/map";


export default function Place() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const place = useSelector(getCurrentPlace);
    const attr = place.place;

    const mapPlaces = place.similarPlaces != null && attr != null ? [attr].concat(place.similarPlaces) : [];


    useEffect(() => {
        if (attr == null || id !== place.id) {
            dispatch(loadPlaceCommand(id));
            dispatch(findSimilarCommand(id));
        }
    });

    //     {/*<Grid item md={1}>*/}
    // {/*    <Button variant={"outlined"} size={'large'} color={'primary'} onClick={() => {*/}
    // {/*        history.goBack()*/}
    // {/*    }}>Back</Button>*/}
    // {/*</Grid>*/}

    return (<>
            {attr == null && <CircularProgress/>}
            {attr != null && <Grid container spacing={3}>
                <Grid item md={7}>
                    <Grid container spacing={3}>
                        <Grid item md={12}>
                            <PlaceBigCard attr={attr}/>
                        </Grid>
                        <Grid item md={12}>
                            <Typography variant="h5" component='h2'> More like this </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <PlacesList places={place.similarPlaces}/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item md={5}>
                    <SimpleMap places={mapPlaces}/>
                </Grid>
            </Grid>
            }

        </>

    );
}

