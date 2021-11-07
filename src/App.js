import { AppBar } from "@material-ui/core";
import { useState } from "react";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar.jsx";
import Register from "./components/Register";
import SignIn from "./components/SignIn.jsx";
import AdminApp from "./adminComponents/AdminApp";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import NewUser from "./pages/newUser/NewUser";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
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
      <Route exact path="/admin">
        <AdminApp setUser={setUser} />
      </Route>
      <div className="container"></div>
      <Footer />
    </div>
  );
}

export default App;
