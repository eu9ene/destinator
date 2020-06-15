import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import React from "react";
import {useHistory} from 'react-router';
import {MyPlaceActions} from "./myPlaceActions";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";
import {Tags} from "./tags";

const getStyles = makeStyles((theme) => ({
    img: {
        height: 200
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));


export const PlaceCard = (props) => {
    const place = props.place;
    const classes = getStyles();
    const history = useHistory();
    const handleOnHover = props.handleOnHover;
    const handleMouseLeave = props.handleMouseLeave;

    return (
        <Card onMouseEnter={handleOnHover} onMouseLeave={handleMouseLeave}>
            <CardActionArea onClick={() => history.push(`/place/${place.id}`)}
            >
                {place.imageMedium &&
                <CardMedia
                    component="img"
                    alt={place.name}
                    image={place.imageMedium}
                    title={place.name}
                    className={classes.img}
                />}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {place.name}
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <div className={classes.rating}>
                                <Box mr={0.5}><Typography gutterBottom variant="caption" component="span">
                                    {place.rating}
                                </Typography></Box>
                                <Rating name="read-only" size="small"
                                        max={5} defaultValue={place.rating} precision={0.1} readOnly/>
                                <Box ml={0.5}><Typography gutterBottom variant="caption" component="span">
                                    ({place.numReviews})
                                </Typography></Box>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {place.description != null &&
                                place.description.substring(0, Math.min(place.description.length, 200))}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions disableSpacing>
                <MyPlaceActions attrId={place.id}/>
            </CardActions>
        </Card>
    );
};
