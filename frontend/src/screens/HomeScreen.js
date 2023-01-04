import { useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import logger from "use-reducer-logger";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Product from "../components/Product";
import Carousel from "react-bootstrap/Carousel";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Button from "react-bootstrap/Button";
import bg from "../pics/bg.jpg";
import { useNavigate } from "react-router-dom";
import "../style/slider.css";
//import data from "../data";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const navigate = useNavigate();
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: "",
  });
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await axios.get("/api/products");
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  const customHandler = () => {
    navigate(`/customorders`);
  };

  return (
    <div>
      <Helmet>
        <title>MASTER Events</title>
      </Helmet>
      <Button
        type="button"
        varient="dark"
        className="custom"
        onClick={customHandler}
      >
        Customize Your needs
      </Button>

      <div>
        <img className="backgrounds" src={bg}></img>
      </div>
      {/* <Carousel className="slider">
        <Carousel.Item>
          <img className="slider" src={photoshoot} alt="First slide" />
          <Carousel.Caption>
            <h3>Photography & Videography</h3>
            <p>
              A camera that puts a world of possibilities at your fingertips.
              Literally
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="slider" src={deco} alt="Second slide" />
          <Carousel.Caption>
            <h3>Decorations</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="slider" src={makeup} alt="Third slide" />
          <Carousel.Caption>
            <h3>Bridel Makeup</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="slider" src={wedding} alt="Fourth slide" />
          <Carousel.Caption>
            <h3>Wedding</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
      <p></p>
      <p></p>

      <h3>Our Collections</h3>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox varient="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <div>
        <footer className="bg-dark text-light">
          <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
            <div className="me-5 d-none d-lg-block">
              <span>Get connected with us on social networks:</span>
            </div>

            <div>
              <a href="/" className="me-4 text-reset">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" className="me-4 text-reset">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="/" className="me-4 text-reset">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </section>
          <section>
            <form action="">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-auto">
                  <p className="pt-2">
                    <strong>For more questions.. We are here for you!</strong>
                  </p>
                </div>

                <div className="col-md-5 col-12">
                  <div className="form-outline form-white mb-4">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your Thoughts & Questions"
                    />
                  </div>
                </div>

                <div className="col-auto">
                  <button type="submit" className="btn btn-outline-light mb-4">
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </section>

          <div className="text-center p-4">© 2022 Copyright: Aathi</div>
        </footer>
      </div>
    </div>
  );
}

export default HomeScreen;
