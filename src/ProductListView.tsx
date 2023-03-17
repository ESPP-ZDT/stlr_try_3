import React, { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./types";
import ProductTable from "./components/ProductTable";
import AddProductForm from "./components/AddProductForm";
import "./ProductListView.css"; // Import CSS file

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios("https://dummyjson.com/products");
      setProducts(result.data.products);
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

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input type="text" value={searchQuery} onChange={handleSearch} className="search-bar" />
      <AddProductForm onAdd={handleAdd} />
      <ProductTable products={filteredProducts} onDelete={handleDelete} />
    </div>
  );
};

export default ProductList;
