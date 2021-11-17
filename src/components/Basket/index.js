import { Grid, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import Product from "../Product";
import BASE_URL from "../../util";

import "./style.css";

const Basket = ({
  basket,
  setBasket,
  // basketData,
  // product,
  // updateProduct,
  // handleEmptyBasket,
  // RemoveItemFromBasket,
}) => {
  const [data, setData] = useState([]);

  const fetchProductsById = async () => {
    const resp = await fetch(`${BASE_URL}/productid/:id`, {
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
    fetchProductsById();
  }, []);
  //   const [showSpinner, setShowSpinner] = useState(true);
  //   const loading = () => {
  //     setTimeout(() => {
  //       setShowSpinner(false);
  //     }, 2000);
  //     if (showSpinner) {
  //       return <Spinner />;
  //     }
  //     return <Banner />;
  //   };

  //   if (!basketData.line_items || !basketData.line_items.length) return loading();

  // {basketData.line_items.map((item) => {
  return (
    <div>
      <Container id="basket">
        <Grid container justify="center" spacing={4}>
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
        </Grid>
      </Container>
    </div>
  );
};

export default Basket;
