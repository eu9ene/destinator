import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace, getPlaces} from "../redux/selectors";
import {
    findMoreSimilarCommand,
    findSimilarCommand,
    loadPlaceCommand
} from "../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {PlaceBigCard} from "../components/placeBigCard";

import {PlacesScreen} from "../components/placesScreen";
import Fab from "@material-ui/core/Fab";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {useHistory} from 'react-router';
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        top: theme.spacing(10),
        left: theme.spacing(2),
    }
}));


export default function Place() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const place = useSelector(getCurrentPlace);
    let attr = place.place;
    const {places, hasMore} = useSelector(getPlaces);
    const history = useHistory();
    const classes = useStyles();

    useEffect(() => {
        dispatch(loadPlaceCommand(id));
        dispatch(findSimilarCommand(id));
    }, [id]);

    return (<>
            {/*<Fab color="primary" aria-label="add" className={classes.fab}>*/}
            {/*    <ArrowBackIcon onClick={() => {*/}
            {/*        history.goBack()*/}
            {/*    }}/>*/}
            {/*</Fab>*/}
            {attr == null && <CircularProgress/>}
            {attr != null &&
            <PlacesScreen mainPlace={attr}
                          places={places}
                          handleOnBoundsChange={bounds => dispatch(findSimilarCommand(id, bounds))}
                          handleLoadMore={bounds =>
                              dispatch(findMoreSimilarCommand(id, !places ? 0 : places.length, bounds))}
                          hasMore={hasMore}
                          addComponent={
                              <Grid container spacing={3}>
                                  <Grid item md={12}>
                                      <PlaceBigCard attr={attr}/>
                                  </Grid>
                                  <Grid item md={12}>
                                      <Typography variant="h5" component='h2'> More like
                                          this </Typography>
                                  </Grid>
                              </Grid>
                          }
            />
            }
        </>
    );
}

