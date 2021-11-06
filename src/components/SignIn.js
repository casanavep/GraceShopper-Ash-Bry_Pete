import { useState } from "react";
import { useHistory } from "react-router";

import BASE_URL from "../util";

const SignIn = (props) => {
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

    if (info.errorMessage) {
      return setErrorMessage(info.errorMessage);
    }

    localStorage.setItem("token", info.token);

    props.setUser({
      id: info.user.id,
      token: info.token,
      email: info.user.email,
    });
  };
  console.log(props.user);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Enter email"
          type="email"
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
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default SignIn;
