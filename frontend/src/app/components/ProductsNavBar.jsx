"use client";

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

export default function ProductsNavBar() {
  return (
    <Navbar
      className="bg-body-tertiary justify-content-between"
      style={{ minHeight: "90px" }}
    >
      <Form className="m-2">
        <InputGroup>
          <InputGroupText id="search-query">Search for Products</InputGroupText>
          <Form.Control placeholder="Search" style={{ minWidth: "500px" }} />
        </InputGroup>
      </Form>

      <Form className="me-5">
        <Row>
          <Col xs="auto">
            <Button type="submit"> Search</Button>
          </Col>
          <Col xs="auto">
            <NavDropdown title="Sort by Price" id="dropdown-price">
              <NavDropdown.Item>Highest</NavDropdown.Item>
              <NavDropdown.Item>Lowest</NavDropdown.Item>
            </NavDropdown>
          </Col>

          <Col xs="auto">
            <NavDropdown title="Sort by Category" id="dropdown-cat">
              <NavDropdown.Item>Garden</NavDropdown.Item>
              <NavDropdown.Item>Tools</NavDropdown.Item>
            </NavDropdown>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
}
