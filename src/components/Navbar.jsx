import { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
// import ReactTooltip from "react-tooltip";
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
  Home,
  AccountCircle,
  ImageOutlined,
  HomeWorkRounded,
} from "@material-ui/icons";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
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
}));

const Navbar = (props) => {
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

  const handleCartRoute = (event) => {
    event.preventDefault();
    history.push("/cart");
  };

  return (
    <AppBar position="fixed">
      {/* <ReactTooltip id="checkout">
        <span>Go to checkout</span>
      </ReactTooltip> */}
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          BAP GAMING
        </Typography>
        <Typography variant="h6" className={classes.logoSm}>
          BAP GAMING
        </Typography>
        <div className={classes.search}>
          <Search />
          <InputBase
            placeholder="Search here..."
            className={classes.input}
            onChange={(event) => {
              event.preventDefault();
              props.setSearchFilter(event.target.value);
            }}
          />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />
          {props.user && (
            <>
              {props.user.admin && (
                <>
                <Badge
                color="inherit"
                className={classes.badge}
                title="Home"
                to="/"
                component={Link}>
                  <Home/>
                </Badge>
                <Badge
                  badgeContent={0}
                  color="secondary"
                  className={classes.badge}
                  title="Admin Dashboard"
                  to="/admin"
                  component={Link}
                >
                  <AdminPanelSettingsIcon />
                </Badge>
                </>
              )}
              <Badge
                badgeContent={0}
                color="secondary"
                className={classes.badge}
              >
                <Mail />
              </Badge>
              <Badge
                badgeContent={0}
                color="secondary"
                className={classes.badge}
              >
                <Notifications />
              </Badge>
              <Badge
                badgeContent={0}
                color="secondary"
                className={classes.badge}
                // data-tip
                // data-for="checkout"
                title="Go to Checkout"
              >
                <Button onClick={handleCartRoute}>
                <ShoppingCart />
                </Button>
              </Badge>
              <div>
                <Button
                  onClick={handleLogout}
                  title="Click to Logout"
                  to="/"
                  color="inherit"
                >
                  Logout
                </Button>
              </div>
            </>
          )}
          {/* <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          /> */}
          {!props.user && (
            <>
            <Badge
            color="inherit"
            className={classes.badge}
            title="Home"
            to="/"
            component={Link}>
                  <Home/>
                </Badge>
              <Badge className={classes.badge} title="Click to Login">
                <Button onClick={handleRoute} to="/login" color="inherit">
                  Login
                </Button>
              </Badge>
              <Badge
                badgeContent={0}
                color="secondary"
                className={classes.badge}
                title="Go to Checkout"
              >
                <Button onClick={handleCartRoute}>
                <ShoppingCart />
                </Button>
              </Badge>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

//need onClick to route to signin in from account badge
//clickable link to route to cart, messages, and notifications(?)

export default Navbar;

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
