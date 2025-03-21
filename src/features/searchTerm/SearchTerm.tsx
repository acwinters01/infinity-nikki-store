import React from 'react';
import { setSearchTerm, clearSearchTerm } from './searchTermSlice';
import './searchTerm.css'

const searchIcon: string = './src/assets/svgs/search-icon.svg';
const clearIcon: string = './src/assets/svgs/close-line-icon.svg';

export const SearchTerm = (props: any) => {
    const { searchTerm, dispatch } = props;

    const onSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const userInput = e.target.value;
        dispatch(setSearchTerm(userInput));
    };

    const onClearSearchTerm = () => {
        dispatch(clearSearchTerm());
    }

    return (
        <div id="searchbar-container">
            <input 
                id="search"
                type="text"
                value={searchTerm}
                onChange={onSearchTermChange}
                placeholder='Search'
            />
            {searchTerm.length > 0 && (
                <button
                    onClick={onClearSearchTerm}
                    type="button"
                    id="clear-search-icon"
                >
                    <img src={clearIcon} alt="" />
                </button>
            )}

            <img id="search-icon" alt='' src={searchIcon}/>
        </div>
    );
}