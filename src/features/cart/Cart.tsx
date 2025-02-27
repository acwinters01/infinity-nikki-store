import React from 'react';
import { getCurrencySymbol, getTotal } from '../../utilities/utilities';
import { changeItemQuantity } from './cartSlice';
import './cart.css'

export const Cart = (props: any) => {
    const {cart, currencyFilter, dispatch } = props;

    const onInputHandler = (name: string, input: string) => {

        if (input === '') {
            return;
        }
        const newQuantity = Number(input);
        dispatch(changeItemQuantity({name, newQuantity}));
    }

    const cartElements = Object.keys(cart).map((itemName =>
        createCartItem(itemName)
    ))

    const total = getTotal(cart, currencyFilter);

    return (
        <div id="cart-container">
            <ul className='cart-items'>{cartElements}</ul>
            <h4 className="total">
                Total{' '}
                <span className='totalValue'> 
                    {getCurrencySymbol(currencyFilter)}{total} {currencyFilter}
                </span>
            </h4>
        </div>
    );


    function createCartItem(name: string) {
        const item = cart[name];

        if(item.quantity === 0) {
            return;
        }

        return (
            <li key={name}>
                <p>{name}</p>

                <select 
                    className='item-quantity'
                    value={item.quantity}
                    onChange={(e) => {
                        onInputHandler(name, e.target.value);
                    }}
                >
                    {[...Array(100).keys()].map((_, index) => (
                        <option key={index} value={index}>
                            {index}
                        </option>
                    ))}
                </select>
            </li>
        );
    }
};

