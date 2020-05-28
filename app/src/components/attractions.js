import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import {findSimilarCommand} from "../redux/actions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import {getAttractions, getHasMore} from "../redux/selectors";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { useHistory } from 'react-router';

const mediaStyles = makeStyles((theme) => ({
    img: {
        // width: '100%',
        height: 200
    }
}));


function ImgMediaCard(props) {
    const attr = props.attr;
    const dispatch = useDispatch();
    const classes = mediaStyles();
    const history = useHistory();

    return (
        <Card>
            <CardActionArea onClick={() => dispatch(findSimilarCommand(attr.id, history))}>
            {/*<CardActionArea onClick={() => history.push(`/place/${attr.id}`)}>*/}

                <CardMedia
                    component="img"
                    alt={attr.name}
                    image={attr.image}
                    title={attr.name}
                    className={classes.img}
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
            <Rating name="read-only" defaultValue={attr.rating} precision={0.5} readOnly/>
            {/*<CardActions>*/}
            {/*<IconButton aria-label="loved it">*/}
            {/*    <FavoriteIcon/>*/}
            {/*</IconButton>*/}
            {/*<IconButton aria-label="been there">*/}
            {/*    <ShareIcon/>*/}
            {/*</IconButton>*/}

            {/*<Fab variant="outlined" size="small" aria-label="add">*/}
            {/*    <AddIcon />*/}
            {/*  </Fab>*/}
            {/*<Button size="small" color="primary" onClick={() => dispatch(findSimilarCommand(attr.id))}>*/}
            {/*    Similar*/}
            {/*</Button>*/}
            {/*<Button size="small" color="primary" onClick={() => dispatch(findNearbyCommand(attr.id))}>*/}
            {/*    Nearby*/}
            {/*</Button>*/}
            {/*<IconButton aria-label="loved it">*/}
            {/*    <FavoriteIcon/>*/}
            {/*</IconButton>*/}
            {/*</CardActions>*/}


        </Card>
    );
}

const attrStyles = makeStyles((theme) => ({
    item: {
        // flexGrow: 1
        // width: '25%',
        // minWidth: '80px'
    },
    grid: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        height: '1300px',
        // width: '100%',
        // width: '1980px',
        // alignItems: 'flex-start',
        // justify: 'flex-start',
        alignContent: 'flex-start'
    }
}));

export function Attractions(props) {
    const attractions = useSelector(getAttractions);
    const classes = attrStyles();
    const dispatch = useDispatch();
    const hasMore = useSelector(getHasMore);

    // const classes = useStyles();
    return <Grid container spacing={3} className={classes.grid}>
        {attractions.map((attr, index) => (
            // <GridListTile key={attr.name} cols={1}>
            <Grid item md={3} style={{order: index}} className={classes.item}>
                <ImgMediaCard key={attr.id} attr={attr}/>
            </Grid>))}
    </Grid>


    // </GridListTile>
    // }
    // {/*<GridList cellHeight={200}*/}
    // {/*                 // className={classes.gridList}*/}
    // {/*    spacing={3}*/}
    // {/*                 cols={4}>*/}
    // {/*<InfiniteScroll*/}
    // {/*    dataLength={attractions.length} //This is important field to render the next data*/}
    // {/*    next={dispatch(searchCommand(input))}*/}
    // {/*    hasMore={hasMore}*/}
    // {/*    loader={<h4>Loading...</h4>}*/}

    // below props only if you need pull down functionality
    // refreshFunction={this.refresh}
    // pullDownToRefresh
    // pullDownToRefreshContent={
    //     <h3 style={{textAlign: 'center'}}>&#8595; Pull down to refresh</h3>
    // }
    // releaseToRefreshContent={
    //     <h3 style={{textAlign: 'center'}}>&#8593; Release to refresh</h3>
    // }
    // >

    // </InfiniteScroll>

    // {/*</GridList>*/}


}