import React from "react";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {MyPlaceActions} from "./myPlaceActions";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";


const mediaStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: 300
    },
    rating: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));


export const PlaceBigCard =  (props) =>{
    const attr = props.attr;
    const classes = mediaStyles();

    return (
        <Card>

            {attr.imageLarge &&
            <CardMedia
                component="img"
                alt={attr.name}
                image={attr.imageLarge}
                title={attr.name}
                className={classes.img}/>}

            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {attr.name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div className={classes.rating}>
                            <Box mr={1}><Typography gutterBottom variant="button" component="span">
                                {attr.rating}
                            </Typography></Box>
                            <Rating name="read-only" defaultValue={attr.rating} precision={0.1} readOnly/>
                            <Box ml={1}><Typography gutterBottom variant="button" component="span">
                                ({attr.numReviews})
                            </Typography></Box>
                        </div>
                    </Grid>
                    <Grid item>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {attr.description}
                        </Typography>
                    </Grid>
                </Grid>

            </CardContent>


            <CardActions disableSpacing>
                <MyPlaceActions attrId={attr.id}/>
                <Box ml={'auto'}>
                    {attr.website != null && attr.website !== "" &&
                    <Box mr={2} component='span'>
                        <Link variant="button" href={attr.website}>Website</Link>
                    </Box>}
                    <Box mr={2} component='span'>
                        <Link variant="button" href={`https://www.google.ca/search?q=${attr.name}`}>Google</Link>
                    </Box>
                    <Box mr={2} component='span'>
                        <Link variant="button" href={attr.tripadvisorUrl}>TripAdvisor</Link>
                    </Box>
                </Box>

            </CardActions>


        </Card>
    );
};

