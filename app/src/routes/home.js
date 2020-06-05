import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getRecs} from "../redux/selectors";
import {loadMyPlacesIdsAll, recommendCommand} from "../redux/actions";
import {PlacesScreen} from "../components/placesScreen";


export default function Home() {
    const places = useSelector(getRecs);
    const dispatch = useDispatch();

    useEffect(() => {
        if (places == null) {
            dispatch(recommendCommand());
            dispatch(loadMyPlacesIdsAll());
        }
    });

    const handleOnBoundsChange = (bounds) => {
        dispatch(recommendCommand(bounds));
    };

    return <PlacesScreen mainPlace={null}
                         places={places}
                         handleOnBoundsChange={handleOnBoundsChange}/>
}