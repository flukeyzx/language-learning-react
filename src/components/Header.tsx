import { AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5" mr={"auto"}>
          Lingo
        </Typography>
        <Link
          to="/"
          style={{ textDecoration: "none", color: "white", margin: "0.5rem" }}
        >
          Home
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
