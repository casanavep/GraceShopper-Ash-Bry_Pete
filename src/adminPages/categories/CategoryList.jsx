import "./categoryList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../adminComponents/dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import BASE_URL from "../../util";
import { useEffect } from "react";

export default function CategoryList() {
  console.log("admin categories list launched")
  const [data, setData] = useState(productRows);

  const fetchCategories = async () => {
    const resp = await fetch(
      `${BASE_URL}/categories`,
      {
        headers: {
          // "Content-Type": "application/json",
        },
      }
    );
    const categories = await resp.json();
    setData(categories)
    console.log(categories)
    return categories;
  }
  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "platform",
      headerName: "Platform",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            {/* <img className="productListImg" src={params.row.img} alt="" /> */}
            {params.row.platform}
          </div>
        );
      },
    },
    // { field: "stock", headerName: "Stock", width: 200 },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 120,
    // },
    // {
    //   field: "price",
    //   headerName: "Price",
    //   width: 160,
    // },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
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