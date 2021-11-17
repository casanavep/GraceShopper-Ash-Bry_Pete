import { useState } from "react";
import { useHistory } from "react-router";
import BASE_URL from "../util";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [admin, setAdmin] = useState(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const resp = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        admin,
        fullname,
        address,
        city,
        state,
        zip,
        phone,
        country,
      }),
    });

    const info = await resp.json();

    console.log(info);

    if (info.message !== "you are registered") {
      return setErrorMessage(info.message);
    }

    localStorage.setItem("token", info.token);

    props.setUser({
      id: info.user.id,
      token: info.token,
      email: info.user.email,
    });
    history.push("/");
  };

  return (
    <div className="Register">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={fullname}
          onChange={(e) => {
            setFullname(e.target.value);
          }}
          placeholder="Full Name"
        ></input>
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

        <input
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
          placeholder="Street Address"
        ></input>
        <input
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          placeholder="City"
        ></input>
        <input
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
          placeholder="State"
        ></input>
        <input
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
          }}
          placeholder="Zip"
        ></input>
        <input
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
          placeholder="Phone Number"
        ></input>
        <input
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
          }}
          placeholder="Country"
        ></input>
        <button>Register</button>
      </form>
      <p>{errorMessage}</p>
    </div>
  );
};

export default Register;
