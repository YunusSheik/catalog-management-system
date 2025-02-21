import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const ProductContext = createContext();

// Create the provider component
export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Fetch products from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${currentPage}`
        );
        setProducts(response.data.products); // Update products
        setTotalPages(response.data.totalPages || 1); // Set total pages
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, [currentPage]);

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        setCurrentPage,
        totalPages,
        loading,
        setLoading,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
