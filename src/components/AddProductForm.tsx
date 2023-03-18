import React, { useState } from "react";
import { Product } from "../types";
import "./AddProductForm.css";

interface Props {
  onAdd: (product: Product) => void;
}

const AddProductForm: React.FC<Props> = ({ onAdd }) => {
  const [product, setProduct] = useState<Product>({
    id: 0,
    title: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    brand: "",
    category: "",
  });
  const [isOpen, setIsOpen] = useState<boolean>(false); // Add isOpen state

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAdd(product);
    setProduct({
      id: 0,
      title: "",
      description: "",
      price: 0,
      rating: 0,
      stock: 0,
      brand: "",
      category: "",
    });
  };

  // Add toggle function to toggle isOpen state
  const toggleForm = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="add-product-form-container">
      <button onClick={toggleForm}>{isOpen ? 'Hide Form' : 'Add Product'}</button>
      {isOpen && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleChange}
            placeholder="Title"
            required
          />
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="number"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
            required
          />
          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
          />
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleChange}
            placeholder="Category"
            required
          />
          <button type="submit">Add Product</button>
        </form>
      )}
    </div>
  );
};

export default AddProductForm;
