import React, {useEffect} from "react";
import {

    useParams
} from "react-router-dom";
import {Attractions} from "./attractions";
import {useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace} from "../redux/selectors";
import {findSimilarCommand, loadPlaceCommand} from "../redux/actions";
import Rating from "@material-ui/lab/Rating";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fab from "@material-ui/core/Fab";
import AddIcon from '@material-ui/icons/Add';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from '@material-ui/icons/Done';


const mediaStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: 400
    }
}));


function PlaceMediaCard(props) {
    const attr = props.attr;
    const dispatch = useDispatch();
    const classes = mediaStyles();
    const history = useHistory();

    return (
        <Card>
            <CardActionArea>
                {attr.image &&
                <CardMedia
                    component="img"
                    alt={attr.name}
                    image={attr.image}
                    title={attr.name}
                    className={classes.img}
                />}

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {attr.name}
                    </Typography>
                    <Rating name="read-only" defaultValue={attr.rating} precision={0.5} readOnly/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {attr.description.substring(0, Math.min(attr.description.length, 200))}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <Tooltip title="been there" aria-label="been there">
                    <IconButton aria-label="been there">
                        <DoneIcon/>
                    </IconButton>
                </Tooltip>
                <Tooltip title="loved it" aria-label="loved it">
                    <IconButton aria-label="loved it">
                        <FavoriteIcon/>
                    </IconButton>
                </Tooltip>

                <Tooltip title="to bucket list" aria-label="to bucket list">
                    <IconButton aria-label="to bucket list">
                        <AddIcon/>
                    </IconButton>
                </Tooltip>

                <Button size="small" color="primary" onClick={() => {
                    if (attr.website != null)
                        window.open(attr.website);
                }}>
                    Website
                </Button>
                {/*<Button size="small" color="primary" onClick={() => dispatch(findNearbyCommand(attr.id))}>*/}
                {/*    Nearby*/}
                {/*</Button>*/}
                {/*<IconButton aria-label="loved it">*/}
                {/*    <FavoriteIcon/>*/}
                {/*</IconButton>*/}
            </CardActions>


        </Card>
    );
}


export function Place() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let {id} = useParams();
    const place = useSelector(getCurrentPlace);
    let attr = place.place;
    useEffect(() => {
        if (attr == null || id !== place.id) {
            attr = null;
            dispatch(loadPlaceCommand(id));
            dispatch(findSimilarCommand(id));
        }
    });

    const dispatch = useDispatch();
    const history = useHistory();


    return (<Grid container md={12} spacing={3} >
            <Grid item md={1}>
                <Button variant={"outlined"} size={'large'} color={'primary'} onClick={() => {
                    history.goBack()
                }}>Back</Button>
            </Grid>

            {attr == null && <CircularProgress/>}
            {attr != null &&
            <>
                <Grid item md={11}>
                    <PlaceMediaCard attr={attr}/>

                </Grid>
                <Grid item md={12}>
                    <Typography variant="h5" component='h2'> More like this </Typography>
                </Grid>
                <Grid item md={12}>

                    <Attractions/>
                </Grid>
            </>}

        </Grid>


        // <div>
        //    <i className="icon list arrow left" onClick={() => { history.goBack()}}/>
        //   <h3>ID: {id}</h3>
        //   <Attractions/>
        // </div>
    );
}

