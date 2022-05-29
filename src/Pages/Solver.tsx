import React from 'react';
import './../App.css';
import './../Util/dcr.js';
import './../Util/dcr_parser.js';
import './../Util/dynamic_table';
import './../Util/GUI.js';
import {parser} from './../Util/dcr_parser.js';
import { Exercise, Symbol } from '../Util/Entity/Exercise';

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
import LinearProgress from '@mui/material/LinearProgress';
import CircularProgress from '@mui/material/CircularProgress';


// Main page of the application
//I have added fields, such that it is treated somewhat as a "Progress class"
class Solver extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      exercises: [new Exercise()],
      parseError: "",
      currentQuestion: 0,   
      percentExercises: 0,
      percentForbidden: 50,
      percentRequired: 50                  
    };
  }

  //This function gets the progress in percentage
  handleProgress(){
    let exerciseLen = this.state.exercises.length 
    let currentIndex = this.state.currentQuestion + 1
    let percent = currentIndex/exerciseLen * 100
    this.setState({percentExercises: percent})
  }

  handleProgressForbiddenRequired(){
    throw new Error("not Implemented") // TODO
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

  getHint(){
    throw new Error("not Implemented") // TODO
  }

  nextQuestion(){
    let exercises = this.state.exercises
    let oldQuestion = this.state.currentQuestion
    if ( exercises.length > oldQuestion + 1){
      this.setState({currentQuestion: oldQuestion + 1}, () => {this.handleProgress()})
    }
  }

  prevQuestion(){
    let oldQuestion = this.state.currentQuestion
    if(oldQuestion > 0){
      this.setState({currentQuestion: oldQuestion - 1}, () => {this.handleProgress()})
    }
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
              <ListItemButton onClick={() => this.getHint()}>
                <ListItemIcon><HintIcon /></ListItemIcon>
                <ListItemText primary="Get hint" />
              </ListItemButton>
              <ListItemButton onClick={() => this.nextQuestion()}>
                <ListItemIcon><NextIcon /></ListItemIcon>
                <ListItemText primary="Next exercise" />
              </ListItemButton>
              <ListItemButton onClick={() => this.prevQuestion()}>
                <ListItemIcon><NextIcon /></ListItemIcon>
                <ListItemText primary="Previous exercise" />
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
              {/* TODO: the line progressbar should probably be moved to the top of the page */}
              
              <ListItemText primary="Progress for Questions!" />
             
              <LinearProgress variant="determinate" color="primary" value={this.state.percentExercises} />

              <ListItemText primary="Progress for Allowed Scenarios!" />
              
              <CircularProgress variant="determinate" value={this.state.percentRequired} />
              <ListItemText primary="Progress for Forbidden Scenarios!" />
              <CircularProgress variant="determinate" value={this.state.percentForbidden} />
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
