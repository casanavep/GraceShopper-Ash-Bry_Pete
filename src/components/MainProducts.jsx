import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../util";
import { useEffect } from "react";
import { Grid, Container } from "@material-ui/core";
import Product from "../components/Product";
import ReactPaginate from "react-paginate";

export default function MainProducts(props) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(25)

  const fetchProducts = async () => {
    const resp = await fetch(`${BASE_URL}/products`, {
      // setLoading(true)
      headers: {
        // "Content-Type": "application/json",
      },
    });
    const products = await resp.json();
    setData(products);
    // setLoading(false)
    // console.log(products);
    return products;
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePage = async (data) => {
    console.log(data)
    
  }
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
                <Product product={product} addProduct={props.addProduct} />
              </Grid>
            ))}
        </Grid>
        <div>
            <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={12}
            marginPagesDisplayed={3}
            pageRangeDisplayed={6}
            onPageChange={handlePage}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
            />
          </div>
        
      </Container>
    </div>
  );
}
