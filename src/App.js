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
import Basket from "./components/Basket";
import { useHistory } from "react-router";
import CheckoutForm from "./checkoutComponents/CheckoutForm";
// import NewUser from "./pages/newUser/NewUser";

function App() {
  const [user, setUser] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");

  const [cart, setCart] = useState([]);

  let localCart = localStorage.getItem("cart");

  const updateItem = (itemID, amount) => {};
  const removeItem = (itemID) => {};

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

  useEffect(() => {
    localCart = JSON.parse(localCart);
    if (localCart) {
      setCart(localCart);
    }
  }, []);
  const addProduct = (id) => {
    console.log("fetching product");
    const fetchProduct = async () => {
      const resp = await fetch(`${BASE_URL}/products/productid/${id}`);

      const product = await resp.json();
      console.log(product);
      let cartCopy = [...cart];

      let existingProduct = cartCopy.find((product) => product.id == id);

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cartCopy.push(product);
      }
      setCart(cartCopy);

      let stringCart = JSON.stringify(cartCopy);
      localStorage.setItem("cart", stringCart);
    };
    fetchProduct();
  };
  return (
    <div className="App">
      <AppBar />
      <Navbar
        searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}
        setUser={setUser}
        user={user}
      />
      <Navbar2 setSearchFilter={setSearchFilter} />
      <Switch>
        <div className="container">
          <Route exact path="/">
            <MainProducts addProduct={addProduct} searchFilter={searchFilter} />
          </Route>
          <Route path="/login">
            <SignIn setUser={setUser} />
          </Route>
          <Route path="/register">
            <Register setUser={setUser} />
          </Route>
          <Route exact path="/admin">
            <AdminApp setUser={setUser} />
          </Route>
          <Route exact path="/cart">
            <Basket cart={cart} setCart={setCart} />
          </Route>
          <Route exact path="/checkout">
            <CheckoutForm user={user} />
          </Route>
        </div>
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
