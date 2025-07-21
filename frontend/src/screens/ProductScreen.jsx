import React, { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
import { FaCartPlus } from "react-icons/fa";

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
      <Link className="btn btn-outline-secondary my-3" to="/">
        ← Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row className="g-4">
          {/* Product Image */}
          <Col md={5}>
            <div className="border rounded shadow-sm overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fluid
                className="w-100 rounded"
                style={{ objectFit: "cover", maxHeight: "500px" }}
              />
            </div>
          </Col>

          {/* Product Details */}
          <Col md={4}>
            <ListGroup variant="flush" className="shadow-sm border rounded">
              <ListGroup.Item className="py-4">
                <h2 className="fw-bold">{product.name}</h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  className="mt-2"
                />
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <strong className="text-muted d-block mb-1">Price:</strong>
                <h4 className="text-primary fw-semibold">
                  ₹{product.price}
                </h4>
              </ListGroup.Item>

              <ListGroup.Item className="py-3">
                <strong className="text-muted d-block mb-1">Description:</strong>
                <p className="mb-0 text-secondary">{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Add to Cart Card */}
          <Col md={3}>
            <Card className="shadow-sm border-0">
              <ListGroup variant="flush">
                <ListGroup.Item className="py-3">
                  <Row>
                    <Col>
                      <span className="text-muted">Price:</span>
                    </Col>
                    <Col className="text-end">
                      <strong className="text-primary">₹{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item className="py-3">
                  <Row>
                    <Col>
                      <span className="text-muted">Status:</span>
                    </Col>
                    <Col className="text-end">
                      {product.countInStock > 0 ? (
                        <Badge bg="success" className="py-1 px-2">
                          In Stock
                        </Badge>
                      ) : (
                        <Badge bg="danger" className="py-1 px-2">
                          Out of Stock
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item className="py-3">
                    <Row className="align-items-center">
                      <Col>
                        <span className="text-muted">Quantity:</span>
                      </Col>
                      <Col>
                        <Form.Select
                          size="sm"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item className="py-3">
                  <Button
                    className="w-100 d-flex align-items-center justify-content-center gap-2"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    <FaCartPlus />
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
