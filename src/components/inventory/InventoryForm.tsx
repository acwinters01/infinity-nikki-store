import { useState } from "react";
import { addInventoryItem, updateInventoryItem } from "../../utilities/api";
import { Item } from '../../utilities/utilities';

interface InventoryFormProps {
  existingItem?: Item; 
  onSuccess?: (item: Item) => void;
}

export const InventoryForm = ({ existingItem, onSuccess }: InventoryFormProps ) => {
    const [formData, setFormData] = useState<Item>(existingItem || {
    id: undefined,
    name: '',
    price: 0,
    stock: 0,
    description: '',
    type: '',
    style: '',
    labels: [],
    img: '',
    outfit: '',
    quantity: 0,
    color: '',
    evolution: false,
    evolution_name: '',
    evolution_stage: 0,
    quality: 0,
    item_type: '',
    outfit_type: '',
    outfit_img_url: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const numericFields = ['price', 'stock', 'quantity', 'evolution_stage', 'quality'];
    setFormData((prev: any) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : 
            numericFields.includes(name) ? parseFloat(value) || 0 :
            value,   
    }));
  };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        let response;
        
        if(existingItem?.id !== undefined) {
            response = await updateInventoryItem(existingItem.id, formData);
        } else {
            response = await addInventoryItem(formData)
        }
        if (onSuccess) onSuccess(response);
    };

    return (
        <form onSubmit={handleSubmit} className="db_form">
            <div className="labels_wrap">
                <label htmlFor="name">Name:</label>
                <input id="name" name="name" value={formData.name} onChange={handleChange} />

                <label htmlFor="price">Price:</label>
                <input id="price" name="price" value={formData.price} onChange={handleChange} />

                <label htmlFor="quantity">Quantity:</label>
                <input id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} />

                <label htmlFor="quality">Quality:</label>
                <input id="quality" name="quality" value={formData.quality} onChange={handleChange} />

                <label htmlFor="stock">Stock:</label>
                <input id="stock" name="stock" value={formData.stock} onChange={handleChange} />

                <label htmlFor="description">Description:</label>
                <input id="description" name="description" value={formData.description} onChange={handleChange} />

                <label htmlFor="type">Type:</label>
                <input id="type" name="type" value={formData.type} onChange={handleChange} />

                <label htmlFor="style">Style:</label>
                <input id="style" name="style" value={formData.style} onChange={handleChange} />

                <label htmlFor="labels">Labels (comma separated):</label>
                <input
                id="labels"
                name="labels"
                value={formData.labels.join(',')}
                onChange={(e) =>
                    setFormData((prev: any) => ({
                    ...prev,
                    labels: e.target.value.split(',').map(s => s.trim()),
                    }))
                }
                />

                <label htmlFor="img">Clothing Image Url:</label>
                <input id="img" name="img" value={formData.img} onChange={handleChange} />

                <label htmlFor="item_type">Item Type:</label>
                <input id="item_type" name="item_type" value={formData.item_type} onChange={handleChange} />

                <label htmlFor="evolution">Evolution:</label>
                <input id="evolution" type="checkbox" name="evolution" checked={formData.evolution} onChange={handleChange} />

                <label htmlFor="evolution_name">Evolution Name:</label>
                <input id="evolution_name" name="evolution_name" value={formData.evolution_name} onChange={handleChange} />

                <label htmlFor="evolution_stage">Evolution Stage:</label>
                <input id="evolution_stage" name="evolution_stage" value={formData.evolution_stage} onChange={handleChange} />

                <label htmlFor="outfit">Outfit:</label>
                <input id="outfit" name="outfit" value={formData.outfit} onChange={handleChange} />

                <label htmlFor="color">Color:</label>
                <input id="color" name="color" value={formData.color} onChange={handleChange} />

                <label htmlFor="outfit_type">Outfit Type:</label>
                <input id="outfit_type" name="outfit_type" value={formData.outfit_type} onChange={handleChange} />

                <label htmlFor="outfit_img_url">Outfit Image Urls (comma separated):</label>
                <input
                id="outfit_img_url"
                name="outfit_img_url"
                value={formData.outfit_img_url.join(',')}
                onChange={(e) =>
                    setFormData((prev: any) => ({
                    ...prev,
                    outfit_img_url: e.target.value.split(',').map(s => s.trim()),
                    }))
                }
                />
            </div>

            <button type="submit" className="submit-button">
                {existingItem ? 'Update' : 'Add'} Item
            </button>
        </form>
    );



}