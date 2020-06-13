import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {history} from "../redux/store";
import {Search} from "./search";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useRouteMatch} from "react-router-dom";


const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: '80px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    }
}));


export function AppHeader() {
    const classes = useStyles();
    const isHome = useRouteMatch("/recommended");
    const isMyPlaces = useRouteMatch("/myplaces");
    const isTop = useRouteMatch("/top");

    return <AppBar
        position="sticky"
        color="inherit">
        <Toolbar>
            <Button variant="text" color={isHome ? 'primary' : 'default'} className={classes.menuButton}
                    onClick={() => {
                        history.push('/recommended')
                    }}>Recommended</Button>
            <Button variant="text" color={isTop ? 'primary' : 'default'} className={classes.menuButton}
                    onClick={() => {
                        history.push('/top')
                    }}>Top</Button>
            <Button variant="text" color={isMyPlaces ? 'primary' : 'default'} className={classes.menuButton}
                    onClick={() => {
                        history.push('/myplaces')
                    }}>
                MyPlaces</Button>
            <Search/>

        </Toolbar>
    </AppBar>

}