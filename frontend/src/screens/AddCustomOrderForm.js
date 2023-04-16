import React, { useState } from "react";
import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import back from "../pics/back.png";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const CustomOrderForm = () => {
  const navigate = useNavigate();

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newOrder = {
      name,
      email,
      phoneNumber,
      title,
      description,
      price,
    };

    try {
      const response = await Axios.post("/api/customOrders", newOrder);
      //console.log("New custom order saved:", response.data);
      navigate(redirect || "/");
      toast.success("Customize Order created Successfully !");
    } catch (error) {
      toast.error("Error saving custom order:", error);
    }
  };

  return (
    <div
      style={{
        background: `url(${back})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "80vh",
      }}
    >
      <Container className="small-container">
        <Helmet>
          <title>SCustom order</title>
        </Helmet>
        <h3 className="my-3">Customized Order</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="number">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="title">
            <Form.Label>Name of the Package</Form.Label>
            <Form.Control onChange={(e) => setTitle(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Expected Price</Form.Label>
            <Form.Control onChange={(e) => setPrice(e.target.value)} required />
          </Form.Group>

          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    </div>
  );
};

export default CustomOrderForm;
