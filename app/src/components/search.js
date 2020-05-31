import {fade, makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";

import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {findNearbyCommand, findSimilarCommand, searchCommand} from "../redux/actions";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import {useHistory} from "react-router";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {getSuggestions} from "../redux/selectors";


const searchStyles = makeStyles((theme) => ({
    gridText: {
        flexGrow: 8
    },
    grid: {
        padding: theme.spacing(3)
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade(theme.palette.common.white, 0.15),
        // '&:hover': {
        //   backgroundColor: fade(theme.palette.common.white, 0.25),
        // },

        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // inputRoot: {
    //   color: 'inherit',
    // },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export function Search() {
    const dispatch = useDispatch();
    const history = useHistory();
    const suggestions = useSelector(getSuggestions)

    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    // const onKeyDown = (e) => {
    //     if (e.key === 'Enter') {
    //         dispatch(searchCommand(selectedValue, history));
    //     }
    // };
    const classes = searchStyles();

    return <Autocomplete
        id="places-search"
        value={selectedValue}
        onChange={(event, newValue) => {
            setSelectedValue('');
            setInputValue('');
            history.push(`/place/${newValue.id}`);
            // todo: loose focus
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            dispatch(searchCommand(newInputValue, history))
        }}
        fullWidth
        freeSolo
        options={suggestions}
        renderInput={(params) => (
            <TextField {...params} label="Hiking with kids in Vancouver" margin="normal"
                       variant="outlined" size="small"/>
        )}
        getOptionLabel={(option) => option != null ? option.name : ""}

    />


    // <div className={classes.search}>
    //         <div className={classes.searchIcon}>
    //           <SearchIcon />
    //         </div>
    //         <InputBase
    //           placeholder="Search…"
    //           classes={{
    //             root: classes.inputRoot,
    //             input: classes.inputInput,
    //           }}
    //           selectedValue={input}
    //            onChange={e => setInput(e.target.selectedValue)}
    //                     onKeyDown={onKeyDown}
    //           inputProps={{ 'aria-label': 'search' }}
    //         />
    //       </div>


    // <Grid container xs={12} spacing={3} className={classes.grid}>
    //     <Grid item xs={12} className={classes.gridText}>
    //         <TextField id="outlined-basic"
    //             // label="What are you looking for?"
    //                    variant="outlined"
    //                    size="small"
    //                    selectedValue={input} fullWidth
    //                    onChange={e => setInput(e.target.selectedValue)}
    //                    onKeyDown={onKeyDown}
    //         />
    //     </Grid>
    //
    // </Grid>

}
