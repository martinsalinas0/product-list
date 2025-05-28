import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Container,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";

export default function ProductCard( {name, price, category, imageUrl}) {
  return (
    <Card style={{ width: "18rem" }}>
      <CardBody>
        <CardTitle>PRODUCT NAME  /*name*/</CardTitle>
        <CardText>This is the product text</CardText>
        <CardSubtitle className="mb-2 text-muted">Price: $3.22   /*price*/</CardSubtitle>
        <CardSubtitle className="mb-3 text-muted">
          Category: Garden {/*category*/}
        </CardSubtitle>

        <CardImg
          src="https://picsum.photos/200" /*imageUrl*/
          style={{ width: "250px", height: "300px", objectFit: "cover" }}
        />

        <Container className="d-flex justify-content-end p-0">
          <Button variant="danger" size="sm">
            <FaTrash />
          </Button>
        </Container>
      </CardBody>
    </Card>
  );
}
