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
import makeup from "../pics/makeup.jpg";
import deco from "../pics/deco.jpg";
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

  return (
    <div>
      <Helmet>
        <title>MASTER Events</title>
      </Helmet>

      <Carousel className="slider">
        <Carousel.Item>
          <img className="slider" src={deco} alt="First slide" />
          <Carousel.Caption>
            <h3>Photography & Videography</h3>
            <p>
              A camera that puts a world of possibilities at your fingertips.
              Literally
            </p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="slider" src={makeup} alt="Second slide" />
          <Carousel.Caption>
            <h3>Decorations</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img className="slider" src={deco} alt="Third slide" />
          <Carousel.Caption>
            <h3>Bridel Makeup</h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <p></p>
      <p></p>

      <h1>Featured Products</h1>
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
    </div>
  );
}

export default HomeScreen;
