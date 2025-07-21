import React from "react";
import {
  Badge,
  Navbar,
  Nav,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { FaShoppingCart, FaUser, FaBoxOpen, FaUsers, FaClipboardList, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
      toast.success("Logout successful");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <header>
      <Navbar
        bg="dark"
        expand="md"
        collapseOnSelect
        className="shadow-sm py-3 border-bottom"
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                alt="OnePiece"
                width={140}
                height={36}
                className="d-inline-block align-top me-2"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <LinkContainer to="/cart">
                <Nav.Link className="d-flex align-items-center me-3 fw-semibold">
                  <FaShoppingCart className="me-2" />
                  Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="danger" className="ms-2">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <NavDropdown
                  title={
                    <span className="d-flex align-items-center">
                      <FaUserCircle className="me-2" size={18} />
                      {userInfo.name}
                    </span>
                  }
                  id="username"
                  className="me-3"
                >
                  <LinkContainer to="/profile">
                    <NavDropdown.Item className="d-flex align-items-center">
                      <FaUser className="me-2" /> Profile
                    </NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={logoutHandler}
                    className="d-flex align-items-center text-danger"
                  >
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="d-flex align-items-center me-3 fw-semibold">
                    <FaUser className="me-2" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown
                  title={<span className="fw-semibold">Admin</span>}
                  id="adminmenu"
                  className="me-3"
                >
                  <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item className="d-flex align-items-center">
                      <FaBoxOpen className="me-2" />
                      Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item className="d-flex align-items-center">
                      <FaUsers className="me-2" />
                      Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item className="d-flex align-items-center">
                      <FaClipboardList className="me-2" />
                      Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
