import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import './../App.css';

// Load default exercises from Exercises
import exercise0 from './../Exercises/0.json';

let exercises = [
  ["Example exercise", exercise0],
]

const Home = () => {
  return (
    <div className="App">
      <Header title=""/>
      <Stack direction="column" spacing={1} justifyContent="center" alignItems="center">
        <h1>Create a new Exercise</h1>
        <Button component={Link} to="creator" variant="contained" size="large">Creator</Button>
        <h1>Solve an exercise</h1>
        <Button component={Link} to="solver" variant="contained" size="large">Blank Solver</Button>
        {exercises.map((exercise, index) => {
          return (
            <Link key={index} to="/solver" state={{ exerciseToLoad: exercise[1] }} >
              <Paper elevation={3} style={{width: "400px"}}>
                <h4 style={{lineHeight: "40px", margin:"0px"}}>{exercise[0] as String}</h4>
              </Paper>
            </Link>
          )
        }
        )}
      </Stack>
    </div>
  );
}

export default Home;
