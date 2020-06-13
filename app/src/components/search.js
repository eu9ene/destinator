import {fade, makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";

import React, {useState} from "react";
import { searchCommand} from "../redux/actions";
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
        backgroundColor: theme.palette.action.hover,
        '&:hover': {
            backgroundColor: fade(theme.palette.background.default, 0.25),
        },

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
    inputRoot: {
        color: 'default',
    },
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

export const Search = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const suggestions = useSelector(getSuggestions);

    const [selectedValue, setSelectedValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const classes = searchStyles();

    return <Autocomplete
        id="places-search"
        value={selectedValue}
        onChange={(event, newValue) => {
            if (newValue == null || newValue.id == null)
                return;
            setSelectedValue('');
            setInputValue('');
            history.push(`/place/${newValue.id}`);
            // todo: loose focus
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            dispatch(searchCommand(newInputValue))
        }}
        // fullWidth
        freeSolo
        options={suggestions}
        renderInput={(params) => (
            <div className={classes.search} ref={params.InputProps.ref}>
                <div className={classes.searchIcon}>
                    <SearchIcon/>
                </div>
                <InputBase {...params.inputProps}
                           placeholder="Search…"
                           classes={{
                               root: classes.inputRoot,
                               input: classes.inputInput,
                           }}
                           inputProps={{'aria-label': 'search'}}
                />
            </div>
        )}
        getOptionLabel={(option) => option != null && option.name != null ? option.name : ""}

    />


};
