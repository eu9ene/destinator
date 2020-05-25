import React from 'react';
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

//
// const initialState = {
//   suggestions: [],
//   search: [{ displayName: "three"}] };
//
// function reducer(state = initialState, action) {
//   switch (action.type) {
//     case "SEARCHED_FINISHED":
//       return {
//         ...state,
//         search: action.payload.result
//       };
//     case "loadSuggestionsComplete":
//       return {
//         ...state,
//         suggestions: action.payload.result
//       };
//     default:
//       return state;
//   }
// }
//
// let store = createStore(reducer, applyMiddleware(thunk));

// ---------------------------------

// const Button = React.memo(props => {
//   const { onClick1 } = props;

//   return (
//     <div style={{ backgroundColor: "red" }} className="asdf" onClick={onClick1}>
//       Click me
//     </div>
//   );
// });

// ---------------------------------
//
// function loadDataCommand(searchQuery) {
//   return function(dispatch) {
//     return fetch(
//       `https://ingress.pressreader.com/services/catalog/publications?accessToken=arSMctWAreCtMGvgwgjgyOJ-KfjWzWmAqKPxGmbuJj-xKykPCLyaTbJqP7o0OjCu2f0nnxoouy76oJltoPTiaKXBMxhJOztTbFxMTsAPpys!&limit=5&orderBy=searchrank+desc&q=${searchQuery}`
//     )
//       .then(searchResult => searchResult.json())
//       .then(searchResult => dispatch(loadDataDone(searchResult.items)));
//   };
// }
//
// function loadDataDone(result) {
//   return {
//     type: "SEARCHED_FINISHED",
//     payload: {
//       result: result
//     }
//   };
// }
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
// const getSearchList = state => {
//   return state.search;
// };
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

//
// const data = [
//     {
//         id: 1,
//         name: 'Stanley park',
//         img: 'https://media-cdn.tripadvisor.com/media/photo-s/01/45/cc/b8/jericho-beach.jpg',
//         rating: 4.5,
//         website: 'http://google.com',
//         desc: 'Hello world'
//     },
//     {
//         id: 2,
//         name: 'Steveston',
//         img: 'https://media-cdn.tripadvisor.com/media/photo-s/01/45/cc/b8/jericho-beach.jpg',
//         rating: 4.0,
//         website: 'http://google.com',
//         desc: 'Hello world'
//     },
//     {
//         id: 3,
//         name: 'Garibaldi lake',
//         img: 'https://media-cdn.tripadvisor.com/media/photo-s/01/45/cc/b8/jericho-beach.jpg',
//         rating: 3.5,
//         website: 'http://google.com',
//         desc: 'Hello world'
//     },
//     {
//         id: 4,
//         name: 'Mount Pleasant',
//         img: 'https://media-cdn.tripadvisor.com/media/photo-s/01/45/cc/b8/jericho-beach.jpg',
//         rating: 4.7,
//         website: 'http://google.com',
//         desc: 'Hello world'
//     },
//     {
//         id: 5,
//         name: 'Victoria',
//         img: 'https://media-cdn.tripadvisor.com/media/photo-s/01/45/cc/b8/jericho-beach.jpg',
//         rating: 5.0,
//         website: 'http://google.com',
//         desc: 'Hello world'
//     }
// ];


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
        maxWidth: 345,
    },
});

function ImgMediaCard(props) {
    const classes = cardStyles();
    const attr = props.attr;

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
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}

function Attractions(props) {
    const attrs = props.attrs;

    // const classes = useStyles();
    return <GridList cellHeight={200}
                     // className={classes.gridList}
        spacing={3}
                     cols={4}>
        {attrs.map((attr) => (
            // <GridListTile key={attr.name} cols={1}>
            <ImgMediaCard attr={attr}/>

            // </GridListTile>
        ))}
    </GridList>


}

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            attrs: [],
            searchText: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({searchText: event.target.value});
    }

    handleSubmit(event) {
        const searhStr = this.state.searchText;

        fetch('http://0.0.0.0:8000/search',
             {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({query: searhStr})
            })
      .then(searchResult => searchResult.json())
            // .then(searchResult  => console.log(searchResult));
      .then(attrs => this.setState({attrs: attrs}));


    }

    render() {

        return <>
            <Grid item xs={12}/>
            <Grid item xs={6}>
                <TextField id="outlined-basic" label="destination" variant="outlined" value={this.state.searchText}
                           onChange={this.handleChange}/>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" color="primary" size="large" onClick={this.handleSubmit}>Search</Button>
            </Grid>
            <Grid item xs={12}>
                <Attractions attrs={this.state.attrs}/>
            </Grid>
        </>
    }
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
