import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <Card className='my-3 p-3 rounded shadow-sm h-100'>
      <Link to={`/product/${product._id}`}>
        <Card.Img 
          src={product.image} 
          variant='top' 
          className='img-fluid rounded' 
          style={{ height: '200px', objectFit: 'cover' }} // Inline style for image sizing
        />
      </Link>
      <Card.Body className='d-flex flex-column text-center'>
        <Link to={`/product/${product._id}`} className='text-decoration-none text-dark'>
          <Card.Title as="div" className='fs-5 fw-bold mb-3'>
            {product.name}
          </Card.Title>
        </Link>

        <Card.Text as='div' className='mb-2'>
          <Rating 
            value={product.rating} 
            text={`${product.numReviews} reviews`} 
          />
        </Card.Text>

        <Card.Text as="h3" className='mt-auto text-success fw-bold'>
          ₹{product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;