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


// const rootStyles = makeStyles((theme) => ({
//     root: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         justifyContent: 'space-around',
//         overflow: 'hidden',
//         backgroundColor: theme.palette.background.paper
//     }
// }));


// const useStyles = makeStyles((theme) => ({
//   mainGrid: {
//     marginTop: theme.spacing(3),
//   },
// }));

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const themeX = createMuiTheme({
  palette: {
    type: "light"
  }
});

function App() {
    // const classes = useStyles();

    return (
//         <Provider store={store}>
//             <meta
//   name="viewport"
//   content="minimum-scale=1, initial-scale=1, width=device-width"
// />
//             <div className={classes.root}>
//                 <link rel="stylesheet"
//                       href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
//                 <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
//
//                 <Container maxWidth="md">
//
//                     <Grid
//                         container
//                         direction="row"
//                         justify="center"
//                         alignItems="center"
//                     >
//
//                         <Search/>
//                     </Grid>
//                 </Container>
//             </div>
//         </Provider>

        <Provider store={store}>
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
                <Container maxWidth="lg">
                    <Search/>
                </Container>
            </div>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
