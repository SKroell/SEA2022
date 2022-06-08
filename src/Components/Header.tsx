import { NavLink } from "react-router-dom"
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  title: string
}

const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <Button href="/" color="inherit">Home</Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JavaScript DCR Graphs Engine
        </Typography>
        <NavLink className={({isActive}) => (isActive ? 'active-btn' : 'inactive-btn')} to="/creator"><Button color="inherit">Creator</Button></NavLink>
        <NavLink className={({isActive}) => (isActive ? 'active-btn' : 'inactive-btn')} to="/solver" ><Button color="inherit">Solver</Button></NavLink>
        </Toolbar>
      </AppBar>
      <header>
        <h2>{title}</h2>
      </header>
    </>
  );
}

export default Header
