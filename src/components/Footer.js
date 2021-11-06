import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Footer = () => {
  const history = useHistory();
  return (
    <>
      <p>Footer</p>
      {/* <Link to="tracking">Track Your Order</Link>|
      <Link to="contactus">Contact Us</Link> */}
    </>
  );
};

export default Footer;
