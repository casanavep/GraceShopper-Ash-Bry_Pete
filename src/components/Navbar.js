import { useState } from "react";

import { Link } from "react-router-dom";

const Navbar = (props) => {
  const handleSignOut = () => {
    localStorage.removeItem("token");

    props.setUser(null);
  };
  const [searchValue, setSearchValue] = useState();
  return (
    <>
      <h1>BAP Gaming</h1>
      <Link to="profile">Profile</Link>|<Link to="register">Register</Link>|
      <Link to="signin">Sign In</Link>|{" "}
      <Link onClick={handleSignOut} to="/">
        Sign Out
      </Link>
      <form>
        <input
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Search Products"
          type="text"
        ></input>
        <button>Search</button>
      </form>
      {console.log(searchValue)}|<Link to="cart">Cart</Link>
    </>
  );
};

export default Navbar;
