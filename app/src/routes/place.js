import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {PlacesGrid} from "../components/placesGrid";
import {useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace, getMyPlaces, getMyPlacesIds, getPlaces, getRecs} from "../redux/selectors";
import {findSimilarCommand, loadMyPlacesIdsAll, loadPlaceCommand} from "../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {PlaceBigCard} from "../components/placeBigCard";
import {PlacesList} from "../components/placesList";


export default function Place() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const place = useSelector(getCurrentPlace);
    let attr = place.place;

    useEffect(() => {
        if (attr == null || id !== place.id) {
            attr = null;
            dispatch(loadPlaceCommand(id));
            dispatch(findSimilarCommand(id));
        }
    });

    return (<Grid container spacing={3}>
            {/*<Grid item md={1}>*/}
            {/*    <Button variant={"outlined"} size={'large'} color={'primary'} onClick={() => {*/}
            {/*        history.goBack()*/}
            {/*    }}>Back</Button>*/}
            {/*</Grid>*/}

            {attr == null && <CircularProgress/>}
            {attr != null &&
            <>
                <Grid item md={12}>
                    <PlaceBigCard attr={attr}/>
                </Grid>
                <Grid item md={12}>
                    <Typography variant="h5" component='h2'> More like this </Typography>
                </Grid>
                <Grid item md={12}>
                    <PlacesList places={place.similarPlaces}/>
                </Grid>
            </>}

        </Grid>

    );
}

