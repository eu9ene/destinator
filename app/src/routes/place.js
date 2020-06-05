import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace} from "../redux/selectors";
import {findSimilarCommand, loadPlaceCommand} from "../redux/actions";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import {PlaceBigCard} from "../components/placeBigCard";

import {PlacesScreen} from "../components/placesScreen";


export default function Place() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const place = useSelector(getCurrentPlace);
    const attr = place.place;
    const similarPlaces = place.similarPlaces;

    useEffect(() => {
        if (attr == null || id !== place.id) {
            dispatch(loadPlaceCommand(id));
            dispatch(findSimilarCommand(id));
        }
    });

    const handleOnBoundsChange = (bounds) => {
        dispatch(findSimilarCommand(id, bounds))
    };

    //     {/*<Grid item md={1}>*/}
    // {/*    <Button variant={"outlined"} size={'large'} color={'primary'} onClick={() => {*/}
    // {/*        history.goBack()*/}
    // {/*    }}>Back</Button>*/}
    // {/*</Grid>*/}

    return (<>
            {attr == null && <CircularProgress/>}
            {attr != null &&
            <PlacesScreen mainPlace={attr}
                          places={similarPlaces}
                          handleOnBoundsChange={handleOnBoundsChange}
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

