import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  title: string
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
        <Button href="/" color="inherit">Home</Button>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          JavaScript DCR Graphs Engine
        </Typography>
        <Button href="/" color="inherit">Creator</Button>
        <Button href="/" color="inherit">Solver</Button>
        </Toolbar>
      </AppBar>
      <header>
        <h2>{title}</h2>
      </header>
    </>
  );
}
