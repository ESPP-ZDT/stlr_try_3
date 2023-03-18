import React, { useState } from "react";
import { Product } from "../types";
import "./ProductTable.css";

interface Props {
  products: Product[];
  onDelete: (productId: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, onDelete }) => {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortKey, setSortKey] = useState<"price" | "rating" | "stock">("price");

  const sortedProducts = products.sort((a, b) => {
    const sortValue = sortOrder === "asc" ? 1 : -1;
    if (sortKey === "price") {
      return sortValue * (a.price - b.price);
    } else if (sortKey === "rating") {
      return sortValue * (a.rating - b.rating);
    } else {
      return sortValue * (a.stock - b.stock);
    }
  });

  const handleSortClick = (key: "price" | "rating" | "stock") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>
              Price
              <button onClick={() => handleSortClick("price")}>
                {sortKey === "price" && sortOrder === "asc" && "▲"}
                {sortKey === "price" && sortOrder === "desc" && "▼"}
              </button>
            </th>
            <th>
              Rating
              <button onClick={() => handleSortClick("rating")}>
                {sortKey === "rating" && sortOrder === "asc" && "▲"}
                {sortKey === "rating" && sortOrder === "desc" && "▼"}
              </button>
            </th>
            <th>
              Stock
              <button onClick={() => handleSortClick("stock")}>
                {sortKey === "stock" && sortOrder === "asc" && "▲"}
                {sortKey === "stock" && sortOrder === "desc" && "▼"}
              </button>
            </th>
            <th>Brand</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
              <td>{product.brand}</td>
              <td>{product.category}</td>
              <td className="delete-button">
                <button onClick={() => onDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
