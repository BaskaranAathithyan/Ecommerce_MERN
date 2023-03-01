import React, { useReducer, useEffect, useContext, useState } from "react";
import axios from "axios";
import { Store } from "../Store";
import { getError } from "../utils";
import LoadingBox from "../components/LoadingBox";
import Button from "react-bootstrap/Button";
import MessageBox from "../components/MessageBox";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Chart from "react-google-charts";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        summary: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function DashboardScreen() {
  const [{ loading, summary, error }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("/api/orders/summary", {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(err),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  const handlePrint = () => {
    window.print();
  };

  const [showDiv, setShowDiv] = useState(false);

  const handleYearSale = () => {
    setShowDiv(!showDiv);
  };

  return (
    <div className="marginAll">
      <h2 className="dashboardCard">Welcome {userInfo.name} !</h2>

      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Row className="dashboardCard">
            <Col md={3}>
              <Card className="cardDesign">
                <Card.Body>
                  <Card.Text> Users</Card.Text>
                  <Card.Title>
                    {summary.users && summary.users[0]
                      ? summary.users[0].numUsers
                      : 0}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="cardDesign">
                <Card.Body>
                  <Card.Text> Orders</Card.Text>
                  <Card.Title>
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].numOrders
                      : 0}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="cardDesign">
                <Card.Body>
                  <Card.Text> Categories</Card.Text>
                  <Card.Title>{summary.productCategories.length}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card className="cardDesign">
                <Card.Body>
                  <Card.Text> Orders Amount</Card.Text>
                  <Card.Title>
                    Rs .
                    {summary.orders && summary.users[0]
                      ? summary.orders[0].totalSales.toFixed(2)
                      : 0}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={8} className="chartdesign">
              <div className="my-3">
                <Row>
                  <Col md={8}>
                    <h3>Daily Sales</h3>
                  </Col>
                  <Col md={4}>
                    <Button
                      className="btnPrint"
                      type="button"
                      varient="light"
                      onClick={handlePrint}
                    >
                      Sales report
                    </Button>
                  </Col>
                </Row>

                {summary.dailyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Chart
                    width="90%"
                    height="400px"
                    chartType="Bar"
                    loader={<div>Loading Chart...</div>}
                    data={[
                      ["Date", "Sales"],
                      ...summary.dailyOrders.map((x) => [x._id, x.sales]),
                    ]}
                  ></Chart>
                )}
              </div>
            </Col>
            <Col md={4} className="chartdesign">
              <div className="my-3 dashboardCard">
                <h2>Categories</h2>
                {summary.productCategories.length === 0 ? (
                  <MessageBox>No Category</MessageBox>
                ) : (
                  <Chart
                    width="90%"
                    height="400px"
                    chartType="PieChart"
                    loader={<div>Loading Chart...</div>}
                    data={[
                      ["Category", "Products"],
                      ...summary.productCategories.map((x) => [x._id, x.count]),
                    ]}
                  ></Chart>
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="chartdesign">
              <div className="my-3">
                <Row>
                  <Col md={8}>
                    <h3>Monthly Sales</h3>
                  </Col>
                  <Col md={4}></Col>
                </Row>

                {summary.monthlyOrders.length === 0 ? (
                  <MessageBox>No Sale</MessageBox>
                ) : (
                  <Chart
                    width="90%"
                    height="300px"
                    chartType="AreaChart"
                    loader={<div>Loading Chart...</div>}
                    data={[
                      ["Date", "Sales"],
                      ...summary.monthlyOrders.map((x) => [x._id, x.sales]),
                    ]}
                  ></Chart>
                )}
                <Button className="btnSale" onClick={handleYearSale}>
                  Yearly Sales
                </Button>
              </div>
            </Col>
            <Col md={6} className="chartdesign"></Col>

            {showDiv && (
              <div>
                <Col md={6} className="chartdesign">
                  <div className="my-3">
                    <Row>
                      <Col md={8}>
                        <h3>Yearly Sales</h3>
                      </Col>
                      <Col md={4}></Col>
                    </Row>

                    {summary.yearlyOrders.length === 0 ? (
                      <MessageBox>No Sale</MessageBox>
                    ) : (
                      <Chart
                        width="90%"
                        height="300px"
                        chartType="Line"
                        loader={<div>Loading Chart...</div>}
                        data={[
                          ["Date", "Sales"],
                          ...summary.yearlyOrders.map((x) => [x._id, x.sales]),
                        ]}
                      ></Chart>
                    )}
                  </div>
                </Col>
              </div>
            )}
          </Row>
        </>
      )}
    </div>
  );
}
