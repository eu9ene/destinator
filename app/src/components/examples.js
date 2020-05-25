//
// ---------------------------------
//
// const Button = React.memo(props => {
//   const { onClick1 } = props;
//
//   return (
//     <div style={{ backgroundColor: "red" }} className="asdf" onClick={onClick1}>
//       Click me
//     </div>
//   );
// });
//
// ---------------------------------
//
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
//
//
// ---------------------------------
//
//
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
//
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
