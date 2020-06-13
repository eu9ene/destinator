import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyPlacesIds, getPlaces} from "../redux/selectors";
import {loadMyPlaces} from "../redux/actions";
import {MyPlaceType} from "../redux/constants";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {PlacesScreen} from "../components/placesScreen";


export default function MyPlaces() {
    const [type, setType] = useState(MyPlaceType.Loved);
    const dispatch = useDispatch();
    const {places, hasMore} = useSelector(getPlaces);
    const myPlacesIds = useSelector(getMyPlacesIds);

    useEffect(() => {
        dispatch(loadMyPlaces(type));
    }, [type, ...myPlacesIds[type]]);

    return <PlacesScreen
        places={places}
        mainPlace={null}
        handleOnBoundsChange={null}
        handleLoadMore={null}
        hasMore={false}
        addComponent={
            <Tabs value={type}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={(event, newValue) => setType(newValue)}
                  aria-label="my-places-selector"
                  centered>
                <Tab label="Favorite" value={MyPlaceType.Loved}/>
                <Tab label="Bucket list" value={MyPlaceType.BucketList}/>
                <Tab label="Visited" value={MyPlaceType.Been}/>
            </Tabs>
        }
    />
}