import { AppBar } from "@material-ui/core";
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
<<<<<<< HEAD
      <AppBar />
      <Navbar setUser={setUser} user={user} />
      <div className="container">
        <Route path="/login">
          <SignIn setUser={setUser} />
        </Route>
        <Route path="/register">
          <Register setUser={setUser} />
        </Route>
      </div>
=======
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
>>>>>>> bf152da49eb712adbf58b79587f552f2fa6490be
      <Footer />
    </div>
  );
}

export default App;
