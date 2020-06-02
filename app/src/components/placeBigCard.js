import React from "react";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import {MyPlaceActions} from "./myPlaceActions";


const mediaStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: 300
    }
}));


export function PlaceBigCard(props) {
    const attr = props.attr;
    const dispatch = useDispatch();
    const classes = mediaStyles();
    // const history = useHistory();

    return (
        <Card>

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


            <CardActions>
                <MyPlaceActions  attrId={attr.id}/>
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

