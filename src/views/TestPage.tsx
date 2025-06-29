
import { Link, useLocation } from 'react-router-dom';
import { OutfitTile } from '../components/outfitTile/OutfitTile';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { Item } from '../utilities/utilities'



export const Test: React.FC = () => {
    const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    const state = location.state as {
      selectedOutfit: Item;
      textName: string;
      dispatch: AppDispatch;
      outfitItems: Item[];
    };
  
    if (!state || !state.selectedOutfit) {
      return <p>Missing outfit data. Please return to the outfit page.</p>;
    }
  
    const { selectedOutfit, textName, outfitItems } = state;
    console.log(outfitItems)
    return (
        <div>
            {/* <h1>Test Page</h1> */}
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
            </ul>
            </div>
            <OutfitTile 
                dispatch={dispatch}
                selectedOutfit={selectedOutfit}
                textName={textName}
                outfitItems={outfitItems}
            />
        </div>
    )
}
