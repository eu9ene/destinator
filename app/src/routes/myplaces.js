import Grid from "@material-ui/core/Grid";
import React, {useEffect} from "react";
import {PlacesList} from "../components/placesList";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getMyPlaces} from "../redux/selectors";
import {loadMyPlaces} from "../redux/actions";
import {MyPlaceType} from "../redux/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "@material-ui/lab/TabPanel";
import {PlacesGrid} from "../components/placesGrid";

function MyPlacesOfType(props) {
    const type = props.type;
    const dispatch = useDispatch();
    const places = useSelector(state => getMyPlaces(state, type)).places;

    useEffect(() => {
        if (places == null)
            dispatch(loadMyPlaces(type));
    });
    return <PlacesGrid places={places}/>
}


export default function MyPlaces() {
    const [value, setValue] = React.useState(MyPlaceType.BucketList);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return <Grid container xs={12} spacing={3}>
        <Grid item xs={12}>
            <Tabs value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="my-places-selector"
                  centered>
                <Tab label="Bucket list" value={MyPlaceType.BucketList}/>
                <Tab label="Favorite" value={MyPlaceType.Loved}/>
                <Tab label="Visited" value={MyPlaceType.Been}/>
            </Tabs>
        </Grid>
        <Grid item xs={12}>
            <MyPlacesOfType type={value}/>

        </Grid>

    </Grid>
}