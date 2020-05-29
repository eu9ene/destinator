import React from 'react';
import './App.css';
import {Provider, useSelector} from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Search} from "./components/search";
import configureStore, {history} from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {Home} from "./components/home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {ConnectedRouter} from 'connected-react-router'

import {
    Switch,
    Route, withRouter
} from "react-router"
import {Place} from "./components/place";
import ScrollToTop from "./components/scroll";


// const rootStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         overflow: 'hidden',
//         backgroundColor: theme.palette.background.paper
//     }
// }));


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    },
    appBar: {
        // backgroundColor: theme.palette.background.paper,

    },
    // home: {
    //     marginTop: '80px'
    // },
    main: {
        marginTop: '80px'
    }
}));


const themeX = createMuiTheme({
    palette: {
        type: "light"
    },

});


const store = configureStore();


function App() {
    const classes = useStyles();

    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ScrollToTop/>
                <ThemeProvider theme={themeX}>

                    <div className="App">
                        <header>
                            <meta
                                name="viewport"
                                content="minimum-scale=1, initial-scale=1, width=device-width"
                            />
                            <link rel="stylesheet"
                                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
                        </header>
                        <CssBaseline/>
                          <AppBar className={classes.appBar} elevation={1}
                                            position="fixed"
                                            color="inherit"
                                    >
                              <Toolbar>
                                            <Search/>
                                        </Toolbar>
                                    </AppBar>
                        <Container maxWidth="lg" className={classes.main}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Switch>
                                        <Route exact path='/'>
                                            <Home className={classes.home}/>
                                        </Route>
                                        <Route path={`/place/:id`} component={Place}/>
                                    </Switch>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>

                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    );
}

export default App;
