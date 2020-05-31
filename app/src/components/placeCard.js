import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import React from "react";
import {useHistory} from 'react-router';

const mediaStyles = makeStyles((theme) => ({
    img: {
        height: 200
    }
}));


export function ImgMediaCard(props) {
    const attr = props.attr;
    const classes = mediaStyles();
    const history = useHistory();

    return (
        <Card>
            <CardActionArea onClick={() => history.push(`/place/${attr.id}`)}>
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
                    <Typography variant="body2" color="textSecondary" component="p">
                        {attr.description.substring(0, Math.min(attr.description.length, 200))}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}