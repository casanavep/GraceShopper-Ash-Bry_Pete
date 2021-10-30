import { useState } from "react";
import { Route } from "react-router";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import SignIn from "./components/SignIn";

function App() {
  const [user, setUser] = useState(null);
  return (
    <div className="App">
      <Navbar setUser={setUser} />
      <Route path="/signin">
        <SignIn setUser={setUser} />
      </Route>
      <Route path="/register">
        <Register setUser={setUser} />
      </Route>
      <Footer />
    </div>
  );
}

export default App;
