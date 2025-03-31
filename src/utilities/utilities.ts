import { basePrices, categoryModifiers, styleModifiers, qualityModifiers,
     evolutionModifiers, labelModifiers, outfitTypeModifiers } from './modifiers';

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
    outfit_type: string;
};

type InventoryItem = {
    type: string;
    style: string;
    labels: string[];
    stock: number;
    quality: number;
    item_type: string,
    evolution_stage: number,
    outfit_type: string,

}

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

export const pricingItem = (item: InventoryItem): number => {

    const base = basePrices[item.type.toLowerCase()] || 0;
    const evolutionMod = evolutionModifiers[item.evolution_stage] || 0;
    const categoryMod = categoryModifiers[item.item_type] || 0;
    const styleMod = styleModifiers[item.style.toLowerCase()] || 0;
    const quality = qualityModifiers[item.quality] || 0;
    const labelMods = item.labels.map(label => labelModifiers[label.toLowerCase()] || 0);
    const labelTotal = labelMods.reduce((sum, mod) => sum + mod, 0);
    const miracleMod = outfitTypeModifiers[item.outfit_type] || 0;
    const priceTotal = base + evolutionMod + categoryMod + styleMod + quality + miracleMod + labelTotal;
    // console.log("Item: ", item);
    // console.log('Base: ', base);
    // console.log('Category: ', categoryMod);
    // console.log('Style: ', styleMod);
    // console.log('Quality: ', quality);
    // console.log('Labels: ', labelMods);
    // console.log('Outfit Type: ', miracleMod)
    // console.log("Total: ", priceTotal)

    return priceTotal;

}

export const changeStockQuantity = (item: InventoryItem) => {
    const stockLimit = 11;
    return Math.floor(Math.random() * stockLimit )

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

export const getFilteredItems = (items: Item[], searchTerm: string): Item[] => {
    if (!searchTerm) return items;
        return items.filter((item: Item) => {
            const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
            const outfitMatch = item.outfit ? item.outfit.toLowerCase().includes(searchTerm.toLowerCase()) : false;
            return nameMatch || outfitMatch
    })
};

export const getFilteredLabels = (inventory: Item[], selectedLabels: (string | number)[] ): Item[] => {
    if (selectedLabels.length === 0) return inventory;

    // console.log(selectedLabels)
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

export const getTotal = (cart: {[key: number]: Item }, currency: string): number => {
    // Had to figure out how to do this with minimal code. Using reduce sums the total price from each cart item.
    const totalUSD = Object.values(cart).reduce((sum, item) => sum + pricingItem(item) * item.quantity, 0);
    return parseFloat(calculatePrice(totalUSD, currency).toFixed(2));
}

export const addCommas = (num: (number | string)) => { 
    const formatted = Number(num).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return formatted;
}

export const currenciesData = ['USD', 'EUR', 'CAD', 'JPY', 'AUD', 'CNY', 'INR', 'GHS'];

export const styleLabels = [
    { name: "Sweet", url: "./assets/labels/Sweet_Icon.png" },
    { name: "Elegant", url: "./assets/labels/Elegant_Icon.png" },
    { name: "Cool", url: "./assets/labels/Cool_Icon.png" },
    { name: "Fresh", url: "./assets/labels/Fresh_Icon.png" },
    { name: "Sexy", url: "./assets/labels/Sexy_Icon.png" },
];