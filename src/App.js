import { useState } from "react";
// import { Route } from "react-router";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SignIn from "./components/SignIn";
import AdminApp from "./adminComponents/AdminApp";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import NewUser from "./pages/newUser/NewUser";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Navbar setUser={setUser} />
      <Route path="/signin">
        {" "}
        <SignIn setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
      <Route exact path="/admin">
        <AdminApp setUser={setUser} />
      </Route>
      <div className="container"></div>
      <Footer />
    </div>
  );
}

export default App;
