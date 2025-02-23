import { Link, useNavigate } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Badge,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <Row className="g-4">
      <Col md={8}>
        <h1 className="mb-4">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush" className="shadow-sm">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id} className="py-3">
                <Row className="align-items-center">
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                      className="shadow-sm"
                    />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-decoration-none text-dark"
                    >
                      <h6 className="mb-0">{item.name}</h6>
                    </Link>
                  </Col>
                  <Col md={2}>
                    <p className="mb-0 text-muted">₹{item.price}</p>
                  </Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                      className="form-select-sm"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card className="shadow-sm">
          <ListGroup variant="flush">
            <ListGroup.Item className="py-3">
              <h4 className="mb-3">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
                items
              </h4>
              <h5 className="text-primary">
                ₹{cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h5>
            </ListGroup.Item>
            <ListGroup.Item className="py-3">
              <Button
                type="button"
                className="w-100 btn-primary"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;