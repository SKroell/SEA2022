// Main Import
import React from 'react';
import './../App.css';

//Import dynamic modal
import { ModalManager} from 'react-dynamic-modal';

// We use MUI for our styling see https://mui.com/
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Button, Grid, 
  LinearProgress, List, ListItemButton, ListItemIcon, ListItemText, Pagination, 
  Paper, Slide, TextField
} from '@mui/material';

// Import MUI Icons
import HelpIcon from '@mui/icons-material/Help';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import HintIcon from '@mui/icons-material/Lightbulb';
import NextIcon from '@mui/icons-material/PlayArrow';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Import our custom components & utilities
import './../Util/dcr.js';
import './../Util/dcr_parser.js';
import parser from './../Util/dcr_parser.js';
import Footer from '../Components/Footer';
import Header from '../Components/Header';
import DynamicTable from '../Util/DynamicTable';
import CircularProgressWithLabel from '../Util/CircularProgressWithLabel';
import { HelpSolver } from '../Components/Help';
import { Exercise, Symbol, Scenario } from '../Util/Entity/Exercise';
import SuccessDialog from '../Components/SuccessDialog';
import DynamicModal from '../Util/DynamicModal';


// Main page of the application
// I have added fields, such that it is treated somewhat as a "Progress class"
class Solver extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      exercises: [new Exercise()],
      parseError: "",
      currentQuestion: 0,   
      percentExercises: 0,
      percentForbidden: 0,
      percentRequired: 0,  
      solution: "",
      graph: parser.parse(""),    
      showSuccessDialog: false,            
    };
  }

  // This function gets the progress in percentage
  handleProgress(){
    let exerciseLen = this.state.exercises.length 
    let currentIndex = this.state.currentQuestion + 1
    let percent = currentIndex/exerciseLen * 100
    this.setState({
      percentExercises: percent,
      currentQuestion: 0,
      graph: parser.parse("")
    });
  }

  // Called when the user presses an action button in the playground windows
  executePlayground(row: string){
    var graph = this.state.graph;
    graph.execute(row);
    this.setState({graph: graph});
  }

  // Continously parse the solution and check for errors
  parseSolution(e: any) {
    try {
      let graph = parser.parse(e.target.value);
      // Check if we pass the given scenarios and update progress
      this.checkScenarios();
      // If the graph is valid, clear any error messages
      this.setState({parseError: "", graph: graph, solution: e.target.value});
    } catch (err: any) {
      // parse will throw an exception on error so we catch it here
      this.setState({parseError: (err.message + "</br>" + JSON.stringify(err.location)), solution: e.target.value});
    }
  }

  // Check if the graph passes the given scenarios
  checkScenarios() {
    let graph = this.state.graph;
    let currentExercise = this.state.exercises[this.state.currentQuestion];
    let status = graph.status();
    
    // Keep track of how many passes
    let allowedCount = 0;
    let forbiddenCount = 0;

    // Check if all symbols are defined, if not, we should fail all scenarios
    // This is not nicely done at all, but it works
    let allDefined = true;
    for (let i = 0; i < currentExercise.symbols.length; i++) {
      let symbol = currentExercise.symbols[i];
      let defined = false;
      for (let j = 0; j < graph.status().length; j++) {
        let row = status[j];
        if (row["name"] === symbol.symbol) {
          defined = true;
          break;
        }
      }
      if (!defined) {
        allDefined = false;
        break;
      }
    }

    // If all symbols are not defined we dont need to continue  
    if(!allDefined){
      console.log("Not all symbols are defined");
      this.setState({percentForbidden: 0, percentRequired: 0});
      return;
    }

    // Again this is not nicely done at all, but it works. I think
    for (let i = 0; i < currentExercise.scenarios.length; i++) {
      let scenario = currentExercise.scenarios[i];
      let allowed = scenario.allowed;
      let steps = scenario.scenario.split(",");

      // Execute all steps and see if the graph is accepting
      graph = parser.parse(this.state.solution); // Reset graph
      for (let j = 0; j < steps.length; j++) {
        let step = steps[j];
        graph.execute(step);
      }
      console.log(graph.status());
      if(graph.isAccepting() && allowed){
        allowedCount++;
      } else if(!graph.isAccepting() && !allowed){
        forbiddenCount++;
      } else {
        console.log("Error in solution: " + scenario.scenario + " Expected: " + allowed + " Got: " + graph.isAccepting());
      }
    }
    // Calculate percentages
    let percentForbidden = forbiddenCount / currentExercise.scenarios.filter((x:Scenario) => x.allowed === false).length * 100;
    let percentRequired = allowedCount / currentExercise.scenarios.filter((x:Scenario) => x.allowed === true).length * 100;

    // Lets check if we are done
    let allCompleted = false;
    if(percentForbidden === 100 && percentRequired === 100){
      allCompleted = true;
    }
    this.setState({percentForbidden: percentForbidden, percentRequired: percentRequired, showSuccessDialog: allCompleted});
  }

  // Load an exercise set from a file
  // TODO: Loading an incorrect file will crash the application
  load(e: any){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const exercises = JSON.parse(reader.result as string);
      this.setState({ exercises: exercises });
    }
  }
  //This displays all of the hints for a question 
  //TODO: Need to implement that each hint is placed in a newline. Also we might not want to display all of the hints at once.
  getHint(){
    let exercises = this.state.exercises
    let index = this.state.currentQuestion
    const hints: string[] = []
    exercises[index].scenarios.forEach((scenario:any) => {
      if(scenario.hint !== ""){
        hints.push(scenario.hint)
        hints.push("\n")
      }
    });

    if(hints.length === 0){
      hints.push("No hints for this exercise, good luck!")
    }

    ModalManager.open(<DynamicModal text={hints} onRequestClose={() => true}/>);
  }

  nextQuestion(){
    let exercises = this.state.exercises
    let oldQuestion = this.state.currentQuestion
    if ( exercises.length > oldQuestion + 1){
      this.setState({currentQuestion: oldQuestion + 1, showSuccessDialog: false}, () => {this.handleProgress()})
    }
  }

  prevQuestion(){
    let oldQuestion = this.state.currentQuestion
    if(oldQuestion > 0){
      this.setState({currentQuestion: oldQuestion - 1}, () => {this.handleProgress()})
    }
  }

  resetGraph() {
    let graph = parser.parse(this.state.solution)
    this.setState({graph: graph})
  }

  render() {
    // Shorthand the most common variables
    let cq = this.state.currentQuestion
    let exercise = this.state.exercises[cq]
    return (
      <div className="App">
        <Header title="Solve a DCR training exercise!" />
        <Pagination variant="outlined" shape="rounded" count={this.state.exercises.length} page={cq+1} onChange={(e, page) => this.setState({currentQuestion: page-1})}/>
        <Grid container>
          <Grid item xs={9}>

            {/* Playground Begin */}
            <Paper elevation={3} className="browser">
            <Accordion> 
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                Playground: Test which order of activities are possible in your solution
              </AccordionSummary>
              <AccordionDetails>
                  {/* Button for resetting graph */}
                  <Button variant="contained" color="primary" onClick={() => this.resetGraph()}>Reset Graph</Button>
                  <DynamicTable 
                    tableId='task-table' 
                    fields={['executed', 'included', 'pending', 'enabled', 'name']}
                    headers={['Executed', 'Included', 'Pending', 'Enabled', 'Name']}
                    defaultText="There are no items to list..."
                    data = {this.state.graph.status() === undefined ? [] : this.state.graph.status()}
                    onExecute = {this.executePlayground.bind(this)}
                    accepting = {this.state.graph.isAccepting()}
                  />
              </AccordionDetails>
            </Accordion>              
            </Paper>
            {/* Playground End */}

            {/* Exercises Begin */}
            <Paper elevation={3} className="browser">
              <h2>Here is the description for the exercise.</h2>
              <TextField fullWidth id="question" variant="filled" placeholder="Description" value={exercise.question} InputProps={{readOnly: true}} />
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
            {/* Exercises End */}
            
            {/* Solution Begin */}
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
          {/* Solution End */}

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
              <ListItemButton onClick={this.getHint.bind(this)}>
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
              <CircularProgressWithLabel variant="determinate" value={this.state.percentRequired} />
              <ListItemText primary="Progress for Forbidden Scenarios!" />
              <CircularProgressWithLabel variant="determinate" value={this.state.percentForbidden} />
            </List>
            </Paper>
          </Grid>
        </Grid>
        <HelpSolver />
        <SuccessDialog
          open={this.state.showSuccessDialog}
          onClose={this.nextQuestion.bind(this)}
        />
        <Footer />
      </div>
    );
  }
}

export default Solver;
