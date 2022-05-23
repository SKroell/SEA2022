import React from 'react';
import './../App.css';
import './../Util/dcr.js';
import {parser} from './../Util/dcr_parser.js';
import {dynamicTable} from './../Util/dynamic_table.js';

import { Header } from '../Components/Header';
import { HelpSolver } from '../Components/Help';
import { Footer } from '../Components/Footer';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Alert, List, ListItemButton, ListItemIcon, ListItemText, Pagination, TextField } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HintIcon from '@mui/icons-material/Lightbulb';
import NextIcon from '@mui/icons-material/PlayArrow';
import { Exercise, Symbol } from '../Util/Exercise';

// Main page of the application
class Solver extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      exercises: [new Exercise()],
      parseError: "",
      currentQuestion: 0,
    };
  }

  // Handles changes to the form and updates the state
  handleChange(i: number, e: any) {
    let newExercise = this.state.exercise;
    switch (e.target.id) {
      case "question":
        newExercise.question = e.target.value;
        break;
      case "sym":
        newExercise.symbols[i].symbol = e.target.value;
        break;
      case "act":
        newExercise.symbols[i].activity = e.target.value;
        break;
      case "scn":
        newExercise.scenarios[i].scenario = e.target.value;
        break;
      case "hnt":
        newExercise.scenarios[i].hint = e.target.value;
        break;
    }
    this.setState({ exercise: newExercise });
  }

  parseSolution(e: any) {
    try {
      let graph = parser.parse(e.target.value);
      this.setState({parseError: ""})
    } catch (err: any) {
      this.setState({parseError: (err.message + "</br>" + JSON.stringify(err.location))})
    }

  }

  // Adds a new symbol/activity mapping to the exercise
  // This is a function that can be used to help loading of a new 
  // excercise, but note that the fields should be read-only (other 
  // solutions are of course possible.)
  addSymbolFields() {
    let symbols = this.state.exercise.symbols;
    symbols.push({ symbol: "", activity: "" });
    this.setState({ exercise: { ...this.state.exercise, symbols: symbols } });
  }

  load(e: any){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const exercises = JSON.parse(reader.result as string);
      this.setState({ exercises: exercises });
    }
  }

  hint(){
    throw new Error("not Implemented") // TODO
  }

  next(){
    throw new Error("not Implemented") // TODO
  }

  render() {
    let cq = this.state.currentQuestion
    let exercise = this.state.exercises[cq]
    return (
      <div className="App">
        {/* Re-useable Header */}
        <Header title="Solve a DCR training exercise!" />
        <Pagination variant="outlined" shape="rounded" count={this.state.exercises.length} page={cq+1} onChange={(e, page) => this.setState({currentQuestion: page-1})}/>
        <Grid container>
          <Grid item xs={9}>
            {/* TODO: this should load the dynamicTable */}
            <Paper elevation={3} className="browser">
              <h2>Test which order of activities are possible in your solution!</h2>
              <h2>*** dynamicTable here</h2>
              <table id="task-table"></table>  
              <p id="accepting"></p>
            </Paper>

            <Paper elevation={3} className="browser">
              <h2>Here is the description for the exercise.</h2>
              <TextField fullWidth id="question" label="question" variant="filled" placeholder="Description" value={exercise.question} InputProps={{readOnly: true}} />
              {/* <input type="text" id="question" name="question" size={65} placeholder="Description" /> */}
            </Paper>
            
            <Paper elevation={3} className="browser">
              <h2>And these are the symbols and the activities that they represent!</h2>
              <Grid container spacing={2} component="form"> 
                {exercise.symbols.map((symbol: Symbol, index: number) => (
                  <>
                    <Grid item xs={6}><TextField fullWidth id="sym" label="Symbol" variant="outlined" value={symbol.symbol} InputProps={{readOnly: true}} /></Grid>
                    <Grid item xs={6}><TextField fullWidth id="act" label="Activity" variant="filled" value={symbol.activity} InputProps={{readOnly: true}} /></Grid>
                  </>
                ))}
              </Grid>
            </Paper>
            
            {/* TODO: this should load the DCRGraph */}
            <Paper elevation={3} className="browser">
              <h2>Write your solution here!</h2>
              <TextField fullWidth 
                id="ta-dcr"
                label="Your Solution:"
                multiline
                rows={4}
                defaultValue="*** DCR graph here"
                onChange={e => this.parseSolution(e)}
              />
              {this.state.parseError === "" ? "" : <Alert severity="error">{this.state.parseError}</Alert>}
            </Paper>
          </Grid>

            {/* Unsure if we should reuse navigation to keep here for now. */}
          <Grid item xs={3}>
            <Paper elevation={3} className="browser">
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton component="a" href="#help-solve">
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary="Help" />
              </ListItemButton>
              <ListItemButton component="label">
                <input type="file" hidden onChange={e => this.load(e)}/>
                <ListItemIcon><UploadFileIcon /></ListItemIcon>
                <ListItemText primary="Load from File" />
              </ListItemButton>
              <ListItemButton onClick={() => this.hint()}>
                <ListItemIcon><HintIcon /></ListItemIcon>
                <ListItemText primary="Get hint" />
              </ListItemButton>
              <ListItemButton onClick={() => this.next()}>
                <ListItemIcon><NextIcon /></ListItemIcon>
                <ListItemText primary="Next exercise" />
              </ListItemButton>
            </List>
            </Paper>
            <br></br>
            <br></br>
            <br></br>
            <Paper elevation={3} className="browser">
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              {/* TODO: these should be progress bars (not buttons) */}
              <ListItemButton component="label">
                <ListItemText primary="*** Progress bar for Questions here" />
              </ListItemButton>
              <ListItemButton component="label">
                <ListItemText primary="*** Progress bar for Allowed Scenarios here" />
              </ListItemButton>
              <ListItemButton component="label">
                <ListItemText primary="*** Progress bar for Forbidden Scenarios here" />
              </ListItemButton>
            </List>
            </Paper>
          </Grid>
        </Grid>
        <HelpSolver />
        <Footer />
      </div>
    );
  }
}

export default Solver;
