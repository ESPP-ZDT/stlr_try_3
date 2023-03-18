import React from "react";
import { Product } from "../types";
import "./ProductTable.css";

interface Props {
  products: Product[];
  onDelete: (productId: number) => void;
}

const ProductTable: React.FC<Props> = ({ products, onDelete }) => {

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
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
