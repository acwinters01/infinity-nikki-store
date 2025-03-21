import axios from "axios";

const API_BASE_URL = "http://localhost:5000"; // Change this if your backend is deployed

// Get all inventory items
export const getInventory = async () => {
  const response = await axios.get(`${API_BASE_URL}/inventory`);
  return response.data;
};

// Get a single item by ID
export const getInventoryItem = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/inventory/${id}`);
  return response.data;
};

// Add a new item
export const addInventoryItem = async (item: any) => {
  const response = await axios.post(`${API_BASE_URL}/inventory`, item);
  return response.data;
};

// Update an item
export const updateInventoryItem = async (id: string, item: any) => {
  const response = await axios.put(`${API_BASE_URL}/inventory/${id}`, item);
  return response.data;
};

// Delete an item
export const deleteInventoryItem = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/inventory/${id}`);
  return response.data;
};