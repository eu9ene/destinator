import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import React from "react";
import {useHistory} from 'react-router';
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5)
        },
    },
}));

export const Tags = (props) => {
    const place = props.place;
    const history = useHistory();
    const classes = useStyles();

    return <div className={classes.root}>
        {place.tags.map(tag =>
            <Chip variant="outlined" size="small" label={tag} onClick={() => history.push(`/tag/${tag}`)}/>)}
    </div>


};