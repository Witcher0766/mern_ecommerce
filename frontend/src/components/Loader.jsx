import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        minHeight: "40vh",
      }}
    >
      <Spinner
        animation="border"
        role="status"
        style={{
          width: "80px",
          height: "80px",
          borderWidth: "6px",
          color: "#0d6efd", // Bootstrap Primary
          boxShadow: "0 0 10px rgba(13, 110, 253, 0.3)",
        }}
      />
      <span className="mt-3 fs-5 text-muted">Loading...</span>
    </div>
  );
};

export default Loader;
