import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import React from "react";
import {useHistory} from 'react-router';
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Grid from "@material-ui/core/Grid";

const getStyles = makeStyles((theme) => ({
    img: {
        // height: 100,
        width: 150
    },
    card: {
        // width: 300,
        // height: 150

    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));


export const PlaceSmallCard = (props) => {
    const place = props.place;
    const classes = getStyles();
    const history = useHistory();

    return (
        <Card className={classes.card}>
            <CardActionArea onClick={() => history.push(`/place/${place.id}`)}>
                <Grid container direction={'row'}>
                    <Grid item>
                        {place.imageMedium &&
                        <CardMedia
                            component="img"
                            alt={place.name}
                            image={place.imageMedium}
                            title={place.name}
                            className={classes.img}
                        />}
                    </Grid>
                    <Grid item>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h5">
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

                            </Grid>
                        </CardContent>
                    </Grid>
                </Grid>
            </CardActionArea>
        </Card>
    );
};
