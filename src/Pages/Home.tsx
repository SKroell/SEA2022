import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Header from '../Components/Header';
import './../App.css';

const Home = () => {
  return (
    <div className="App">
      <Header title="JavaScript DCR Graphs Engine"/>
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <Button href="creator" variant="contained" size="large">Creator</Button>
        <Button href="solver" variant="contained" size="large">Solver</Button>
      </Stack>
    </div>
  );
}

export default Home;
