import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card
      className="my-3 p-3 rounded shadow-sm h-100 border-0 product-card"
      style={{ transition: 'transform 0.3s ease' }}
    >
      <Link to={`/product/${product._id}`}>
        <div className="overflow-hidden rounded">
          <Card.Img
            src={product.image}
            variant="top"
            className="img-fluid"
            style={{
              height: '220px',
              objectFit: 'cover',
              transition: 'transform 0.4s ease-in-out',
            }}
          />
        </div>
      </Link>

      <Card.Body className="d-flex flex-column text-center px-2">
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-dark"
        >
          <Card.Title
            as="div"
            className="fs-5 fw-semibold mb-2 text-truncate"
            title={product.name}
          >
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as="div" className="mb-2">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>

        <Card.Text
          as="h4"
          className="mt-auto text-success fw-bold mb-0"
        >
          ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
