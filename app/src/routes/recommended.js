import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPlaces} from "../redux/selectors";
import {loadMyPlacesIdsAll, recommendCommand, recommendMoreCommand} from "../redux/actions";
import {PlacesScreen} from "../components/placesScreen";


export default function Recommended() {
    const {places, hasMore} = useSelector(getPlaces);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(recommendCommand());
        dispatch(loadMyPlacesIdsAll());
    }, []);

    return <PlacesScreen mainPlace={null}
                         places={places}
                         handleOnBoundsChange={bounds => dispatch(recommendCommand(bounds))}
                         handleLoadMore={bounds =>
                             dispatch(recommendMoreCommand(!places ? 0 : places.length, bounds))}
                         hasMore={hasMore}
    />

}