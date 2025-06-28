import React from 'react';
import { SearchTerm } from '../components/searchTerm/SearchTerm';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../store';


const EurekaPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const searchTerm = useSelector((state: RootState) => state.searchTerm);

    return (
        <div>
            <p>Eureka Page</p>
            <div className='tabs-container'>
            <ul id='all-tabs'>
                <li id="tab">
                    <Link to="/">Home</Link>
                </li>
                <li id="tab">
                    <Link to="/OutfitPage">Outfits</Link>
                </li>
                <li id="tab">
                    <Link to="/EurekaPage">Eureka</Link>
                </li>
                <li id="tab">
                    <Link to="/Form">Form</Link>
                </li>
            </ul>
            </div>
            <SearchTerm 
                searchTerm={searchTerm}
                dispatch={dispatch}
            />
        </div>

    );
    
}

export default EurekaPage;