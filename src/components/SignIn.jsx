import { alpha, Grid } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import "./SignIn.css";
import BASE_URL from "../util";

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
    <form onSubmit={handleSubmit}>
      <h2>Login In</h2>
      <input
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        placeholder="Enter email"
      ></input>
      <input
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        type="password"
        minLength={8}
        placeholder="Enter password"
      ></input>
      <button>Sign In</button>
      <p>{errorMessage}</p>
      <div><button onClick={handleRoute} to="/register">Create Account</button></div>
    </form>
    
    </>
  )
    
};

export default SignIn;
