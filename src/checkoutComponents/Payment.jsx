import { Button } from "@material-ui/core";
import {Grid, TextField} from "@material-ui/core"
import { Link } from "react-router-dom";

const Payment = ({
  user,
  handleChange,
  handleSubmit,
  // checkoutData,
  // handleBackStep,
  // handleNextStep,
  // handleCheckout,
}) => {


  return (
    <>
<h1>Payment Details
    <form onSubmit={handleSubmit} autoComplete="off">
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="first-name"
            name="firstName"
            label="First Name"
            onChange={handleChange}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="last-name"
            name="lastName"
            label="Last Name"
            onChange={handleChange}
          />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="card number"
            name="card number"
            type="password"
            label="Card Number"
            onChange={handleChange}
          />
          </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="expiration"
            name="expiration"
            type="expiration"
            label="Expiration Date"
            onChange={handleChange}
          />
          </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="CVV/CVC"
            name="CVV/CVC"
            label="CV Code"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <div className="actions">
        <Button size="medium" to="/cart" component={Link} variant="contained">
          Go Back
        </Button>
        <Button type="submit" size="medium" to="/confirmation" component={Link} color="secondary" variant="contained">
          Submit
        </Button>
      </div>
    </form>
    </h1>
    </>
  );
};

export default Payment;