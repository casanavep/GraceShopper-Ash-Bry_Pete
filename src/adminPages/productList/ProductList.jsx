import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../adminComponents/dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../util";
import { useEffect } from "react";

export default function ProductList(props) {
  const [data, setData] = useState(productRows);

  const fetchProducts = async () => {
    const resp = await fetch(`${BASE_URL}/products`, {
      headers: {
        // "Content-Type": "application/json",
      },
    });
    const products = await resp.json();
    setData(products);
    console.log(products);
    return products;
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "title",
      headerName: "Product",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.title}
          </div>
        );
      },
    },
    { field: "quantity", headerName: "Stock", width: 200 },
    {
      field: "category_id",
      headerName: "Category",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        props.setProdId(params.row.id);
        return (
          <>
            <Link to={"/product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
