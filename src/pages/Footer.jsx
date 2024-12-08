import { Grid, Link, Typography } from "@mui/material";

const Footer = () => {
  return (
<Grid
  className="bg-black text-white mt-10 text-center"
  container
  color={"white"}
  sx={{
    position: "fixed", // Use fixed positioning
    bottom: 0,
    left: 0,
    width: "100%",
    bgcolor: "black",
    color: "white",
    py: 3,
    zIndex: 1000, // Adjust z-index to ensure the footer appears above other content
  }}
>
  <Grid item xs={12}>
    <Typography variant="body2" component="p" align="center">
      &copy; 2023 My Company. All rights reserved.
    </Typography>
  </Grid>
</Grid>



  );
};

export default Footer;