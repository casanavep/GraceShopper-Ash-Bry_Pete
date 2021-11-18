import { Button, Typography } from "@material-ui/core";
import { BrandingWatermark } from "@material-ui/icons";
import { Link } from "react-router-dom";
import Banner from "../Images/Banner.png";
const Confirmation = () => {
  // if (error) {
  //   return (
  //     <div className="confirmation">
  //       <Typography variant="h5">{error}</Typography>
  //       <Button component={Link} variant="outlined" type="button" to="/">
  //         Back to home
  //       </Button>
  //     </div>
  //   );
  // }
  return (
    <div className="confirmation">
      <Typography variant="h5">
        You're all set! Thank you for your purchase!
      </Typography>
      <div className="logo">
        <img src={Banner} alt="See You Banner" />
      </div>
      <div className="shopping-button">
        <Button component={Link} variant="contained" type="button" to="/">
          Continue shopping
        </Button>
      </div>
    </div>
  );
};

export default Confirmation;
