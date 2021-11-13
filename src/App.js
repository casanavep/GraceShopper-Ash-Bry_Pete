import { AppBar } from "@material-ui/core";
import { useEffect, useState } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register";
import SignIn from "./components/SignIn.jsx";
import AdminApp from "./adminComponents/AdminApp";
import BASE_URL from "./util";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar2 from "./components/Navbar2";
import MainProducts from "./components/MainProducts";
import Product from "./adminPages/product/Product";
// import NewUser from "./pages/newUser/NewUser";

function App() {
  const [user, setUser] = useState(null);

  console.log(user);

  useEffect(() => {
    console.log("Fetch user starting");
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }
      const resp = await fetch(`${BASE_URL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const info = await resp.json();
      console.log(info);
      setUser(info);
      console.log(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="App">
      <AppBar />
      <Navbar setUser={setUser} user={user} />
      <Navbar2 />
      <div className="container">
        <Route exact path="/">
          <Product />
        </Route>
        <Route path="/login">
          <SignIn setUser={setUser} />
        </Route>
        <Route path="/register">
          <Register setUser={setUser} />
        </Route>
      </div>
      <Route exact path="/admin">
        <AdminApp setUser={setUser} />
      </Route>
      <div className="container">
        <MainProducts />
      </div>
      <Footer />
    </div>
  );
}

export default App;
