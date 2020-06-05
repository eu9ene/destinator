import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyPlacesOfType} from "../redux/selectors";
import {loadMyPlaces} from "../redux/actions";
import {MyPlaceType} from "../redux/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {makeStyles} from "@material-ui/core/styles";
import {PlacesScreen} from "../components/placesScreen";

const MyPlacesOfType = (props) => {
    const type = props.type;
    const dispatch = useDispatch();
    const places = useSelector(state => getMyPlacesOfType(state, type)).places;

    useEffect(() => {
        if (places == null)
            dispatch(loadMyPlaces(type));
    });

    return <PlacesScreen places={places}
                         mainPlace={null}
                         handleOnBoundsChange={null}
                         addComponent={null}/>
};

const getStyles = makeStyles((theme) => ({
    tabs: {
        // fixed: true
    }
}));


export default function MyPlaces() {
    const [value, setValue] = React.useState(MyPlaceType.Loved);
    const classes = getStyles();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Grid container spacing={3}>
        <Grid item md={12}>
            <Tabs value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="my-places-selector"
                  centered
                  className={classes.tabs}>
                <Tab label="Favorite" value={MyPlaceType.Loved}/>
                <Tab label="Bucket list" value={MyPlaceType.BucketList}/>
                <Tab label="Visited" value={MyPlaceType.Been}/>
            </Tabs>
        </Grid>
        <Grid item md={12}>
            <MyPlacesOfType type={value}/>
        </Grid>
    </Grid>

}