import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import {
  alpha,
  AppBar,
  Avatar,
  Badge,
  Button,
  InputBase,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  Cancel,
  Mail,
  Notifications,
  Search,
  ShoppingCart,
  AccountCircle,
  ImageOutlined,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    float: "none",
    justifyContent: "space-between",
    alignContent: "center",
    position: "absolute",
    marginTop: "64px",
    backgroundColor: "#232f3e",
    width: "98%",
    height: "20px",
    marginBottom: "10px",
  },
  logoLg: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  logoSm: {
    display: "block",
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  search: {
    display: "flex",
    alignItems: "center",
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      display: (props) => (props.open ? "flex" : "none"),
      width: "70%",
    },
  },
  input: {
    color: "white",
    marginLeft: theme.spacing(1),
  },
  cancel: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  searchButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  icons: {
    alignItems: "center",
    display: (props) => (props.open ? "none" : "flex"),
  },
  badge: {
    marginRight: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "inherit",
    color: "white",
    border: "none",
    outline: "none",
    justifyContent: "space-evenly",
    paddingLeft: "25px",
    paddingRight: "25px",
  },
}));

const Navbar2 = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  let history = useHistory();

  const handleRoute = (event) => {
    event.preventDefault();
    history.push("/login");
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    props.setUser(null);
    history.push("/");
  };

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <div className={classes.buttons}>
          <button className={classes.buttons}>Xbox</button>
          <button className={classes.buttons}>Playstation</button>
          <button className={classes.buttons}>Switch</button>
          <button className={classes.buttons}>Nintendo 64</button>
          <button className={classes.buttons}>Nintendo GameCube</button>
          <button className={classes.buttons}>SEGA DreamCast</button>
          <button className={classes.buttons}>PC</button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

//need onClick to route to signin in from account badge
//clickable link to route to cart, messages, and notifications(?)

export default Navbar2;

/////////////////////////////////////////////////
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router";
// import {
//   alpha,
//   AppBar,
//   Avatar,
//   Badge,
//   Button,
//   IconButton,
//   InputBase,
//   makeStyles,
//   Toolbar,
//   Typography,
// } from "@material-ui/core";
// import { Cancel, Mail, Notifications, Search, ShoppingCart, AccountCircleRounded, Logout, Menu, MenuRounded, AccountCircleSharp } from "@material-ui/icons";

// const useStyles = makeStyles((theme) => ({
//   toolbar: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   logoLg: {
//     display: "none",
//     [theme.breakpoints.up("sm")]: {
//       display: "block",
//     },
//   },
//   logoSm: {
//     display: "block",
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   search: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     "&:hover": {
//       backgroundColor: alpha(theme.palette.common.white, 0.25),
//     },
//     borderRadius: theme.shape.borderRadius,
//     width: "50%",
//     [theme.breakpoints.down("sm")]: {
//       display: (props) => (props.open ? "flex" : "none"),
//       width: "70%",
//     },
//   },
//   input: {
//     color: "white",
//     marginLeft: theme.spacing(1),
//   },
//   cancel: {
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   searchButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   icons: {
//     alignItems: "center",
//     display: (props) => (props.open ? "none" : "flex"),
//   },
//   badge: {
//     marginRight: theme.spacing(2),
//   },
// }));

// const Navbar = (props) => {
//   console.log(props)
//   const [open, setOpen] = useState(false);
//   const classes = useStyles({ open });
//   let history = useHistory()

//   const handleRoute = (event) => {
//     event.preventDefault()
//     history.push("/login")
//   }

//   const handleLogout = (event) => {
//     event.preventDefault()
//     localStorage.removeItem("token")
//     props.setUser(null);
//     history.push("/")
//   }

//   //  const userLoggedIn = ""
//   //  const standardUser = props.user && !props.user.admin
//   //  const adminUser = props.user.admin
//   //  const noUser = !props.user

// // if (!props.user) {
// //  const userLoggedIn = "noUser"
// // } else if (props.user.admin) {
// //  const userLoggedIn = "adminUser"
// // } else {
// //  const userLoggedIn = "standardUser"
// // } if(props.user){
// //   userLoggedIn = true
// //   if(props.user.admin){
// //     userAdmin = true
// //   }
// // }else{
// //   userLoggedIn = false
// // }
// //     };
// // if (!props.user) {
// //  const userLoggedIn = "noUser"
// // } else if (props.user.admin) {
// //  const userLoggedIn = "adminUser"
// // } else {
// //  const userLoggedIn = "standardUser"
// // }

//   return (
//     <AppBar position="fixed">
//       <Toolbar className={classes.toolbar}>
//         <IconButton edge="start" color="inherit" aria-label="menu" sx={{mr:3}}>
//           <Menu/>
//         </IconButton>
//         <Typography variant="h6" className={classes.logoLg}>
//           BAP GAMING
//         </Typography>
//         <Typography variant="h6" className={classes.logoSm}>
//           BAP GAMING
//         </Typography>
//         <div className={classes.search}>
//           <Search />
//           <InputBase placeholder="Search here..." className={classes.input} />
//           <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
//         </div>
//         <div className={classes.icons}>
//           <Search
//             className={classes.searchButton}
//             onClick={() => setOpen(true)}
//           />
//            { adminUser && (
//             <>
//           <Badge badgeContent={0} color="secondary" className={classes.badge}>
//             <Mail />
//           </Badge>
//           <Badge badgeContent={0} color="secondary" className={classes.badge}>
//             <Notifications />
//           </Badge>
//           <Badge className={classes.badge}>
//             <AccountCircleRounded/>
//           </Badge>
//           <div>
//           <Button onClick={handleLogout} to="/" color="inherit">Logout</Button>
//           </div>
//           </>
//           )}
//           { standardUser && (
//             <>
//           <Badge badgeContent={0} color="secondary" className={classes.badge}>
//             <Mail />
//           </Badge>
//           <Badge badgeContent={0} color="secondary" className={classes.badge}>
//             <Notifications />
//           </Badge>
//           <Badge className={classes.badge}>
//             <AccountCircleRounded/>
//           </Badge>
//           <div>
//           <Button onClick={handleLogout} to="/" color="inherit">Logout</Button>
//           </div>
//           </>
//           )}
//           {/* <Avatar
//             alt="Remy Sharp"
//             src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
//           /> */}
//           {noUser &&(
//           <div>
//             <Button onClick={handleRoute} to="/login" color="inherit">Login</Button>
//           </div>
//           )}
//           <Badge badgeContent={0} color="secondary" className={classes.badge}>
//             <ShoppingCart/>
//           </Badge>
//         </div>
//       </Toolbar>
//     </AppBar>
//   );
// };

// //need onClick to route to signin in from account badge
// //clickable link to route to cart, messages, and notifications(?)

// export default Navbar;
