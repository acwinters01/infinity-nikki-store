import React from "react";
import { currenciesData } from "../inventory/data";
import { labelFilter, typeFilter, styleFilter } from "./filtersSlice";
import { setCurrency } from "./currencyFilter/currencyFilterSlice";
import './filters.css';


export const Filters = () => {



    return (
        <>
            <div className="filters-container">
                <div className="filters-dropdown-menu">
                    <div className="colors-filter-container">
                        <h4>Colors</h4>
                        <div id="color-input-container" className="input-container">
                            <label htmlFor="red" className="label-container">Red
                                <input type="checkbox" name={"colors"} value={"red"}/>
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="blue" className="label-container">Blue
                                <input type="checkbox" name={"colors"} value={"blue"}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="labels-filter-container">
                        <h4>Labels</h4>
                        <div id='label-input-container' className="input-container">
                            <label htmlFor="romance" className="label-container">Romance
                                <input type="checkbox" name={"labels"} value={"romance"}/>
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="retro" className="label-container">Retro
                                <input type="checkbox" name={"labels"} value={"retro"}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="style-filter-container">
                        <h4>Style</h4>
                        <div id="style-input-container" className="input-container">
                            <label htmlFor="sweet" className="label-container">Sweet
                                <input type="checkbox" name={"style"} value={"sweet"}/>
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="sexy" className="label-container">Sexy
                                <input type="checkbox" name={"style"} value={"sexy"}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                     </div>
                    <div className="type-filter-container">
                        <h4>Type</h4>
                        <div id='type-input-container' className="input-container">
                            <label htmlFor="top" className="label-container">Tops
                                <input type="checkbox" name={"type"} value={"top"}/>
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="hair-accessories" className="label-container">Hair Accessories
                                <input type="checkbox" name={"type"} value={"hair-accessories"}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>
                    <div className="quality-filter-container">
                        <h4>Quality</h4>
                        <div id="quality-input-container" className="input-container">
                            <label htmlFor="5" className="label-container">5 stars
                                <input type="checkbox" name={"quality"} value={"5"}/>
                                <span className="checkmark"></span>
                            </label>
                            <label htmlFor="3" className="label-container">3 stars
                                <input type="checkbox" name={"quality"} value={"3"}/>
                                <span className="checkmark"></span>
                            </label>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
}