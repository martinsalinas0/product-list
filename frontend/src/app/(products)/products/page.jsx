import ProductCard from "@/app/components/ProductCard";
import ProductsNavBar from "@/app/components/ProductsNavBar";
import { Container } from "react-bootstrap";

export default function Page () {
  return (
    <Container> 
      <ProductsNavBar ></ProductsNavBar>
      <ProductCard> </ProductCard>
      <ProductCard> </ProductCard>
    </Container>
  )
}