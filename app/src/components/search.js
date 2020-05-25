import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import GridList from "@material-ui/core/GridList";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {findNearbyCommand, findSimilarCommand, searchCommand} from "../redux/actions";
import {getAttractions} from "../redux/selectors";



//
// const useStyles = makeStyles((theme) => ({
//     gridList: {
//         flexWrap: 'nowrap',
//         // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//         transform: 'translateZ(0)',
//     },
//     title: {
//         color: theme.palette.primary.light,
//     },
//     titleBar: {
//         background:
//             'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//     },
// }));

const cardStyles = makeStyles({
    root: {
        Width: 300,
    },
});

function ImgMediaCard(props) {
    const classes = cardStyles();
    const attr = props.attr;
    const dispatch = useDispatch();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={attr.name}
                    height="140"
                    image={attr.image}
                    title={attr.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {attr.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {attr.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={() => dispatch(findSimilarCommand(attr.id))}>
                    Similar
                </Button>
                <Button size="small" color="primary" onClick={() => dispatch(findNearbyCommand(attr.id))}>
                    Nearby
                </Button>
            </CardActions>
        </Card>
    );
}

function Attractions() {
    // const attrs = props.attrs;
    const attractions = useSelector(getAttractions);

    // const classes = useStyles();
    return <GridList cellHeight={200}
                     // className={classes.gridList}
        spacing={3}
                     cols={4}>
        {attractions.map((attr) => (
            // <GridListTile key={attr.name} cols={1}>
            <ImgMediaCard attr={attr}/>

            // </GridListTile>
        ))}
    </GridList>


}

export function Search() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const onClick = () => dispatch(searchCommand(input));

    return <>
        <Grid item xs={12}/>
        <Grid item xs={6}>
            <TextField id="outlined-basic" label="destination" variant="outlined"
                       value={input}
                       onChange={e => setInput(e.target.value)}
            />
        </Grid>
        <Grid item xs={6}>
            <Button variant="contained" color="primary" size="large"
                    onClick={onClick}>Search</Button>
        </Grid>
        <Grid item xs={12}>
            <Attractions />
        </Grid>
    </>
}
