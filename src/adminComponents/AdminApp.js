import { useState } from "react";
// import { Route } from "react-router";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Sidebar from "./adminComponents/sidebar/Sidebar";
import SignIn from "./components/SignIn";
import Topbar from "./adminComponents/topbar/Topbar";

import "./App.css";
import Home from "./adminPages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./adminPages/userList/UserList";
import User from "./adminPages/user/User";
// import NewUser from "./pages/newUser/NewUser";
import ProductList from "./adminPages/productList/ProductList";
import Product from "./adminPages/product/Product";
import NewProduct from "./adminPages/newProduct/NewProduct";

function AdminApp() {
  const [user, setUser] = useState(null);
  return (
    // <div className="App">
    //   <Navbar setUser={setUser} />
    //   <Route path="/signin">
    //     <SignIn setUser={setUser} />
    //   </Route>
    //   <Route path="/register">
    //     <Register setUser={setUser} />
    //   </Route>
    //   <Footer />
    // </div>
    <Router>
      <Topbar />
      <div className="container">
        <Sidebar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>
          <Route path="/products">
            <ProductList />
          </Route>
          <Route path="/product/:productId">
            <Product />
          </Route>
          <Route path="/newproduct">
            <NewProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default AdminApp;
