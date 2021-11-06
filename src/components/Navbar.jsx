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
import { Cancel, Mail, Notifications, Search, ShoppingCart, AccountCircle, ImageOutlined } from "@material-ui/icons";

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
  let history = useHistory()

  const handleRoute = (event) => {
    event.preventDefault()
    history.push("/login")
  }

  return (
    <AppBar position="fixed">
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" className={classes.logoLg}>
          BAP GAMING
        </Typography>
        <Typography variant="h6" className={classes.logoSm}>
          BAP GAMING
        </Typography>
        <div className={classes.search}>
          <Search />
          <InputBase placeholder="Search here..." className={classes.input} />
          <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
        </div>
        <div className={classes.icons}>
          <Search
            className={classes.searchButton}
            onClick={() => setOpen(true)}
          />
          {!props.user && (
            <>
          <Badge badgeContent={0} color="secondary" className={classes.badge}>
            <Mail />
          </Badge>
          <Badge badgeContent={0} color="secondary" className={classes.badge}>
            <Notifications />
          </Badge>
          </>
          )}
          {/* <Avatar
            alt="Remy Sharp"
            src="https://images.pexels.com/photos/8647814/pexels-photo-8647814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
          /> */}
          <Badge className={classes.badge}>
            <Button onClick={handleRoute} to="/login">
            <AccountCircle/>
            </Button>
          </Badge>
          <Badge badgeContent={0} color="secondary" className={classes.badge}>
            <ShoppingCart/>
          </Badge>
        </div>
      </Toolbar>
    </AppBar>
  );
};

//need onClick to route to signin in from account badge
//clickable link to route to cart, messages, and notifications(?)


export default Navbar;
