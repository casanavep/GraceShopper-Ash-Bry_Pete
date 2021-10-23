import { useState } from "react";

import { Link } from "react-router-dom";

const Navbar = () => {
  const [searchValue, setSearchValue] = useState();
  return (
    <>
      <h1>Commerce Site</h1>
      <Link to="profile">Profile</Link>|<Link to="register">Register</Link>|
      <Link to="signin">Sign In</Link>|
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
