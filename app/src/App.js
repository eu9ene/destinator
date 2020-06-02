import React, {lazy, Suspense} from 'react';
import './App.css';
import {Provider} from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import configureStore, {history} from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import ScrollToTop from "./components/scroll";
import CircularProgress from "@material-ui/core/CircularProgress";
import {ConnectedRouter} from 'connected-react-router'
import {Switch, Route} from "react-router-dom";
import {AppHeader} from "./components/header";
import Redirect from "react-router-dom/es/Redirect";


const Home = lazy(() => import('./routes/home'));
const Place = lazy(() => import('./routes/place'));
const MyPlaces = lazy(() => import('./routes/myplaces'));

const themeX = createMuiTheme({
    palette: {
        type: "light"
    },
});


const useStyles = makeStyles((theme) => ({
    main: {
        marginTop: '80px'
    }
}));


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
                        <AppHeader/>
                        <Container maxWidth="lg" className={classes.main}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Suspense fallback={<CircularProgress/>}>
                                        <Switch>
                                            <Route exact path='/myplaces' component={MyPlaces}/>
                                            <Route exact path={`/place/:id`} component={Place}/>
                                            <Route exact path='/home' component={Home}/>
                                            <Route exact path="/">
                                                <Redirect to="/home"/>
                                            </Route>
                                        </Switch>
                                    </Suspense>
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
