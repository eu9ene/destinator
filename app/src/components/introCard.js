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
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";

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


export const IntroCard = (props) => {
    const classes = getStyles();
    const history = useHistory();

    return (
        <Card>
            <CardActionArea onClick={() => history.push("/myplaces")}
            >
                {/*{place.imageMedium &&*/}
                {/*<CardMedia*/}
                {/*    component="img"*/}
                {/*    alt={place.name}*/}
                {/*    image={place.imageMedium}*/}
                {/*    title={place.name}*/}
                {/*    className={classes.img}*/}
                {/*/>}*/}
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Like more!
                    </Typography>
                    <Grid container spacing={1}>

                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Add more places you love to get personalized recommendations
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Start exploring with Top places or Search
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <FavoriteBorderIcon/> loved
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <DoneIcon/> been there, remove from recommendaitons
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <AddIcon/> add to my bucket list
                            </Typography>


                        </Grid>
                    </Grid>
                </CardContent>

            </CardActionArea>
        </Card>
    );
};
