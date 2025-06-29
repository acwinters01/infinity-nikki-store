import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { InventoryForm } from "../components/inventory/InventoryForm";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("inventoryForm component", () => { 
  it("submits form and calls Mock API", async () => {
    mockedAxios.post.mockResolvedValue({
      data: { 
        id: 1, 
        name: "Test Item",
        price: 99,
        quantity: 88,
        stock: 77,
        description: 'This is a Test Description',
        type: 'Test Type',
        style: 'Test Style',
        labels: ['lb1', 'l2b'],
        img: "http://image.com",
        item_type: 'Test Item Type',
        evolution_name: 'Test Evolution Name',
        evolution_stage: 'Test Evolution Stage',
        color: 'Test Color',
        outfit_type: 'Test Miracle Outfit',
        outfit: 'Test Outfit',
        outfit_img_url: "http://outfit/image.com"
      }
    });

    const onSuccessMock = jest.fn();


    render(<InventoryForm onSuccess={onSuccessMock} />);

    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: "Test Item" } });  
    fireEvent.change(screen.getByLabelText("Price:"), { target: { value: "99" } });
    fireEvent.change(screen.getByLabelText("Quantity:"), { target: { value: "88" } });
    fireEvent.change(screen.getByLabelText("Stock:"), { target: { value: "77" } });
    fireEvent.change(screen.getByLabelText("Description:"), { target: { value: "This is a Test Description" } });
    fireEvent.change(screen.getByLabelText("Type:"), { target: { value: "Test Type" } });
    fireEvent.change(screen.getByLabelText("Style:"), { target: { value: "Style" } });
    fireEvent.change(screen.getByLabelText("Labels (comma separated):"), { target: { value: ['lb1', 'l2b'] } });
    fireEvent.change(screen.getByLabelText("Clothing Image Url:"), { target: { value: "http://image.com" } });
    fireEvent.change(screen.getByLabelText("Item Type:"), { target: { value: "Test Item Type" } });
    fireEvent.change(screen.getByLabelText("Evolution Name:"), { target: { value: "Test Evolution Name" } });
    fireEvent.change(screen.getByLabelText("Evolution Stage:"), { target: { value: "Tetst Evolution Stage" } });
    fireEvent.change(screen.getByLabelText("Color:"), { target: { value: "Test Color" } });
    fireEvent.change(screen.getByLabelText("Outfit Type:"), { target: { value: "Test Miracle Outfit" } });  
    fireEvent.change(screen.getByLabelText("Outfit:"), { target: { value: "Test Outfit" } });
    fireEvent.change(screen.getByLabelText("Outfit Image Urls (comma separated):"), { target: { value: "http://outfit/image.com" } });


    fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    await waitFor(() =>
      expect(onSuccessMock).toHaveBeenCalledWith({ 
        id: 1, 
        name: "Test Item",
        price: 99,
        quantity: 88,
        stock: 77,
        description: 'This is a Test Description',
        type: 'Test Type',
        style: 'Test Style',
        labels: ['lb1', 'l2b'],
        img: "http://image.com",
        item_type: 'Test Item Type',
        evolution_name: 'Test Evolution Name',
        evolution_stage: 'Test Evolution Stage',
        color: 'Test Color',
        outfit_type: 'Test Miracle Outfit',
        outfit: 'Test Outfit',
        outfit_img_url: "http://outfit/image.com"})
    );
  });

  it("submits form twice with different items:", async () => {
    
    const onSuccessMock = jest.fn();

    mockedAxios.post
      .mockResolvedValueOnce({ data: { id: 1, name: 'Test Item A' }})
      .mockResolvedValueOnce ({ data: { id: 2, name: 'Test Item B' }})

    const { unmount } = render(<InventoryForm onSuccess={onSuccessMock} />);

    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: 'Test Item A' } });
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    await waitFor(() =>
      expect(onSuccessMock).toHaveBeenCalledWith({ id: 1, name: "Test Item A" })
    );
    console.log("Mock calls:", onSuccessMock.mock.calls.map(call => call[0]));

    unmount();

    render(<InventoryForm onSuccess={onSuccessMock} />);
    fireEvent.change(screen.getByLabelText("Name:"), { target: { value: 'Test Item B' } });
    fireEvent.click(screen.getByRole("button", { name: /add item/i }));

    await waitFor(() =>
      expect(onSuccessMock).toHaveBeenCalledWith({ id: 2, name: "Test Item B" })
    );
    console.log("Mock calls:", onSuccessMock.mock.calls.map(call => call[0]));
    
    expect(onSuccessMock).toHaveBeenCalledTimes(2);
  });
});

// Future Test
// describe("Tests inventoryForm connection with Database via API", () => {
//   it("submits form and calls real API", async() => {

//   });

//   it("prevents adding duplicate item", async() => {

//   })
// })