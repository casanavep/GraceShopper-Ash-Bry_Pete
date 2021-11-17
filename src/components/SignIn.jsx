import { alpha, Grid } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./SignIn.css";
import BASE_URL from "../util";
import BAPgaming from "../Images/BAPgaming.png"

const SignIn = (props) => {
  console.log("Launched SignIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const resp = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const info = await resp.json();
    console.log(info)
    if (info.message === "username or password is incorrect") {
      return setErrorMessage(info.message);
    }

    localStorage.setItem("token", info.token);

    props.setUser({
      id: info.user.id,
      token: info.token,
      email: info.user.email,
      admin: info.user.admin,
    });
    history.push("/")
  }

  const handleRoute = (event) => {
    event.preventDefault()
    history.push("/register")
  }


  return (
    <>
    <div className="logo">
      <img src={BAPgaming} alt="BAP Gaming Logo"/>
    </div>
    <form onSubmit={handleSubmit}>
      <div className="Login">
      <h2>Login In</h2>
      <div className="Inputs">
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter email"
      ></input>
      </div>
      <div className="Password">
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        minLength={8}
        placeholder="Enter password"
      ></input>
      </div>
      <div className="Buttons">
      <p>{errorMessage}</p>
      <button>Sign In</button>
      <button onClick={handleRoute} to="/register">Create Account</button>
      </div>
      </div>
    </form>
    
    </>
  )
    
};

export default SignIn;
