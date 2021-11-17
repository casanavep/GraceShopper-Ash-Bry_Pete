import { Grid, Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CustomCard from "../CustomCard";
import Product from "../Product";
import BASE_URL from "../../util";

import "./style.css";
import { DataGrid } from "@material-ui/data-grid";

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
  // const fetchProductsById = async () => {
  //   const resp = await fetch(`${BASE_URL}/productid/:id`, {
  //     headers: {
  //       // "Content-Type": "application/json",
  //     },
  //   });
  //   const products = await resp.json();
  //   setData(products);
  //   // console.log(products);
  //   return products;
  // };
  // useEffect(() => {
  //   fetchProductsById();
  // }, []);
  useEffect(() => {
    setData(localStorage.getItem("cart"));
  }, []);
  console.log(data);
  // const columns = [
  //   { field: "title", headerName: "Item", width: 90 },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     width: 200,
  //   },
  // {
  //   field: "action",
  //   headerName: "Action",
  //   width: 150,
  //   renderCell: (params) => {
  //     return (
  //       <>
  //         <Link to={"/user/" + params.row.id}>
  //           <button className="userListEdit">Edit</button>
  //         </Link>
  //         <DeleteOutline
  //           className="userListDelete"
  //           onClick={() => handleDelete(params.row.id)}
  //         />
  //       </>
  //     );
  //   },
  // },
  // ];
  // console.log(columns);
  data.map((item) => <h1>{item.title}</h1>);
};

// .map((product) => (
//   <Grid key={product.id} item xs={12} sm={6} md={4}>
//     <Product product={product} addProduct={props.addProduct} />
//   </Grid>
// ))}

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
// return (
//   <div>
//     <Container id="basket">
//       <Grid container justify="center" spacing={4}>
//         <div className="actions">
//           <Button
//             size="small"
//             color="secondary"
//             variant="contained"
//             // onClick={handleEmptyBasket}
//           >
//             Empty Basket
//           </Button>

//           <Button
//             size="small"
//             variant="contained"
//             component={Link}
//             to="/checkout"
//           >
//             Checkout
//           </Button>
//         </div>
//       </Grid>
//     </Container>
//   </div>
// );
// };

export default Basket;
