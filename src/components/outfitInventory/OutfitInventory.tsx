import React, { useEffect, useState } from 'react';
import LabelFilter from '../labelFilter/LabelFilter';
import { getFilteredInventory, styleLabels, Item, extractUniqueOutfitsAsItems, defaultClothingPic } from '../../utilities/utilities';
import { fetchInventory, getOutfits } from '../../reducers/inventorySlice';
import { AppDispatch } from '../../store';
import { Test } from '../../views/TestPage';
import '../../styles/oufitInventoryPage.css'
import { Link, useNavigate } from 'react-router-dom';



interface InventoryProps {
    inventory: Item[];        
    currencyFilter: string;  
    dispatch: AppDispatch;  
    searchTerm: string;
    selectedLabels: (string | number)[];
};

export const OutfitInventory: React.FC<InventoryProps> = ({ inventory, dispatch, searchTerm, selectedLabels}) => {
    const navigate = useNavigate();
    const selectedOutfits = inventory;
    const outfitNames: Item[] = [];

    useEffect(() => {
        dispatch(fetchInventory())
        dispatch(getOutfits())
    }, [dispatch]);  

    if (inventory.length === 0 ){
        return <p id='all-outfits-unavailable'>Sorry, there are no outfits to show</p>
    }
    
    const outfitGroup: Record<string, Item[]> = selectedOutfits.reduce((acc, item) => {
        //console.log(acc)
        if (item.outfit && item.outfit_img_url && item.style) {
            // Finding clothing belonging to sets, have outfitUrls, and a style set
            // Creates an array if the outfit item doesn't exist
            if(!acc[item.outfit]) {
                acc[item.outfit] = [];

            }
            // console.log("Acc Item Outfit: ", acc[item.outfit])
            // Only push items that are not in the array.
            if (!outfitNames.some(outfit => outfit.outfit === item.outfit)) {
                outfitNames.push(item);
            }
            
            acc[item.outfit].push(item);
           // console.log(acc[item.outfit].length)
           
        }
        return acc;

    }, {} as Record<string, Item[]>);

    const currentOutfitInventory = extractUniqueOutfitsAsItems(inventory);
    const filteredOutfits = getFilteredInventory(currentOutfitInventory, selectedLabels, searchTerm);

    console.log('currentOutfitInventory', currentOutfitInventory)
    const handleOnClick = (outfit: Item) => {
      const fullOutfitSet = outfitGroup[outfit.outfit]
      console.log(fullOutfitSet)
      navigate('/Test', { 
        state: { 
          selectedOutfit: outfit, 
          textName: outfit.name, 
          outfitItems: fullOutfitSet,
        } 
      });
      
    }

    return (
        <div className='filter-inventory'>
          <LabelFilter dispatch={dispatch} inventory={currentOutfitInventory} />
      
          <ul id="inventory-container">
            {filteredOutfits.length > 0 ? (
              filteredOutfits.map((item: Item, index: number) => (
                <li key={index} className="item" onClick={() => handleOnClick(item)}>
                  <h3 className="item-name">{item.outfit}</h3>
                  <img
                    id="item-image"
                    src={Array.isArray(item.outfit_img_url) ? item.outfit_img_url[0] : item.outfit_img_url || defaultClothingPic}
                    alt={item.outfit}
                  />
                  <div className='labels'>
                    {styleLabels
                      .filter(label => label.name === item.style)
                      .map((label, i) => (
                        <img id="style-tag" src={label.url} alt={label.name} key={i} />
                    ))}
                  </div>
                </li>
              ))
            ) : (
              <p id="no-results">No items found</p>
            )}
          </ul>
        </div>
    );
}


export default OutfitInventory;