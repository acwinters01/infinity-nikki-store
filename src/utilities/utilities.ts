export const calculatePrice = (price: number, currency: string) => {
    switch(currency) {
        case 'CAD': // Canadian Dollar
            return price * 1.43;

        case 'EUR': // Euro
            return price * 0.95; 

        case 'JPY': // Japanese Yen
            return price * 149.26;

        case 'AUD': // Australian Dollar
            return price * 1.58;

        case 'CNY': // Chinese Yuan
            return price * 7.25;

        case "INR": // Indian Rupee
            return price * 87.09;

        case "GHS": // Ghanaian Cedi
            return price * 15.46; 

        default: 
            return price;
    }

}

export const getCurrencySymbol = (currencyFilter: string) => {
    switch (currencyFilter) {
        case 'USD':
            return '$';
        case 'EUR':
            return '€';
        case 'CAD':
            return '$';
        case 'JPY':
            return "¥";
        case 'AUD': 
            return "$";
        case "CNY": 
            return "¥";
        case "INR":
            return "₹";
        case "GHS":
            return "₵";
        default: 
            return '';
    }
}


export type Item = {
    id: number;
    name: string;
    price: number;
    quantity: number;
    description: string;
    type: string;
    style: string;
    labels: string[];
    img: string;
};

export const getFilteredItems = (items: Item[], searchTerm: string) => {
    return items.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
}

export const getTotal = (cart: Record <string, Item>, currency: string) => {
    let totalUSD = 0;
    Object.keys(cart).forEach((itemName: string) => {
        totalUSD += cart[itemName].price * cart[itemName].quantity;
    });

    return calculatePrice(totalUSD, currency).toFixed(2);
}