import React from "react";
import "./topbar.css"

export default function Topbar() {
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">BAP Gaming</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              {/* <NotificationsNone /> */}
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              {/* <Language /> */}
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              {/* <Settings /> */}
            </div>
            <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          </div>
        </div>
      </div>
    );
  }
//   <>
//       <h1>BAP Gaming</h1>
//       <Link to="profile">Profile</Link>|<Link to="register">Register</Link>|
//       <Link to="signin">Sign In</Link>|{" "}
//       <Link onClick={handleSignOut} to="/">
//         Sign Out
//       </Link>
//       <form>
//         <input
//           value={searchValue}
//           onChange={(e) => {
//             setSearchValue(e.target.value);
//           }}
//           placeholder="Search Products"
//           type="text"
//         ></input>
//         <button>Search</button>
//       </form>
//       {console.log(searchValue)}|<Link to="cart">Cart</Link>
//     </>