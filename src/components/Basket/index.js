import { Grid, Button, Container } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import {
  AddCircleOutline,
  DeleteOutline,
  RemoveCircleOutline,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import Product from "../Product";
import BASE_URL from "../../util";

import "./style.css";
let total = 0;

const Basket = ({
  basket,
  setBasket,
  // basketData,
  // product,
  // updateProduct,
  // handleEmptyBasket,
  // RemoveItemFromBasket,
}) => {
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  console.log(data);

  // return (

  // );

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "title",
      headerName: "TITLE",
      width: 300,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.title}</div>;
      },
    },
    {
      field: "platform",
      headerName: "Console",
      width: 350,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.platform}</div>;
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      renderCell: (params) => {
        return <div className="userListUser">{params.row.price}</div>;
      },
    },
    {
      field: "action",
      headerName: "Quantity",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <RemoveCircleOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
            1
            <AddCircleOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];
  console.log(columns);
  return (
    <div className="userList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={5}
        checkboxSelection
      />
      {/* <div> */}{" "}
      {data.map((item) => {
        ////////////---------------------------/////////////////////
        ///     Broken math
        total = total + item.price;
        console.log(item.price);
        console.log(total);
        return (
          <Container id="basket">
            <Grid container justify="center" spacing={4}></Grid>
          </Container>
        );
      })}
      <div className="actions">
        <Button
          size="small"
          color="secondary"
          variant="contained"
          // onClick={handleEmptyBasket}
        >
          Empty Basket
        </Button>
        <Button
          size="small"
          variant="contained"
          component={Link}
          to="/checkout"
        >
          Checkout
        </Button>
      </div>
    </div>
    // </div>
  );
};
export default Basket;
