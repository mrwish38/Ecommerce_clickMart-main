import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, myOrders } from "../../actions/orderAction";
import Loader from "../../components/Layout/Loader/loader";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../../components/metaData";
import { ToastContainer, toast } from 'react-toastify';
import { toastErrorOptions } from "../../components/toastStyles";
import 'react-toastify/dist/ReactToastify.css';
import LaunchIcon from '@mui/icons-material/Launch';

const MyOrders = () => {
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error, toastErrorOptions);
      dispatch(clearError());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.value === "Delivered" ? "greenColor" : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "details",
      flex: 0.3,
      headerName: "Details",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.row.id}`}>
            <LaunchIcon  className="launch-icon"/>
          </Link>
        );
      },
    },
  ];

  const rows = orders
    ? orders.map((item) => ({
      id: item._id,
      status: item.orderStatus,
      itemsQty: item.orderItems.length,
      amount: item.totalPrice,
    }))
    : [];

  return (
    <Fragment>
      <MetaData title={`${user.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrders-page">
          <Typography className="myOrders-heading">{user.name}'s Orders</Typography>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrders-table"
            autoHeight
          />
        </div>
      )}
      <ToastContainer />
    </Fragment>
  );
};

export default MyOrders;
