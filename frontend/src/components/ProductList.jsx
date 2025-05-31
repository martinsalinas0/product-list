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

export default function Page() {
  const dispatch = useDispatch();
  const {
    products,
    count,
    page: currentPage,
    totalPages,
    loading,
    error,
  } = useSelector((state) => state.products);

  const [searchBarText, setSearchBarText] = useState("");
  const [priceSort, setpriceSort] = useState(null);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const queryParams = new URLSearchParams();
    queryParams.append("page", page);
    if (selectedCategory) {
      queryParams.append("category", selectedCategory);
    }
    if (priceSort) {
      queryParams.append("price", priceSort);
    }
    if (searchBarText) {
      queryParams.append("query", searchBarText);
    }

    dispatch(fetchProducts(queryParams.toString()));
  }, [dispatch, page, selectedCategory, priceSort, searchBarText]);

  useEffect(() => {
    if (products.length > 0) {
      const allCategories = [
        ...new Set(products.map((product) => product.category)),
      ];
      setCategoryFilters(allCategories);
    }
  }, [products]);

  const handleSearchBarInput = (text) => {
    setSearchBarText(text);
    setPage(1);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    fetchProducts(queryParams);
    setPage(1);
  };

  const handleSortSelect = (order) => {
    setpriceSort(order === priceSort ? null : order);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchBarText("");
    setSelectedCategory(null);
    setpriceSort(null);
    setPage(1);
  };

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="container">
      <Navbar
        className="bg-body-tertiary justify-content-between"
        style={{ minHeight: "90px" }}
      >
        <Form className="m-2">
          <InputGroup>
            <InputGroup.Text id="search-query">
              Search for Products
            </InputGroup.Text>
            <FormControl
              placeholder="Search"
              style={{ minWidth: "500px" }}
              value={searchBarText}
              onChange={(event) => handleSearchBarInput(event.target.value)}
            />
          </InputGroup>
        </Form>

        <Form className="me-5">
          <Row>
            <Col xs="auto">
              <NavDropdown title={`Sort by Price`} id="dropdown-price">
                <NavDropdown.Item onClick={() => handleSortSelect("highest")}>
                  Highest
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortSelect("lowest")}>
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
                {categoryFilters.map((category, index) => (
                  <NavDropdown.Item
                    key={index}
                    onClick={() => handleCategorySelect(category)}
                    active={selectedCategory === category}
                  >
                    {category}
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
        {loading ? (
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
          products.map((product, index) => (
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
