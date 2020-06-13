import Grid from "@material-ui/core/Grid";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyPlacesIds, getPlaces} from "../redux/selectors";
import {loadMyPlaces} from "../redux/actions";
import {MyPlaceType} from "../redux/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {PlacesScreen} from "../components/placesScreen";

const MyPlacesOfType = (props) => {
    const type = props.type;
    const dispatch = useDispatch();
    const {places, hasMore} = useSelector(getPlaces);
    const myPlacesIds = useSelector(getMyPlacesIds);

    useEffect(() => {
        dispatch(loadMyPlaces(type));
    }, [type, ...myPlacesIds[type]]);

    return <PlacesScreen places={places}
                         mainPlace={null}
                         handleOnBoundsChange={null}
                         handleLoadMore={null}
                         hasMore={false}
                         addComponent={null}
    />
};

export default function MyPlaces() {
    const [value, setValue] = useState(MyPlaceType.Loved);

    return <Grid container spacing={3}>
        <Grid item md={12}>
            <Tabs value={value}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event, newValue) => setValue(newValue)}
                  aria-label="my-places-selector"
                  centered
                  >
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