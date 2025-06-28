import { useState } from "react";
import { addInventoryItem, updateInventoryItem } from "../../utilities/api";
import { Item } from '../../utilities/utilities';

interface InventoryFormProps {
  existingItem?: Item; 
  onSuccess?: (item: Item) => void;
}

export const InventoryForm = ({ existingItem, onSuccess }: InventoryFormProps ) => {
    const [formData, setFormData] = useState(existingItem || {
    name: '',
    price: '',
    stock: '',
    description: '',
    type: '',
    style: '',
    labels: [],
    img: '',
    outfit: '',
    quantity: '',
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const response = existingItem
            ? await updateInventoryItem(existingItem.id, formData)
            : await addInventoryItem(formData);
        if (onSuccess) onSuccess(response);
    };

    return (
        <form onSubmit={handleSubmit} className="db_form">
            <div className="labels_wrap">    
                <label>
                    <input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Item Name" 
                    />
                    Name: 
                </label>

                <label>
                    <input 
                        name="price" 
                        value={formData.price} 
                        onChange={handleChange} 
                        placeholder="Price" 
                    />
                    Price: 
                </label>
                <label>
                    <input 
                        name="quantity" 
                        value={formData.quantity} 
                        onChange={handleChange} 
                        placeholder="Quantity" 
                    />
                    Quantity: 
                </label>

                <label>
                    <input 
                        name="quality" 
                        value={formData.quality} 
                        onChange={handleChange} 
                        placeholder="Quality" 
                    />
                    Quality:
                </label>
                <label>
                    <input 
                        name="stock" 
                        value={formData.stock} 
                        onChange={handleChange} 
                        placeholder="Stock" 
                    />
                    Stock
                </label>
                <label>
                    <input 
                        name="description" 
                        value={formData.description} 
                        onChange={handleChange} 
                        placeholder="Description" 
                    />
                    Description:
                </label>
                <label>
                    <input 
                        name="type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        placeholder="Type" 
                    />
                    Type: 
                </label>
                <label>
                    <input 
                        name="style" 
                        value={formData.style} 
                        onChange={handleChange} 
                        placeholder="Style" 
                    />
                    Style: 
                </label>
                <label>
                    <input 
                        name='labels'
                        value={formData.labels.join(',')}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                                ...prev,
                                labels: e.target.value.split(',').map(s => s.trim()),
                            }))
                        }
                        placeholder="Labels (comma separated)"
                    />
                    Labels: 
                </label>
                <label>
                    <input 
                        name="img" 
                        value={formData.img} 
                        onChange={handleChange} 
                        placeholder="Image URL" 
                    />
                    Clothing Image Url: 
                </label>
                <label>
                    <input 
                        name="item_type" 
                        value={formData.item_type} 
                        onChange={handleChange} 
                        placeholder="Item Type" 
                    />
                    Item Type: 
                </label>
                <label>
                    <input 
                        type="checkbox"
                        name="evolution" 
                        checked={formData.evolution} 
                        onChange={handleChange} 
                    />
                    Evolution: 
                </label>
                    
                <label>
                    <input 
                        name="evolution_name" 
                        value={formData.evolution_name} 
                        onChange={handleChange} 
                        placeholder="Evolution Name" 
                    />
                    Evolution Name: 
                </label>

                <label>
                    <input 
                        name="evolution_stage" 
                        value={formData.evolution_stage} 
                        onChange={handleChange} 
                        placeholder="Evolution Stage" 
                    />
                    Evolution Stage: 
                </label>

                <label>
                    <input 
                        name="outfit" 
                        value={formData.outfit} 
                        onChange={handleChange} 
                        placeholder="Outfit" 
                    />
                    Outfit: 
                </label>
                <label>
                    <input 
                        name="color" 
                        value={formData.color} 
                        onChange={handleChange} 
                        placeholder="Color" 
                    />
                    Color: 
                </label>
                <label>
                    <input 
                        name="outfit_type" 
                        value={formData.outfit_type} 
                        onChange={handleChange} 
                        placeholder="Outfit Type" 
                    />
                    Outfit Type: 
                </label>
                
                <label>
                    <input
                        name="outfit_img_url"
                        value={formData.outfit_img_url.join(',')}
                        onChange={(e) =>
                            setFormData((prev: any) => ({
                            ...prev,
                            outfit_img_url: e.target.value.split(',').map(s => s.trim()),
                            }))
                        }
                        placeholder="Outfit Image Urls (comma separated)"
                    />
                    Outfit Image Url: 
                </label>
            </div>
            <button type="submit" className="submit-button">
                {existingItem ? 'Update' : 'Add'} Item
            </button>
        </form>
    );



}