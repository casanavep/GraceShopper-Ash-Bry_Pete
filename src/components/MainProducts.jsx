import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../util";
import { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import Product from "../components/Product";
import { Pagination } from "@mui/material";

export default function MainProducts(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = React.useState(0);


  const fetchProducts = async () => {
    const resp = await fetch(`${BASE_URL}/products`, {
      headers: {
        // "Content-Type": "application/json",
      },
    });
    const products = await resp.json();
    setData(products);
    // console.log(products);
    return products;
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  // console.log(data);
  return (
    <div>
      <Container id="products">
        <Grid container spacing={4}>
          {data
            .filter((product) => {
              if (props.searchFilter == "") {
                return product;
              } else if (
                product.title
                  .toLowerCase()
                  .includes(props.searchFilter.toLowerCase())
              ) {
                return product;
              } else if (
                product.platform
                  .toLowerCase()
                  .includes(props.searchFilter.toLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <Grid key={product.id} item xs={12} sm={6} md={4}>
                <Product product={product} />
              </Grid>
            ))}
            </Grid>
      </Container>
    </div>
  );
}