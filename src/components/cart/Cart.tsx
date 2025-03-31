import React from 'react';
import { changeItemQuantity } from '../../reducers/cartSlice';
import { getCurrencySymbol, getTotal, Item, addCommas } from '../../utilities/utilities';
import { AppDispatch } from '../../store';
import '../../styles/cart.css'


type CartProps = {
    cart: {[key: number]: Item };    
    currencyFilter: string;  
    dispatch: AppDispatch;   
};

export const Cart: React.FC<CartProps> =  ({cart, currencyFilter, dispatch})=> {
    const onInputHandler = (name: string, input: string) => {
        if (input === '') {
            return;
        }

        const newQuantity = Number(input);
        dispatch(changeItemQuantity({name, newQuantity}));
    };

    // Assuming 'cart' is an object where keys are item identifiers
    const cartElements = Object.values(cart).map((item: Item) => createCartItem(item));
    const total = getTotal(cart, currencyFilter);

    return (
        <div id="cart-container">
            <ul className='cart-items'>{cartElements}</ul>
            <h4 className="total">
                Total{' '}: 
                <span className='totalValue'> 
                    {getCurrencySymbol(currencyFilter)} {addCommas(total)} {currencyFilter}
                </span>
            </h4>
        </div>
    );


    function createCartItem(item: Item) {
        if(item.quantity === 0) {
            return null;
        }

        return (
            <li id="cart-item" key={item.id}>
                <p>{item.name}</p>
                <select 
                    className='item-quantity'
                    value={item.quantity}
                    onChange={(e) => {
                        onInputHandler(item.name, e.target.value);
                    }}
                >
                    {[...Array(item.stock+1).keys()].map((_, index) => (
                        <option key={index} value={index}>
                            {index}
                        </option>
                    ))}
                </select>
            </li>
        );
    }
};

export default Cart;


