import axios from "axios";
import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet-async";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { Store } from "../Store";
import { getError } from "../utils";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        customOrders: action.payload,
        loading: false,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default function CustomOrderScreen(props) {
  const navigate = useNavigate();
  const [{ loading, error, customOrders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state } = useContext(Store);
  const { userInfo } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/customorders`, {
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

  function handleApprove() {
    const email = props.order.email;
    const subject = "Order Approved";
    const body = "Your custom order has been approved.";

    //sendEmail(email, subject, body);
  }

  function handleReject() {
    const email = props.order.email;
    const subject = "Order Rejected";
    const body = "Your custom order has been rejected.";

    //sendEmail(email, subject, body);
  }

  return (
    <div className="marginAll">
      <Helmet>
        <title>Custom Orders</title>
      </Helmet>
      <h3>Customized Orders</h3>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="table-responsive">
          <Table hover className="table table-responsive" varient="dark">
            <thead>
              <tr>
                <th style={{ textAlign: "center" }}>Name</th>
                <th style={{ textAlign: "center" }}>Email</th>
                <th style={{ textAlign: "center" }}>Phone number</th>
                <th style={{ textAlign: "center" }}>Title</th>
                <th style={{ textAlign: "center" }}>Description</th>
                <th style={{ textAlign: "center" }}>Expected Price</th>
                <th style={{ textAlign: "center" }}>Order placed on</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {customOrders.map((customOrder) => (
                <tr key={customOrder._id}>
                  <td style={{ textAlign: "center" }}>{customOrder.name}</td>
                  <td>{customOrder.email}</td>
                  <td style={{ textAlign: "center" }}>
                    {customOrder.phoneNumber}
                  </td>
                  <td>{customOrder.title}</td>
                  <td>{customOrder.description}</td>
                  <td style={{ textAlign: "center" }}>{customOrder.price}</td>
                  <td style={{ textAlign: "center" }}>
                    {customOrder.createdAt.substring(0, 10)}
                  </td>

                  <td style={{ textAlign: "center" }}>
                    <Button
                      type="button"
                      variant="outline-success"
                      onClick={handleApprove}
                    >
                      Approve
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="outline-danger"
                      onClick={handleReject}
                    >
                      Reject
                    </Button>
                    &nbsp;
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
