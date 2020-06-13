import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPlaces} from "../redux/selectors";
import {topCommand, topMoreCommand} from "../redux/actions";
import {PlacesScreen} from "../components/placesScreen";


export default function Top() {
    const {places, hasMore} = useSelector(getPlaces);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(topCommand());
    }, []);

    return <PlacesScreen mainPlace={null}
                         places={places}
                         handleOnBoundsChange={bounds => dispatch(topCommand(bounds))}
                         handleLoadMore={bounds =>
                             dispatch(topMoreCommand(!places ? 0 : places.length, bounds))}
                         hasMore={hasMore}
    />

}