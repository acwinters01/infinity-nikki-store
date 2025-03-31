import React from 'react';
import { setSearchTerm, clearSearchTerm } from '../../reducers/searchTermSlice';
import { AppDispatch } from '../../store';
import '../../styles/searchTerm.css'


const searchIcon: string = './src/assets/svgs/search-icon.svg';
const clearIcon: string = './src/assets/svgs/close-line-icon.svg';

interface SearchTermProps {
    dispatch: AppDispatch;
    searchTerm: string;
}

export const SearchTerm: React.FC<SearchTermProps> = ({ searchTerm, dispatch}) => {

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