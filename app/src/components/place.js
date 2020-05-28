import React from "react";
import {

    useParams
} from "react-router-dom";
import {Attractions} from "./attractions";
import {useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace} from "../redux/selectors";
import {loadPlaceCommand} from "../redux/actions";
import Rating from "@material-ui/lab/Rating";

export function Place() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let {id} = useParams();
    const dispatch = useDispatch();
    dispatch(loadPlaceCommand(id));
    const attr = useSelector(getCurrentPlace());
    const history = useHistory();

    if (attr == null) {
        return <></>
    }

    return (<Grid container xs={12} spacing={3}>
            <Grid item xs={2}>
                <Button variant={"outlined"} size={'large'}  color={'primary'}  onClick={() => {
                    history.goBack()
                }}>Back</Button>
            </Grid>

            <Grid item xs={10}>
                <h2>{attr.name}</h2>
                <Rating name="read-only" defaultValue={attr.rating} precision={0.5} readOnly/>
                <p>{attr.description}</p>
            </Grid>

            <Grid item xs={12}>
                <Attractions/>
            </Grid>

        </Grid>


        // <div>
        //    <i className="icon list arrow left" onClick={() => { history.goBack()}}/>
        //   <h3>ID: {id}</h3>
        //   <Attractions/>
        // </div>
    );
}