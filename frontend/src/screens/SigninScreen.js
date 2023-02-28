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
import ReactPlayer from "react-player";
import Video from "../pics/video.mp4";
import back from "../pics/back.png";

export default function SigninScreen() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : `/`;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`/api/users/signin`, {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || `/`);
    } catch (err) {
      toast.error(getError(err));
      //alert("Invalid email or password");
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
          <title>Sign In</title>
        </Helmet>

        <h1 className="my-3">Sign In</h1>
        <Form noValidate validated={validated} onSubmit={submitHandler}>
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
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Control.Feedback type="invalid" className="invalidmessage">
              Please provide a valid Password.
            </Form.Control.Feedback>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit" varient="dark">
              Sign In
            </Button>
            <Link to={`/cart?redirect=${redirect}`}></Link>
          </div>
          <div className="mb-3">
            New customer?{" "}
            <Link className="signinbtn" to={`/signup?redirect=${redirect}`}>
              Create your account
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}
