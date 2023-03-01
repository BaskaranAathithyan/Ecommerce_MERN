import React, { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Helmet } from "react-helmet-async";
import Button from "react-bootstrap/Button";
import Axios from "axios";
import { toast } from "react-toastify";

export default function CustomOrderScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  //const [validated, setValidated] = useState(false);

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  const [description, setDescription] = useState("");
  const [image, setImg] = useState("");
  const [price, setPrice] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`/api/customorders`, {
        name,
        category,
        description,
        image,
        price,
      });
      //ctxDispatch({ type: "CUSTOM_ORDER", payload: data });
      //localStorage.setItem("userInfo", JSON.stringify(data));
      //navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Custom Orders</title>
      </Helmet>
      <h3>Customize Orders</h3>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name of the order</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Category</Form.Label>
          {/* <Form.Select aria-label="Default select example">
            <option value="1">DJMusic</option>
            <option value="2">Decorations</option>
            <option value="3">Gifts</option>
            <option value="4">Makeup</option>
            <option value="5">Photography</option>
            <option value="6">Videography</option>
          </Form.Select> */}
          <Form.Control
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </Form.Group>
        &nbsp;
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Sample image of your needs</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setImg(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Expected Price Range</Form.Label>
          <Form.Control
            type="price"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
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
