import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getMyPlacesIds, getPlaces} from "../redux/selectors";
import {loadMyPlacesIdsAll, recommendCommand, recommendMoreCommand} from "../redux/actions";
import {PlacesScreen} from "../components/placesScreen";
import {MyPlaceType} from "../redux/constants";
import {IntroCard} from "../components/introCard";


export default function Recommended() {
    const {places, hasMore} = useSelector(getPlaces);
    const dispatch = useDispatch();
    const favoritesIds = useSelector(getMyPlacesIds)[MyPlaceType.Loved];

    useEffect(() => {
        dispatch(recommendCommand());
        dispatch(loadMyPlacesIdsAll());
    }, []);

    return <PlacesScreen mainPlace={null}
                         places={places}
                         addComponent={favoritesIds.size === 0 && <IntroCard/>}
                         handleOnBoundsChange={bounds => dispatch(recommendCommand(bounds))}
                         handleLoadMore={bounds =>
                             dispatch(recommendMoreCommand(!places ? 0 : places.length, bounds))}
                         hasMore={hasMore}
    />

}