import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function OrderHistoryScreen() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(
          `/api/orders/mine`,

          { headers: { Authorization: `Bearer ${userInfo.token}` } }
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({
          type: "FETCH_FAIL",
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <div className="marginAll">
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h3>My Orders</h3>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Table hover className="table">
          <thead>
            <tr>
              <th>Ordered Packages</th>
              <th>Date ( Order placed )</th>
              <th>Total</th>
              <th>Paid on</th>
              <th>Deliverd on</th>
              <th>Event Date</th>
              <th>Event Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <ul>
                    {order.orderItems.map((item) => (
                      <li key={item._id}>{item.name}</li>
                    ))}
                  </ul>
                </td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td className={order.isPaid ? "" : "not-paid"}>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <Badge pill bg="danger">
                      Not paid
                    </Badge>
                  )}
                </td>
                <td className={order.isDelivered ? "" : "not-deliverd"}>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <Badge pill bg="info">
                      Not deliverd
                    </Badge>
                  )}
                </td>
                <td>{order.shippingAddress.date}</td>
                <td>{order.shippingAddress.time}</td>

                <td>
                  <Button
                    type="button"
                    variant="outline-success"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
