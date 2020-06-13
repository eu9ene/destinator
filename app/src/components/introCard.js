import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import React from "react";
import {useHistory} from 'react-router';
import Grid from "@material-ui/core/Grid";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import DoneIcon from "@material-ui/icons/Done";
import AddIcon from "@material-ui/icons/Add";
import {Link} from "react-router-dom";

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
            <CardActionArea onClick={() => history.push("/top")}
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
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Add more places you love to get personalized recommendations
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                Start exploring with Top places or Search
                            </Typography>
                        </Grid>
                        <Grid item xs={12} container spacing={3}>
                            <Grid container item xs={12} justify="center" spacing={1}>
                                <Grid item>
                                    <FavoriteBorderIcon color={"secondary"}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Check places you love to get personalized recommendations
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} justify="center" spacing={1}>
                                <Grid item>
                                    <DoneIcon color={"secondary"}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        If you've already been there, a place will be removed from recommendaitons
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container item xs={12} justify="center" spacing={1}>
                                <Grid item>
                                    <AddIcon color={"secondary"}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Add a place to your personal bucket list
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>


                </CardContent>

            </CardActionArea>
        </Card>
    );
};
