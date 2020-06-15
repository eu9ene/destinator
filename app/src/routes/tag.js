import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPlaces} from "../redux/selectors";
import {tagCommand, tagMoreCommand} from "../redux/actions";
import {PlacesScreen} from "../components/placesScreen";
import {useParams} from "react-router-dom";
import Typography from "@material-ui/core/Typography";


export default function Tag() {
    const {tag} = useParams();
    const {places, hasMore} = useSelector(getPlaces);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(tagCommand(tag));
    }, [tag]);

    return <PlacesScreen mainPlace={null}
                         places={places}
                         handleOnBoundsChange={bounds => dispatch(tagCommand(tag, bounds))}
                         handleLoadMore={bounds =>
                             dispatch(tagMoreCommand(tag, !places ? 0 : places.length, bounds))}
                         hasMore={hasMore}
                         addComponent={
                             <Typography variant="h4" component="h1">
                                 Tag: {tag}
                             </Typography>

                         }
    />

}