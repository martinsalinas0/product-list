"use client";
import ProductCard from "@/components/ProductCard.jsx";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Col,
  Form,
  FormControl,
  InputGroup,
  InputGroupText,
  Navbar,
  NavDropdown,
  Row,
} from "react-bootstrap";
import { Text } from "react-bootstrap/InputGroup";
import { fetchProducts } from "../store/slices/productSlice.js";
import { setPage } from "../store/slices/productSlice.js";

export default function ProductsList() {
  const dispatch = useDispatch();
  const { products, isLoading, error, count, categories, page, totalPages } = useSelector(
    (state) => state.products
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceSort, setPriceSort] = useState(null);
  const [catsForDropDown, setcatsForDropDown] = useState([])

  useEffect(() => {
    dispatch(fetchProducts({ category: selectedCategory, priceSort, page }));
  }, [selectedCategory, priceSort, page, dispatch]);


  useEffect(() => {
    if (!searchQuery) {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [products, searchQuery]);

  const handlePriceSort = (sortOption) => {
    setPriceSort(sortOption);
    dispatch(setPage(1))
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    dispatch(setPage(1))
  };


  const handleSearchBarInput = (text) => {
    setSearchQuery(text);
    dispatch(setPage(1));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceSort(null);
    dispatch(setPage(1));
  };

  const prevPage = () => {
    if (page > 1) {
      dispatch(setPage(page - 1))
    }
  };

  const nextPage = () => {
    if (page < totalPages){
       dispatch(setPage(page + 1))
    }
  };

  return (
    <div className="container">
      <Navbar
        className="bg-body-tertiary justify-content-between"
        style={{ minHeight: "90px" }}
      >
        <Form className="m-2">
          <InputGroup>

            <FormControl
              placeholder="Search Product"
              style={{ minWidth: "500px" }}
              value={searchQuery}
              onChange={(event) => handleSearchBarInput(event.target.value)}
            />
          </InputGroup>
        </Form>

        <Form className="me-5">
          <Row>
            <Col xs="auto">
              <NavDropdown title={`Sort by Price`} id="dropdown-price">
                <NavDropdown.Item onClick={() => handlePriceSort("highest")}>
                  Highest
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handlePriceSort("lowest")}>
                  Lowest
                </NavDropdown.Item>
              </NavDropdown>
            </Col>

            <Col xs="auto">
              <NavDropdown title={`Category`} id="dropdown-cat">
                <NavDropdown.Item
                  onClick={() => handleCategorySelect(null)}
                  active={selectedCategory === null}
                >
                  All
                </NavDropdown.Item>
                {categories.map((cat, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => handleCategorySelect(cat)}
                    active={selectedCategory === cat}
                  >
                    {cat}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            </Col>

            <Col xs="auto">
              <Button
                type="button"
                className="btn-sm"
                //no function
              >
                Create New Product
              </Button>
            </Col>
            <Col xs="auto">
              <Button
                type="button"
                className="btn btn-sm btn-success"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
            </Col>
          </Row>
        </Form>
      </Navbar>

      <div className="row g-4 mt-4">
        {isLoading ? (
          <div className="col-12 text-center">
            <p className="text-muted">Loading all products...</p>
          </div>
        ) : error ? (
          <div className="col-12 text-center text-danger">
            <p>{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="col-12 text-center">
            <p className="text-muted">No products found.</p>
          </div>
        ) : (
          filteredProducts.map((product, index) => (
            <div
              className="col-12 col-sm-6 col-md-4"
              key={product._id ?? index}
            >
              <ProductCard
                name={product.name}
                category={product.category}
                price={product.price}
                imageUrl={product.image || "https://picsum.photos/200/300"}
              />
            </div>
          ))
        )}
      </div>

      <div className="d-flex justify-content-center my-4 gap-3">
        <Button
          onClick={prevPage}
          disabled={page <= 1}
          variant="secondary"
          size="sm"
        >
          Previous
        </Button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <Button
          onClick={nextPage}
          disabled={page >= (totalPages || 1)}
          variant="secondary"
          size="sm"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
