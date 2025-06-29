import { AppDispatch, RootState } from "../../store";
import { calculatePrice, getCurrencySymbol, getFilteredInventory, 
    Item, pricingItem, addCommas, styleLabels, defaultClothingPic, buildImageMapFromItems
    } from '../../utilities/utilities';;
import '../../styles/outfitTile.css'
import { useState, useEffect, useMemo } from 'react';
import { useSelector } from "react-redux";
import { addAll, addItem } from '../../reducers/cartSlice';

interface TileProp {
    dispatch: AppDispatch;
    selectedOutfit: Item;
    textName: string;
    outfitItems: Item[];
}

export const OutfitTile: React.FC<TileProp> = ({ dispatch, selectedOutfit, outfitItems}) => {
    const searchTerm = useSelector((state: RootState) => state.searchTerm);
    const selectedLabels = useSelector((state: RootState) => state.labelFilter.selectedLabels);
    const currencyFilter = useSelector((state: RootState) => state.currencyFilter);
    // const cart = useSelector((state: RootState) => state.cart);
    const [currentStage, setCurrentStage] = useState(selectedOutfit.evolution_stage || 1);
    const currentOutfit = outfitItems.find(item => item.evolution_stage === currentStage);

    const outfitImgMap = useMemo(() => buildImageMapFromItems(outfitItems), [outfitItems]);
    const imgUrl: string = useMemo(() => outfitImgMap[currentStage] || defaultClothingPic, [outfitImgMap, currentStage]);
    
    console.log('Outfit Items: ',outfitItems)
    let soldOut: boolean = true;

    useEffect(() => {
        const allStages = [...new Set(outfitItems.map(item => item.evolution_stage))].sort((a, b) => a - b);
        for (const stage of allStages) {
            if (outfitItems.some(item => item.evolution_stage === stage)) {
                setCurrentStage(stage);
                break;
            }
        }
    }, [outfitItems]);

    useEffect(() => {
        console.log("Current stage changed to", currentStage);
        console.log("imgUrl changed to: ", imgUrl)
    }, [currentStage, imgUrl]);

    console.log(currentOutfit)

    const stageOutfits = outfitItems.filter(item => item.evolution_stage === currentStage);
    const filteredItemsBySearch: Item[] = Array.isArray(stageOutfits)
    ? getFilteredInventory(stageOutfits, selectedLabels, searchTerm) || []
    : [];

    const handleAddFullOutfit = () => {
        const inStockItems = outfitItems.filter(item => item.stock > 0);
        if (inStockItems.length > 0) {
            dispatch(addAll(inStockItems));
        } else {
            console.log('No in-stock items in this outfit.');
        }
    }

    const handleNextEvolution = () => {
        const allStages = [...new Set(outfitItems.map(item => item.evolution_stage))].sort((a, b) => a - b);
        const currentIndex = allStages.indexOf(currentStage);
        // while (currentIndex < allStages.length - 1) {
        //     const nextStage = allStages[currentIndex + 1];
        //     const hasItems = outfitItems.some(item => item.evolution_stage === nextStage);

        //     if (hasItems) {
        //         setCurrentStage(nextStage);
        //         return;
        //     } else {
        //         currentIndex++;
        //     }
        // } 

        for ( let i = currentIndex + 1; i < allStages.length; i++ ) {
            const nextStage = allStages[i];
            if (outfitItems.some(item => item.evolution_stage === nextStage )) {
                setCurrentStage(nextStage)
                break;
            }
        }
    }

    const handlePrevEvolution = () => {
        const allStages = [...new Set(outfitItems.map(item => item.evolution_stage))].sort((a, b) => a - b);
        const currentIndex = allStages.indexOf(currentStage);

        if (currentIndex > 0) { 
            const prevStage = allStages[currentIndex - 1];
            if (outfitItems.some(item => item.evolution_stage === prevStage )) {
                setCurrentStage(prevStage);
            }
        }
    }

    return (

        <div className="outfitWrap">
            <h1>{currentOutfit?.outfit}: {currentOutfit?.evolution_name}</h1>
            <div className={`outfitZoom`}>
                <div className="outfitWrap">
                    <div className="imgWrap">
                        <img id='outfitImg' key={imgUrl} src={imgUrl || defaultClothingPic}/>
                    </div> 
                    <div className="outfitInfo">
                        <ul id="outfitInventory-container">
                            {filteredItemsBySearch.length > 0 && 
                            filteredItemsBySearch.map(createInventoryItem)}
                            {filteredItemsBySearch.length === 0 &&
                            <p id="no-results">No items found</p>}
                        </ul>
                        <button onClick={handleAddFullOutfit} className='full-outfit-add'>
                            Add Outfit to Cart
                        </button>
                        {new Set(outfitItems.map(i => i.evolution_stage)).size > 1 && (
                            <div>
                            <button onClick={handlePrevEvolution} className='next-outfit-evolution'>
                                ⬅️
                            </button>
                            <button onClick={handleNextEvolution} className='next-outfit-evolution'>
                                ➡️
                            </button>
                            </div>
                        )}
                    
                    </div>
                </div>
            </div>
        </div>
    );


        function createInventoryItem(inventoryItem: Item) {
    
            const price = pricingItem(inventoryItem);
            const displayPrice = Number(calculatePrice(price, currencyFilter));
            // console.log(displayPrice)
            let styleImgUrl: string = '';
            let priceContent: React.ReactNode = <p id="empty-space">{``}</p>;
            
          
            console.log('More than One Evolution', inventoryItem.evolution_stage);
            if (inventoryItem.stock < 4 && inventoryItem.stock !== 0) {
                priceContent =  <div id="low-stock"> 
                                    {inventoryItem.stock} left in stock, Buy Soon!
                                </div>; 
                    
                soldOut = false;
                
            } else if (inventoryItem.stock === 0 ) {
                priceContent = <p id="sold-out">SOLD OUT!</p>
                soldOut = true;
    
            } else {
                soldOut = false;
            }
    
            if (inventoryItem.style) {
                styleLabels.find((label) => {
                    if (label.name === inventoryItem.style) {
                        styleImgUrl = label.url;
                        return true;
                    }
                    return false;
                })
            }
            
    
            return (
                <li key={inventoryItem.id} className={`item`} id={`${soldOut ? 'sold' : null}`}>
                    <div id="item-titling">
                        <h3 className='item-name'>{inventoryItem.name}</h3>
                        <div className='labels'>
                            <img id="style-tag" src={`${styleImgUrl}`} />
                            {inventoryItem.labels.map((label, index) => label === "" ? null : <span key={index}>{label} </span>)}
                        </div>
                    </div>
                    <img id='item-image' src={inventoryItem.img} alt={inventoryItem.style}/>
                    
                    <div id="item-pricing-container">
                        <h3 className='price'>
                            {priceContent}
                            {getCurrencySymbol(currencyFilter)} {addCommas(displayPrice)} {currencyFilter}
                            
                        </h3>
                        <p id="type-label">{inventoryItem.type}</p>
                        <div className='add-to-cart-button-container'>
                            <button
                                onClick={() => handleOnClick(inventoryItem)}
                                id='add-to-cart-button'
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </li>
            );
        };

           function handleOnClick(inventoryItem: Item) {
                console.log(soldOut )
                if (soldOut) {
                    dispatch(addItem(inventoryItem));
                } else {
                    console.log('Item sold out: ', inventoryItem)
                } 
            };


    
}

