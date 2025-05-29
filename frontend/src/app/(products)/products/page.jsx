"use client";

import ProductCard from "@/components/ProductCard.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import {
  fetchProducts,
  searchProducts,
  clearSearch,
} from "../../../store/slices/productSlice.js";

export default function Page() {
  const dispatch = useDispatch();
  const { products, searchQuery, loading, error } = useSelector(
    (state) => state.products
  );
  const [searchBarText, setSearchBarText] = uSeState("");
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  //filter products
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

//create handleSearchBar
//clearSearch
//handlePriceSort
//handle catFilter

  return (
    <div className="container">
      <Navbar
        className="bg-body-tertiary justify-content-between"
        style={{ minHeight: "90px" }}
      >
        <Form className="m-2">
          <InputGroup>
            <InputGroupText id="search-query">
              Search for Products
            </InputGroupText>
            <Form.Control
              placeholder="Search"
              style={{ minWidth: "500px" }}
              value={searchBarText}
  S          onChange={(event) => setSearchBarText(event.target.value)}
            />
            {searchQuery && (
              <Button variant="outline-secondary" >
                Clear
              </Button>
            )}
          </InputGroup>
        </Form>

        <Form className="me-5">
          <Row>
            <Col xs="auto">
              <Button type="button" >
                Search
              </Button>
            </Col>
            <Col xs="auto">
              <NavDropdown
                title={`Sort by Price`}
                id="dropdown-price"
              >
                <NavDropdown.Item >
                  Highest
                </NavDropdown.Item>
                <NavDropdown.Item >
                  Lowest
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item >
                  Clear Sort
                </NavDropdown.Item>
              </NavDropdown>
            </Col>

            <Col xs="auto">
              <NavDropdown
                title={"Category"}
                id="dropdown-cat"
              >
                //map through categories
                
                
              </NavDropdown>
            </Col>
            <Col xs="auto">
              <Button>Create New Product</Button>
            </Col>
          </Row>
        </Form>


      </Navbar>

      <div className="row g-4 mt-4">
        {products.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">
              {loading ? "Loading products" : "No products found."}
            </p>
          </div>
        ) : (
          products.map((product) => (
            <div className="col-12 col-sm-6 col-md-4" key={product.id}>
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
