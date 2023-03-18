import React, { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";
import { Product } from "./types";
import ProductTable from "./components/ProductTable";
import AddProductForm from "./components/AddProductForm";
import "./ProductListView.css";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios("https://dummyjson.com/products");
        setProducts(result.data.products);
      } catch (error) {
        setError((error as AxiosError).message);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleAdd = (product: Product) => {
    setProducts([...products, product]);
  };

  if (error) {
    return (
      <div>
        <div>Error: {error}</div>
        <AddProductForm onAdd={handleAdd} />
        <ProductTable products={products} onDelete={handleDelete} />
      </div>
    );
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <>
      <label htmlFor="searchInput">Search by title:</label>
      <input id="searchInput" type="text" value={searchQuery} onChange={handleSearch} className="search-bar" />
      </>
      <AddProductForm onAdd={handleAdd} />
      <ProductTable products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
};

export default ProductList;
