import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {loadMyPlacesIdsAll} from "../redux/actions";
import React from 'react';


export const MyPlacesLoader = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadMyPlacesIdsAll());
    }, []);

    return <></>
};