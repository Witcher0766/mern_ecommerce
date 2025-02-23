import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className="g-4">
          <Col md={5}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              className="rounded shadow-sm"
            />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush" className="shadow-sm">
              <ListGroup.Item className="py-3">
                <h2 className="mb-3">{product.name}</h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  className="mb-3"
                />
                <p className="text-muted mb-0">Price:</p>
                <h4 className="text-primary">₹{product.price}</h4>
              </ListGroup.Item>
              <ListGroup.Item className="py-3">
                <p className="text-muted mb-0">Description:</p>
                <p className="mb-0">{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card className="shadow-sm">
              <ListGroup variant="flush">
                <ListGroup.Item className="py-3">
                  <Row>
                    <Col>
                      <p className="text-muted mb-0">Price:</p>
                    </Col>
                    <Col className="text-end">
                      <strong className="text-primary">₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Row>
                    <Col>
                      <p className="text-muted mb-0">Status:</p>
                    </Col>
                    <Col className="text-end">
                      <strong>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Out of Stock</Badge>
                        )}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item className="py-3">
                    <Row className="align-items-center">
                      <Col>
                        <p className="text-muted mb-0">Quantity:</p>
                      </Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                          className="form-select-sm"
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="py-3">
                  <Button
                    className="w-100 btn-primary"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;