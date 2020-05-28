import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from "react-redux";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Search} from "./components/search";
import store from "./redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import {ThemeProvider, createMuiTheme} from "@material-ui/core/styles";
import {Home} from "./components/home";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {
    Link,
    BrowserRouter as Router,

} from "react-router-dom";
import {
    Switch,
    Route,

    useParams,
    useHistory
} from "react-router"
import {Place} from "./components/place";

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
    home: {
        marginTop: '80px'
    }
}));


const themeX = createMuiTheme({
    palette: {
        type: "light"
    },

});

function App() {
    const classes = useStyles();

    return (
        <Provider store={store}>
            <ThemeProvider theme={themeX}>
                <Router>
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
                        <Container maxWidth="lg">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <AppBar className={classes.appBar} elevation={1}
                                            position="fixed"
                                            color="transparent"
                                    >
                                        <Toolbar>
                                            <Search/>
                                        </Toolbar>
                                    </AppBar>
                                </Grid>
                                <Grid item xs={12}>

                                    <Switch>
                                        <Route exact path='/'>
                                            <Home className={classes.home}/>
                                        </Route>
                                        <Route path={`/place/:id`}>
                                            <Place/>
                                        </Route>
                                    </Switch>

                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
