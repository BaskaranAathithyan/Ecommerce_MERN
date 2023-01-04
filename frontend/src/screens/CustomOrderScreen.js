import React, { useContext, useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

export default function CustomOrderScreen() {
  return (
    <Container className="small-container">
      <Helmet>
        <title>Custom Orders</title>
      </Helmet>
      <h3>Customize Orders</h3>
      <Form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name of the order</Form.Label>
          <Form.Control type="name" required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          <Form.Select aria-label="Default select example">
            <option value="1">DJMusic</option>
            <option value="2">Decorations</option>
            <option value="3">Gifts</option>
            <option value="4">Makeup</option>
            <option value="5">Photography</option>
            <option value="6">Videography</option>
          </Form.Select>
        </Form.Group>
        &nbsp;
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Sample image of your needs</Form.Label>
          <Form.Control type="file" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Expected Price Range</Form.Label>
          <Form.Control type="price" required />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} />
        </Form.Group>
        <div className="mb-3">
          <Button className="custom" type="submit" varient="dark">
            Place the Enquiry
          </Button>
        </div>
      </Form>
    </Container>
  );
}
