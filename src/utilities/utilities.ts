export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    stock: number,
    description: string;
    type: string;
    style: string;
    labels: string[];
    img: string;
};

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

export const getFilteredItems = (items: any, searchTerm: string): Item[] => {
    if (!searchTerm) return items;

    return items.filter((item: any) => {
        const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        const outfitMatch = item.outfit ? item.outfit.toLowerCase().includes(searchTerm.toLowerCase()) : false;
        return nameMatch || outfitMatch
    })
};


export const getTotal = (cart: Item[], currency: string): number => {
    // Had to figure out how to do this with minimal code. Using reduce sums the total price from each cart item.
    const totalUSD = Object.values(cart).reduce((sum, item) => sum + item.price * item.quantity, 0);
    return parseFloat(calculatePrice(totalUSD, currency).toFixed(2));
}

export const currenciesData = ['USD', 'EUR', 'CAD', 'JPY', 'AUD', 'CNY', 'INR', 'GHS'];

export const styleLabels = [
    { name: "Sweet", url: "./src/assets/labels/Sweet_Icon.png" },
    { name: "Elegant", url: "./src/assets/labels/Elegant_Icon.png" },
    { name: "Cool", url: "./src/assets/labels/Cool_Icon.png" },
    { name: "Fresh", url: "./src/assets/labels/Fresh_Icon.png" },
    { name: "Sexy", url: "./src/assets/labels/Sexy_Icon.png" },
];