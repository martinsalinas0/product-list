"use client";

import ProductCard from "@/app/components/ProductCard";
import ProductsNavBar from "@/app/components/ProductsNavBar";
import { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { fa } from "faker/lib/locales";
import "bootstrap/dist/css/bootstrap.css";

export default function Page() {
  const [data, setData] = useState(null);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts ] = useState([])
  const []
  const [pageNumber, setPageNumber] = useState(1);
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");

        const data = response.data;

        setProducts(data.products || []);
        setPageNumber(data.page || 1);
        setNumOfProducts(data.count) || 0;
      } catch (error) {
        console.error("error fetching request:", error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
    //console.log(products)
  }, []);

  // console.log(products);
  // console.log(products);
  // console.log(pageNumber);
  // console.log(numOfProducts);
  // //console.log()

  return (
   <div className="container">
  <ProductsNavBar />
  <div className="row g-4 mt-4">
    {products.length === 0 ? (
      <div className="col-12 text-center">
        <p className="text-muted">No products found.</p>
      </div>
    ) : (
      products.map((product, index) => (
        <div className="col-12 col-sm-6 col-md-4" key={product.id || index}>
          <ProductCard
            name={product.name}
            category={product.category}
            price={product.price}
            imageUrl={product.imageUrl || "https://picsum.photos/200/200"}
          />
        </div>
      ))
    )}
  </div>
</div>
  );
}
