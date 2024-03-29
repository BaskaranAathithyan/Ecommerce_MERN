import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import back from "../pics/back.png";

export default function SignupScreen() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);

  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  //const [image, setImage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  function validateName(name) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  }

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validateMobileNumber(number) {
    const regex = /^[0-9]{10}$/;
    return regex.test(number);
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);
    if (!validateName(name)) {
      toast.error("Name should only contain alphabets and spaces!");
      return;
    } else if (!validateEmail(email)) {
      toast.error("Email address is not valid!");
      return;
    } else if (!validateMobileNumber(mobileNo)) {
      toast.error("Phone number is not valid!");
      return;
    } else if (address === "") {
      toast.error("Address can't be empty!");
      return;
    } else if (!validateName(city)) {
      toast.error("City should only contain alphabets and spaces!");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post(`/api/users/signup`, {
        name,
        email,
        mobileNo,
        city,
        address,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
      toast.success("User created Successfully !");
    } catch (err) {
      toast.error(getError(err));
      //toast.error("Please enter valid details !");
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

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
          <title>Sign Up</title>
        </Helmet>
        <h1 className="my-3">Sign Up</h1>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} required />
            <Form.Control.Feedback type="invalid" className="invalidmessage">
              Please provide a valid Name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" className="invalidmessage">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="mobileno">
            <Form.Label>Mobile No</Form.Label>
            <Form.Control
              type="mobileno"
              required
              onChange={(e) => setMobileNo(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" className="invalidmessage">
              Please provide a valid Mobile No.
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="city"
                  required
                  onChange={(e) => setCity(e.target.value)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="invalidmessage"
                >
                  Please provide a valid city.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="invalidmessage"
                >
                  Please provide a valid Address.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          {/* <Form.Group className="mb-3" controlId="image">
          <Form.Label>Image File</Form.Label>
          <Form.Control
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="imageFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" />
        </Form.Group> */}

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback
                  type="invalid"
                  className="invalidmessage"
                >
                  Please provide a valid password.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="mb-3">
            <Button type="submit" varient="dark">
              Sign Up
            </Button>
          </div>
          <div className="mb-3">
            Already have an account?{" "}
            <Link className="btnsignin" to={`/signin?redirect=${redirect}`}>
              Sign-In
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
