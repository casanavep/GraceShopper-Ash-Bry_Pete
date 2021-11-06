import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../adminComponents/dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import BASE_URL from "../../util";

export default function UserList() {
  const [data, setData] = useState([]);
  const fetchUsers = async () => {
    const resp = await fetch(
      `${BASE_URL}/users`,
      {
        headers: {
          // "Content-Type": "application/json",
        },
      }
    );
    const users = await resp.json();
    setData(users)
    return users;
  }
  useEffect(() => {
     fetchUsers()
  }, [])


  console.log(data)
  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };
  
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullname",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            {/* <img className="userListImg" src={params.row.avatar} alt="" /> */}
            {params.row.fullname}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "admin",
      headerName: "Admin",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Transaction Volume",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="userList">
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