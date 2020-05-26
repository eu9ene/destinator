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
import IconButton from "@material-ui/core/IconButton";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Rating from '@material-ui/lab/Rating';
import Fab from "@material-ui/core/Fab";
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';


function ImgMediaCard(props) {
    const attr = props.attr;
    const dispatch = useDispatch();

    return (
        <Card>
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
                        {attr.description.substring(0, Math.min(attr.description.length, 200))}
                    </Typography>
                </CardContent>
            </CardActionArea>
                        <Rating name="read-only" defaultValue={attr.rating} precision={0.5} readOnly />
            <CardActions>
                {/*<IconButton aria-label="loved it">*/}
                {/*    <FavoriteIcon/>*/}
                {/*</IconButton>*/}
                {/*<IconButton aria-label="been there">*/}
                {/*    <ShareIcon/>*/}
                {/*</IconButton>*/}

                {/*<Fab variant="outlined" size="small" aria-label="add">*/}
                {/*    <AddIcon />*/}
                {/*  </Fab>*/}
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

const attrStyles = makeStyles((theme) => ({
    item: {
        flexGrow: 3
    },
    // grid: {
    //     flexWrap: noWrap
    // }
}));

function Attractions() {
    // const attrs = props.attrs;
    const attractions = useSelector(getAttractions);
    const classes = attrStyles();

    // const classes = useStyles();
    return <Grid container spacing={2}>
        {/*<GridList cellHeight={200}*/}
        {/*                 // className={classes.gridList}*/}
        {/*    spacing={3}*/}
        {/*                 cols={4}>*/}
        {attractions.map((attr) => (
            // <GridListTile key={attr.name} cols={1}>
            <Grid item xs={4} className={classes.item}><ImgMediaCard key={attr.id} attr={attr}/></Grid>

            // </GridListTile>
        ))}
        {/*</GridList>*/}
    </Grid>


}

const searchStyles = makeStyles((theme) => ({
    gridText: {
        flexGrow: 8
    },
    grid: {
        padding: theme.spacing(2)
    }
}));

export function Search() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const onClick = () => dispatch(searchCommand(input));
    const classes = searchStyles();

    return <Grid container xs={12} spacing={2} className={classes.grid}>
        <Grid item xs={10} className={classes.gridText}>
            <TextField id="outlined-basic" label="What are you looking for?" variant="outlined"
                       value={input} fullWidth
                       onChange={e => setInput(e.target.value)}
            />
        </Grid>
        <Grid item xs={2}>
            <Button variant="outlined" color="primary" size="large"
                    onClick={onClick}>Search</Button>
        </Grid>
        <Grid item xs={12}>
            <Attractions/>
        </Grid>
    </Grid>

}
