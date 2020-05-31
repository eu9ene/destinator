import React, {useEffect} from "react";
import {

    useParams
} from "react-router-dom";
import {PlacesGrid} from "./placesGrid";
import {useHistory} from "react-router";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentPlace} from "../redux/selectors";
import {addPlace, findSimilarCommand, loadPlaceCommand, removePlace} from "../redux/actions";
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
import {MyPlaceType} from "../redux/constants";
import * as PropTypes from "prop-types";


const mediaStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: 300
    }
}));


function MyPlaceAction(props) {
    const dispatch = useDispatch();
    return <Tooltip title={props.label} aria-label={props.label}>
        {props.myPlacesIds[props.type] != null && props.myPlacesIds[props.type].has(props.attrId)
            ? <IconButton aria-label={props.label}
                          color="secondary"
                          onClick={() => dispatch(removePlace(props.attrId, props.type))}>
                {props.icon}
            </IconButton>
            : < IconButton aria-label={props.label}
                           onClick={() => dispatch(addPlace(props.attrId, props.type))}>
                {props.icon}
            </IconButton>
        }
    </Tooltip>;
}

MyPlaceAction.propTypes = {
    myPlaces: PropTypes.any,
    onClick: PropTypes.func,
    onClick1: PropTypes.func
};

export function PlaceBigCard(props) {
    const attr = props.attr;
    const myPlacesIds = props.myPlacesIds;
    const dispatch = useDispatch();
    const classes = mediaStyles();
    // const history = useHistory();

    return (
        <Card>
            <CardActionArea>
                {attr.image &&
                <CardMedia
                    component="img"
                    alt={attr.name}
                    image={attr.image}
                    title={attr.name}
                    className={classes.img}/>}

                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {attr.name}
                    </Typography>
                    <Rating name="read-only" defaultValue={attr.rating} precision={0.5} readOnly/>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {attr.description}
                    </Typography>
                </CardContent>
            </CardActionArea>

            <CardActions>
                <MyPlaceAction myPlacesIds={myPlacesIds} attrId={attr.id} label={"been there"} type={MyPlaceType.Been}
                               icon={<DoneIcon/>}/>
                <MyPlaceAction myPlacesIds={myPlacesIds} attrId={attr.id} label={"loved it"} type={MyPlaceType.Loved}
                               icon={<FavoriteIcon/>}/>
                <MyPlaceAction myPlacesIds={myPlacesIds} attrId={attr.id} label={"to bucket list"}
                               type={MyPlaceType.BucketList} icon={<AddIcon/>}/>

                <Button size="small" color="primary" onClick={() => {
                    if (attr.website != null)
                        window.open(attr.website);
                }}>
                    Website
                </Button>

            </CardActions>


        </Card>
    );
}

