import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {addPlace, removePlace} from "../redux/actions";
import AddIcon from '@material-ui/icons/Add';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DoneIcon from '@material-ui/icons/Done';
import {MyPlaceType} from "../redux/constants";
import {getMyPlacesIds} from "../redux/selectors";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


const MyPlaceAction = React.memo((props) => {
    const dispatch = useDispatch();
    return <Tooltip title={props.label} aria-label={props.label}>
        {props.myPlacesIds[props.type] != null && props.myPlacesIds[props.type].has(props.attrId)
            ? <IconButton aria-label={props.label}
                          color="secondary"
                          onClick={() => dispatch(removePlace(props.attrId, props.type))}>
                {props.icon}
            </IconButton>
            : < IconButton aria-label={props.label}
                           onClick={() => dispatch(addPlace(props.attrId, props.type))}>
                {props.icon}
            </IconButton>
        }
    </Tooltip>;
});

export function MyPlaceActions(props) {
    const myPlacesIds = useSelector(getMyPlacesIds);
    return <>
        <MyPlaceAction myPlacesIds={myPlacesIds} attrId={props.attrId} label={"been there"}
                       type={MyPlaceType.Been} icon={<DoneIcon/>}/>
        <MyPlaceAction myPlacesIds={myPlacesIds} attrId={props.attrId} label={"loved it"}
                       type={MyPlaceType.Loved} icon={<FavoriteBorderIcon/>}/>
        <MyPlaceAction myPlacesIds={myPlacesIds} attrId={props.attrId} label={"to bucket list"}
                       type={MyPlaceType.BucketList} icon={<AddIcon/>}/>
    </>

}
