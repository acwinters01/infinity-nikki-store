export interface Item {
    id: number;
    name: string;
    price: number;
    quantity: number;
    quality: number;
    stock: number,
    description: string;
    type: string;
    style: string;
    labels: string[];
    img: string;
    item_type: string;
    evolution: boolean;
    evolution_name: string;
    evolution_stage: number;
    outfit: string;
    color: string;
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

export const getFilteredLabels = (
    inventory: Item[],
    selectedLabels: (string | number)[],

): Item[] => {
    if (selectedLabels.length === 0) return inventory;

    return inventory.filter(item => {
        const labelValues: (string | number)[] = [];
        
        // Considering labels with arrays
        if (item.labels && item.labels.length > 0) {
          labelValues.push(...item.labels);
        }

        // Add the all properties
        if (item.color) labelValues.push(item.color);
        if (item.style) labelValues.push(item.style);
        if (item.item_type) labelValues.push(item.item_type);
        if (item.outfit) labelValues.push(item.outfit);
        if (item.quality !== undefined && item.quality !== null) labelValues.push(item.quality);
    
        // Checking if at least one of the selected labels matches any label.
        return selectedLabels.some(label => {
          if (typeof label === 'string') {
            return labelValues.some(value =>
              typeof value === 'string' && value.trim().toLowerCase() === label.trim().toLowerCase()
            );

          } else if (typeof label === 'number') {
            return labelValues.some(value => typeof value === 'number' && value === label);
          }
          return false;

        });
      });
}

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