import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';


import Button from '@material-ui/core/Button';
import {createStore, applyMiddleware} from "redux";
import {Provider, useSelector, useDispatch} from "react-redux";
import thunk from "redux-thunk";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import GridList from "@material-ui/core/GridList";
import makeStyles from "@material-ui/core/styles/makeStyles";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from '@material-ui/icons/Menu';


const initialState = {
  suggestions: [],
  attractions: []
};

const SEARCH_FINISHED = "SEARCHED_FINISHED";


function reducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_FINISHED:
      return {
        ...state,
        attractions: action.payload.result
      };
    case "loadSuggestionsComplete":
      return {
        ...state,
        suggestions: action.payload.result
      };
    default:
      return state;
  }
}

let store = createStore(reducer, applyMiddleware(thunk));

// ---------------------------------

// const Button = React.memo(props => {
//   const { onClick1 } = props;
//
//   return (
//     <div style={{ backgroundColor: "red" }} className="asdf" onClick={onClick1}>
//       Click me
//     </div>
//   );
// });

//---------------------------------

function searchCommand(searchQuery) {
  return function(dispatch) {
        return fetch('http://0.0.0.0:8000/search',
             {
                method: "POST",
                body: JSON.stringify({query: searchQuery})
            })
      .then(searchResult => searchResult.json())
      .then(searchResult => dispatch(searchDone(searchResult)));
  };
}

function findSimilarCommand(id) {
  return function(dispatch) {
        return fetch('http://0.0.0.0:8000/similar',
             {
                method: "POST",
                body: JSON.stringify({id: id})
            })
      .then(searchResult => searchResult.json())
      .then(searchResult => dispatch(searchDone(searchResult)));
  };
}

function findNearbyCommand(id) {
  return function(dispatch) {
        return fetch('http://0.0.0.0:8000/nearby',
             {
                method: "POST",
                body: JSON.stringify({id: id})
            })
      .then(searchResult => searchResult.json())
      .then(searchResult => dispatch(searchDone(searchResult)));
  };
}

function searchDone(result) {
  return {
    type: SEARCH_FINISHED,
    payload: {
      result: result
    }
  };
}
//
// function queryChangedCommand(searchQuery) {
//   return function(dispatch) {
//     return fetch(
//       `https://ingress.pressreader.com/services/catalog/publications?accessToken=arSMctWAreCtMGvgwgjgyOJ-KfjWzWmAqKPxGmbuJj-xKykPCLyaTbJqP7o0OjCu2f0nnxoouy76oJltoPTiaKXBMxhJOztTbFxMTsAPpys!&limit=5&orderBy=searchrank+desc&q=${searchQuery}`
//     )
//       .then(searchResult => searchResult.json())
//       .then(searchResult => dispatch(loadSuggestionsComplete(searchResult.items)));
//   };
// }
//
// function loadSuggestionsComplete(result) {
//   return {
//     type: "loadSuggestionsComplete",
//     payload: {
//       result: result
//     }
//   };
// }


// ---------------------------------
//
const getAttractions = state => {
  return state.attractions;
};
//
//
// const getSuggestions = state => {
//   return state.suggestions;
// };
//
// const Input  = React.memo(() => {
//   const dispatch = useDispatch();
//
//   const onChange = (e) => dispatch(queryChangedCommand(e.target.value));
//
//   return <input onChange={onChange} />
// });
//
// const ListItem = React.memo(props => {
//   return <div>{props.text}</div>;
// });
//
// const List = React.memo(() => {
//   const searchList = useSelector(getSearchList);
//
//   return (
//     <>
//       {searchList.map(item => (
//         <ListItem text={item.displayName} />
//       ))}
//     </>
//   );
// });
//
// const Suggestions = React.memo(() => {
//   const searchList = useSelector(getSuggestions);
//
//   return (
//     <>
//       {searchList.map(item => (
//         <ListItem text={item.displayName} />
//       ))}
//     </>
//   );
// });
//
// const Counter = React.memo(() => {
//   const searchList = useSelector(getSearchList);
//
//   return <div>{searchList.length}</div>;
// });

// const Search = React.memo(() => {
//   const dispatch = useDispatch();
//
//   return (
//     <>
//       {/*<Input />*/}
//       {/*<Suggestions />*/}
//       <TextField id="outlined-basic" label="Outlined" variant="outlined" />
//       <Button variant="contained" color="primary" onClick1={() => dispatch(loadDataCommand("h"))}>Click</Button>
//       {/*<List />*/}
//       {/*<Counter />*/}
//
//
//
//       {/*<InputDialogInvoker />*/}
//     </>
//   );
// });
//
// const InputDialogInvoker = React.memo(() => {
//   const [isOpened, setIsOpened] = React.useState(false);
//
//
//   return <>
//     <Button onClick1={() => setIsOpened(true)}/>
//     {isOpened &&
//       (
//         <div style={{ backgroundColor: 'green', position: 'absolute', height: 100, width: 100}}>
//         <Button onClick1={() => setIsOpened(false)} />
//       </div>
//       )
//     }
//   </>;
// });


// const useStyles = makeStyles((theme) => ({
//     gridList: {
//         flexWrap: 'nowrap',
//         // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//         transform: 'translateZ(0)',
//     },
//     title: {
//         color: theme.palette.primary.light,
//     },
//     titleBar: {
//         background:
//             'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//     },
// }));


const cardStyles = makeStyles({
    root: {
        Width: 300,
    },
});

function ImgMediaCard(props) {
    const classes = cardStyles();
    const attr = props.attr;
    const dispatch = useDispatch();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={attr.name}
                    height="140"
                    image={attr.image}
                    title={attr.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {attr.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {attr.desc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={e => dispatch(findSimilarCommand(attr.id))}>
                    Similar
                </Button>
                <Button size="small" color="primary" onClick={e => dispatch(findNearbyCommand(attr.id))}>
                    Nearby
                </Button>
            </CardActions>
        </Card>
    );
}

function Attractions(props) {
    // const attrs = props.attrs;
    const attractions = useSelector(getAttractions);

    // const classes = useStyles();
    return <GridList cellHeight={200}
                     // className={classes.gridList}
        spacing={3}
                     cols={4}>
        {attractions.map((attr) => (
            // <GridListTile key={attr.name} cols={1}>
            <ImgMediaCard attr={attr}/>

            // </GridListTile>
        ))}
    </GridList>


}

function Search(props) {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');
    const onClick = (e) => dispatch(searchCommand(input));

    return <>
        <Grid item xs={12}/>
        <Grid item xs={6}>
            <TextField id="outlined-basic" label="destination" variant="outlined"
                       value={input}
                       onChange={e => setInput(e.target.value)}
            />
        </Grid>
        <Grid item xs={6}>
            <Button variant="contained" color="primary" size="large"
                    onClick={onClick}>Search</Button>
        </Grid>
        <Grid item xs={12}>
            <Attractions />
        </Grid>
    </>
}



const rootStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper
    }
}));


function App() {
    const classes = rootStyles();

    return (
        <Provider store={store}>
        <div className={classes.root}>
            <link rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>

            <Container maxWidth="md">

                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >

                    <Search/>
                </Grid>
            </Container>
        </div>
            </Provider>

        // <Provider store={store}>
        // <div className="App">
        //    <header>
        //        <meta
        //    name="viewport"
        //    content="minimum-scale=1, initial-scale=1, width=device-width"
        //  />
        //     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        //    </header>
        // </div>
        // </Provider>
    );
}

export default App;
