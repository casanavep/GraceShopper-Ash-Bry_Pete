import Sidebar from "./sidebar/Sidebar";
import Topbar from "./topbar/Topbar";
import "./adminApp.css";
import Home from "../adminPages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "../adminPages/userList/UserList";
import User from "../adminPages/user/User";
import ProductList from "../adminPages/productList/ProductList";
import Product from "../adminPages/product/Product";
import NewProduct from "../adminPages/newProduct/NewProduct";
import CategoryList from "../adminPages/categories/CategoryList";
import MainProducts from "../components/MainProducts";

function AdminApp(props) {
  console.log(props);
  return (
    <Router>
      {/* <Topbar /> */}
      <div className="adminApp">
        <Sidebar prodId={props.prodId} setProdId={props.setProdId} />
        <Switch>
          <Route exact path="/">
            <MainProducts />
          </Route>
          <Route path="/users">
            <UserList />
          </Route>
          <Route path="/user/:userId">
            <User />
          </Route>

          <Route path="/products">
            <ProductList prodId={props.prodId} setProdId={props.setProdId} />
          </Route>

          <Route path="/product/:productId">
            <Product prodId={props.prodId} setProdId={props.setProdId} />
          </Route>
          {/* <Route path="/categories/:categoryId">
            <Category />
          </Route> */}
          <Route path="/categories">
            <CategoryList />
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
