import axios from "axios";
import { Item } from '../utilities/utilities'

// Connecting to backend
export const API_BASE_URL = "http://localhost:5500"; 

// Get all inventory items
export const getInventory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory`);
    return response.data;
  } catch (err) {
    console.error("Error getting Inventory: ", err);
    throw err;
  }
  
};

// Get a Clothing item by ID
export const getInventoryItem = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting Inventory Item: ", error);
    throw error;
  }
  
};

// Get all Outfits
export const getAllOutfits = async (): Promise<Item[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/outfits`);
    return response.data;
  } catch (error) {
    console.error("Error getting All Outfits: ", error);
    throw error;
  }
  
};

// Get an Outfit by OutfitName
export const getOutfitItems = async (outfit: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/inventory/${outfit}`);
    return response.data;
  } catch (error) {
    console.error("Error getting outfit: ", error);
    throw error;
  }
};

// Add a new item
export const addInventoryItem = async (item: any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/inventory`, item);
    return response.data;
  } catch (error) {
    console.error("Error adding item: ", error);
    throw error;
  }
};

// Update an item
export const updateInventoryItem = async (id: number, item: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/inventory/${id}`, item);
    return response.data;
  } catch (error) {
    console.error("Error updating item: ", error);
    throw error;
  }
};

// Delete an item
export const deleteInventoryItem = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/inventory/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting item: ", error);
    throw error;
  }
};