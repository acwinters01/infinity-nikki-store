import React from "react";
import { currenciesData } from "../../utilities/utilities";
import { setCurrency } from "../../reducers/currencyFilterSlice";
import { AppDispatch } from "../../store";


interface CurrencyProps {
    dispatch: AppDispatch;
    currencyFilter: string
}
export const CurrencyFilter:  React.FC<CurrencyProps> = ({ currencyFilter, dispatch}) => {
    let currency: string = '';

    const onClickHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCurrency = e.target.value;
        console.log('Dispatching Currency...', newCurrency);
        dispatch(setCurrency(newCurrency))
    };


    return (
        <>
            <div className="currency-filter-container">
                <h3>Currency: </h3>
                    <div className="select-container">
                        <select key={currency} name="currencyType" 
                            onChange={onClickHandler}>
                            {currenciesData.map(currency => (
                                <option 
                                    key={currency} 
                                    value={currency}
                                    className={`currency-button ${currencyFilter === currency &&
                                        'selected'
                                    }`}>
                                        {currency}
                                    </option>
                            ))}
            
                        </select>
                    </div>
            </div>
        </>
    );
};

export default CurrencyFilter;