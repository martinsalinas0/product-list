import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { BsFillTrash3Fill, BsInfoSquare } from "react-icons/bs";

export default function ProductCard({ name, price, category, imageUrl }) {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const priceFixer = (price) => {
    const timesTen = price / 10;
    return timesTen.toFixed(2);
  };

  return (
    <Card style={{ width: "18rem" }}>
      <CardBody>
        <Row className="g-2 justify-content-between d-flex" >
          <Col>
            {" "}
            <h5 className="mb-3">
              Category: <strong> {capitalize(category)}</strong>
            </h5>
          </Col>
          <Col className="col-md-4">
            <h5 className="mb-3 h-4">
              <strong>${priceFixer(price)}</strong>
            </h5>
          </Col>
        </Row>

        {/* Centered image */}
        <div className="d-flex justify-content-center mb-3">
          <CardImg
            src={imageUrl}
            style={{ width: "250px", height: "300px", objectFit: "cover" }}
          />
        </div>
        <h1 className="card-title">{name}</h1>

        {/* <Row className="g-2">
          <Col>
            <Button
              className="w-100"
              variant="primary"
              size="sm"
              aria-label="go to product page"
            >
              <BsInfoSquare />
            </Button>
          </Col>
          <Col>
            <Button
              className="w-100"
              variant="danger"
              size="sm"
              aria-label="Delete product"
            >
              <BsFillTrash3Fill />
            </Button>
          </Col>
        </Row> */}
      </CardBody>
    </Card>
  );
}
