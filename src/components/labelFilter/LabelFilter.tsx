import React, {useEffect, useState} from 'react';
import { toggleLabel } from '../../reducers/labelFilterSlice';
import { Item } from '../../utilities/utilities';
import { AppDispatch } from '../../store';
import '../../styles/filters.css';


interface FilterProps {
    dispatch: AppDispatch;  
    inventory: Item[];
}

export const LabelFilter: React.FC<FilterProps> = ({ dispatch, inventory })=> {

    const [mainMenu, setMainMenu] = useState<boolean>(false);
    const [colorMenu, setColorMenu] = useState<boolean>(false);
    const [styleMenu, setStyleMenu] = useState<boolean>(false);
    const [qualityMenu, setQualityMenu] = useState<boolean>(false);
    const [outfitMenu, setOutfitMenu] = useState<boolean>(false);
    const [labelsMenu, setLabelsMenu] = useState<boolean>(false);
    const [categoryMenu, setCategoryMenu] = useState<boolean>(false);
    const [filterMenu, setFilterMenu] = useState<boolean>(false);
    const [tabVisible, setTabVisible] = useState<boolean>(false);
    const [sticky, setSticky] = useState<boolean>(false);



    const inventoryStyleLabels = inventory.reduce((labels: string[], item) => {
        if ( item.style && !labels.includes(item.style)) {
            labels.push(item.style);
        }
        return labels;
    }, []);

    // if (inventoryStyleLabels.length !== 0) {
    //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    //     console.log("Style label array:", inventoryStyleLabels);
    // }
   
    const inventoryColorLabels = inventory.reduce((labels: string[], item) => {
        if (item.color && !labels.includes(item.color)) {
            // console.log(item.color)
            labels.push(item.color);
        }
        return labels;
    }, []);

    // if (inventoryColorLabels.length !== 0) {
    //     console.log("Color label array:", inventoryColorLabels);
    // }

    const inventoryCategoryLabels = inventory.reduce((labels: string[], item) => {
        // console.log(labels)
        const lowerCaseLabel = item.item_type ? item.item_type.toLowerCase(): '';
        if (item.item_type && lowerCaseLabel && !labels.includes(lowerCaseLabel)) {
            // console.log(lowerCaseLabel)
            labels.push(item.item_type);
        }

        return labels;
    }, []);

    // if (inventoryCategoryLabels.length !== 0) {
    //     console.log("Category label array:", inventoryCategoryLabels);
    // }

    const inventoryOutfitLabels = inventory.reduce((labels: string[], item) => {
        if (item.outfit && !labels.includes(item.outfit)) {
            labels.push(item.outfit);
        }
        return labels;
    }, []);

    // if (inventoryOutfitLabels.length !== 0) {
    //     console.log("Outfit label array:", inventoryOutfitLabels);
    // }


    const inventoryTypeLabels = inventory.reduce((labels: string[], item) => {
        if (item.item_type && !labels.includes(item.style)) {
            labels.push(item.style);
        }
        return labels;
    }, []);

    // if (inventoryTypeLabels.length !== 0) {
    //     console.log("Type label array:", inventoryTypeLabels);
    // }

    const inventoryLabels = inventory.reduce((labels: string[], item) => {
        if (item.labels) {
            item.labels.map(label => {
                if (item.labels.length !== 0 && !labels.includes(label) && label !== '') {
                    labels.push(label);
                }
            })
        }
        return labels;
    }, []);

    // if (inventoryLabels.length !== 0) {
    //     console.log("Label array:", inventoryLabels);
    // }

    const inventoryQualityLabels = inventory.reduce((labels: number[], item: Item) => {
        if (item.quality && !labels.includes(item.quality)) {
          labels.push(item.quality);
        }
        return labels;
      }, []);  // Remember! This initial value is an empty array of numbers.

    // if (inventoryQualityLabels.length !== 0) {
    //     console.log("Label array:", inventoryQualityLabels);
    //     console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
    // }


    const handleCheckboxTick = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const label = isNaN(Number(value)) ? value : Number(value);
        dispatch(toggleLabel(label));
    }

    useEffect(() => {
        // if filter menu and main menu isn't open 
        if (!mainMenu && !filterMenu) {
            setCategoryMenu(false)
            setColorMenu(false)
            setLabelsMenu(false)
            setOutfitMenu(false)
            setQualityMenu(false)
            setStyleMenu(false)
            setTabVisible(false)

        }

        // if filter menu is open
        if (!filterMenu) {
            setMainMenu(false)
            // console.log('Filter Menu is Open?:  ', filterMenu)
        }

        // if main "filter" is open
        if(mainMenu) {
            setCategoryMenu(false)
            setColorMenu(false)
            setLabelsMenu(false)
            setOutfitMenu(false)
            setQualityMenu(false)
            setStyleMenu(false)
            setTabVisible(true)
        }

    }, [filterMenu])

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 0;
            
            if (window.scrollY > threshold) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };
        // console.log(window.scrollY)

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')
    console.log('Filter Menu is Open?:  ', filterMenu)
    console.log('Main Menu is Open?:  ', mainMenu)
    console.log('Outfit Tab is Open?:  ', outfitMenu)
    console.log('Tabs are Visble?:  ', tabVisible)
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`')

  
    return (
        <>  
            <div className={`filters-container${filterMenu ? "" : "-hidden"}`} id="filter">
                    {filterMenu ? (
                        <div className={`filters-container-wrap`}>
                    <div className='filter-tab-button-wrap'>
                        <div className='filter-main-title-container' onClick={() => setMainMenu(() => !mainMenu)}>
                            <h3 id="filter-main-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}>Filter</h3>
                        </div>
                        <div className= {`filter-toggle-button${filterMenu ? "-small" : ""}`}
                            onClick={() => {setFilterMenu(() => !filterMenu); setMainMenu(() => !mainMenu)}}>+
                        </div>
                    </div>
                    <div className={`filter-dropdown-menu${mainMenu ? '-open' : "-closed"}`} id='dropdown-menu'>

                        <div className="outfit-filter-container" id="category-container">
                            <h4 id="outfit-filter-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}
                                onClick={() => setOutfitMenu(() => !outfitMenu)}>Outfit Sets</h4>
                            <div className={`outfit-filter-dropdown-menu${outfitMenu ? '-open' : "-closed"}`} id='dropdown-menu'>
                                <div id="outfit-input-container" className="input-container">
                                    {inventoryOutfitLabels.map((set) =>
                                        <label key={set} htmlFor={set} className="label-container">
                                            {set.length > 1 ? (
                                                    set
                                                        .split(" ")
                                                        .map((word) => (
                                                            word[0].toUpperCase() + word.substring(1) + " "
                                                        ))
                                                        
                                                ) : (
                                                    set[0].toUpperCase() + set.substring(1)
                                            )}
                                            <input 
                                                type="checkbox" 
                                                name={set} 
                                                value={set}
                                                onChange={handleCheckboxTick}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="colors-filter-container" id="category-container">
                            <h4 id="colors-filter-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}
                                onClick={() => setColorMenu(() => !colorMenu)}>Colors</h4>
                            <div className={`colors-filter-dropdown-menu${colorMenu ? '-open' : "-closed"}`} id='dropdown-menu'>
                                <div id="colors-input-container" className="input-container">
                                    {inventoryColorLabels.map((color) =>
                                        <label key={color} htmlFor={color} className="label-container">
                                            {color.length > 1 ? (
                                                    color
                                                        .split(" ")
                                                        .map((word) => (
                                                            word[0].toUpperCase() + word.substring(1) + " "
                                                        ))
                                                        
                                                ) : (
                                                    color[0].toUpperCase() + color.substring(1)
                                            )}
                                            <input 
                                                type="checkbox" 
                                                name={color} 
                                                value={color}
                                                onChange={handleCheckboxTick}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="labels-filter-container" id="category-container">
                            <h4 id="labels-filter-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}
                                onClick={() => setLabelsMenu(() => !labelsMenu)}>Labels</h4>
                            <div className={`labels-filter-dropdown-menu${labelsMenu ? '-open' : "-closed"}`} id='dropdown-menu'>
                                
                                <div id='label-input-container' className="input-container">
                                    {inventoryLabels.map((label) =>
                                            <label key={label} htmlFor={label} className="label-container">{label}
                                                <input 
                                                    type="checkbox" 
                                                    name={label} 
                                                    value={label}
                                                    onChange={handleCheckboxTick}
                                                />
                                                <span className="checkmark"></span>
                                            </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="style-filter-container" id="category-container">
                            <h4 id="style-filter-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}  
                                onClick={() => setStyleMenu(() => !styleMenu)}>Style</h4>
                            <div className={`style-filter-dropdown-menu${styleMenu ? '-open' : "-closed"}`} id='dropdown-menu'>
                                <div id="style-input-container" className="input-container">
                                    {inventoryStyleLabels.map((style) =>
                                        <label key={style} htmlFor={style} className="label-container">{style}
                                            <input 
                                                type="checkbox" 
                                                name={style} 
                                                value={style}
                                                onChange={handleCheckboxTick}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="type-filter-container" id="category-container">
                            <h4 id="type-filter-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}
                                onClick={() => setCategoryMenu(() => !categoryMenu)}>Type</h4>
                            <div className={`type-filter-dropdown-menu${categoryMenu ? '-open' : "-closed"}`} id='dropdown-menu'>
                                <div id='type-input-container' className="input-container">
                                    {inventoryCategoryLabels.map((category) =>
                                        <label key={category} htmlFor={category}  className="label-container">{category[0].toUpperCase() + category.substring(1)}
                                            <input 
                                                type="checkbox" 
                                                name={category} 
                                                value={category} 
                                                onChange={handleCheckboxTick}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="quality-filter-container" id="category-container">
                            <h4 id="quality-filter-title"
                                className={`filter-tab${tabVisible ? "-open": "-closed"}`}
                                onClick={() => setQualityMenu(() => !qualityMenu)}>Quality</h4>
                            <div className={`quality-filter-dropdown-menu${qualityMenu ? '-open' : "-closed"}`} id='dropdown-menu'>
                                <div id="quality-input-container" className="input-container">
                                    {inventoryQualityLabels.map((quality) =>
                                        <label key={quality} htmlFor={`${quality}-stars`} className="label-container">{quality} stars
                                            <input 
                                                type="checkbox" 
                                                name={`${quality}-stars`} 
                                                value={quality}
                                                onChange={handleCheckboxTick}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                    </div>
                        </div>
                    ): (
                        <div 
                            className= {`filter-toggle-button-big`} 
                            id={`main-toggle-button${sticky ? '-sticky' : ''}`}
                            onClick={() => {setFilterMenu(() => !filterMenu); setMainMenu(() => mainMenu)}}>+
                        </div>
                    )}
            </div>
        </>
    );
}


export default LabelFilter;