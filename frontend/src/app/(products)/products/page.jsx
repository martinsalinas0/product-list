'use client'

import ProductCard from "@/app/components/ProductCard";
import ProductsNavBar from "@/app/components/ProductsNavBar";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

export default function Page () {

  const [data, setData] = useState(null)
  const [products, setProducts ] = useState([]); 

  useEffect(() => { 
    const fetchProducts = async () => {
      try {
       const response = await axios.get('http://localhost:8000/api/products'); 
        setProducts(response.data)
        
      } catch (error) {
        console.error('error:', error)
      } 
    } 
    fetchProducts()
    console.log(products)
  }, [])

  console.log(products)


  return (
    <Container> 
      <ProductsNavBar ></ProductsNavBar>
      <ProductCard> </ProductCard>
      <ProductCard> </ProductCard>
    </Container>
  )
}