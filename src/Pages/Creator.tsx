import React from 'react';
import './../App.css';
import './../Util/dcr.js';
import {parser} from './../Util/dcr_parser.js';

import { Header } from '../Components/Header';
import { HelpCreator } from '../Components/Help';
import { Footer } from '../Components/Footer';

import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Alert, List, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import HelpIcon from '@mui/icons-material/Help';
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

interface Symbol {
  symbol: string;
  activity: string;
}

interface Scenario {
  scenario: string;
  allowed: boolean;
  hint: string;
}

class Exercise {
  question: string;
  symbols: Symbol[];
  scenarios: Scenario[];
  constructor() {
    this.question = "";
    this.symbols = [{ symbol: "", activity: "" }];
    this.scenarios = [{ scenario: "", allowed: false, hint: "" }];
  }
}

const saveFile = async (blob: Blob) => {
  const a = document.createElement('a');
  a.download = 'exercise.json';
  a.href = URL.createObjectURL(blob);
  a.addEventListener('click', (e) => {
    setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
  });
  a.click();
};

// Main page of the application
class Creator extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      exercise: new Exercise(),
      parseError: "",
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
      case undefined: // not sure for not how to handle dropdowns
        newExercise.scenarios[i].allowed = e.target.value === "allowed";
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
  addSymbolFields() {
    let symbols = this.state.exercise.symbols;
    symbols.push({ symbol: "", activity: "" });
    this.setState({ exercise: { ...this.state.exercise, symbols: symbols } });
  }

  // Adds a new scenario to the exercise
  addScenarioFields() {
    let scenarios = this.state.exercise.scenarios;
    scenarios.push({ scenario: "", allowed: false, hint: "" });
    this.setState({ exercise: { ...this.state.exercise, scenarios: scenarios } });
  }

  // Removes a symbol/activity mapping from the exercise
  removeSymbolFields(index: number) {
    let symbols = this.state.exercise.symbols;
    symbols.splice(index, 1);
    this.setState({ exercise: { ...this.state.exercise, symbols: symbols } });
  }

  // Removes a scenario from the exercise
  removeScenarioFields(index: number) {
    let scenarios = this.state.exercise.scenarios;
    scenarios.splice(index, 1);
    this.setState({ exercise: { ...this.state.exercise, scenarios: scenarios } });
  }

  save() {
    const blob = new Blob([JSON.stringify(this.state.exercise, null, 4)], { type: 'application/json' });
    saveFile(blob);
  }

  load(e: any){
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const exercise = JSON.parse(reader.result as string);
      this.setState({ exercise: exercise });
    }
  }

  scenario(scenario: Scenario, index: number) {
    return (
      <>
        <Grid item xs={5}><TextField fullWidth id="scn" label="Scenario" variant="outlined" value={scenario.scenario} onChange={e => this.handleChange(index, e)} /></Grid>
        <Grid item xs={2}>
          <Select fullWidth id="dcr_type" label="Type" defaultValue="allowed" value={scenario.allowed ? "allowed" : "forbidden"} onChange={e => this.handleChange(index, e)}>
            <MenuItem value={'allowed'}>Allowed</MenuItem>
            <MenuItem value={'forbidden'}>Forbidden</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={5}><TextField fullWidth id="hnt" label="'Hints'" variant="filled" value={scenario.hint} onChange={e => this.handleChange(index, e)} /></Grid>
      </>
    )
  }

  render() {
    return (
      <div className="App">
        {/* Re-useable Header */}
        <Header title="Create a new dcr learning exercise!" />

        <Grid container>
          <Grid item xs={9}>
            <Paper elevation={3} className="browser">
              <h2>What is the description for the exercise?!</h2>
              <TextField fullWidth id="question" label="question" variant="filled" placeholder="Description" onChange={e => this.handleChange(0, e)} />
              {/* <input type="text" id="question" name="question" size={65} placeholder="Description" /> */}
            </Paper>

            <Paper elevation={3} className="browser">
              <h2>Which symbol represents what activity?!</h2>
              <Grid container spacing={2} component="form">
                {this.state.exercise.symbols.map((symbol: Symbol, index: number) => (
                  <>
                    <Grid item xs={6}><TextField fullWidth id="sym" label="Symbol" variant="outlined" value={symbol.symbol} onChange={e => this.handleChange(index, e)} /></Grid>
                    <Grid item xs={6}><TextField fullWidth id="act" label="Activity" variant="filled" value={symbol.activity} onChange={e => this.handleChange(index, e)} /></Grid>
                  </>
                ))}
              </Grid>
              <br />
              <Button variant="outlined" id="add_more_fields" onClick={() => this.addSymbolFields()}>Add More</Button>
              <Button variant="outlined" id="remove_fields" onClick={() => this.removeSymbolFields(this.state.exercise.symbols.count)}>Remove Field</Button>
            </Paper>

            <Paper elevation={3} className="browser">
              <h2>Add allowed and forbidden scenarios for the exercise!</h2>
              <Grid container spacing={2} component="form">
                {this.state.exercise.scenarios.map((value: Scenario, index: number) => (
                  <>{this.scenario(value, index)}</>
                ))}
              </Grid>
              <br />
              <Button variant="outlined" id="more_fields" onClick={() => this.addScenarioFields()}>Add More</Button>
              <Button variant="outlined" id="less_fields" onClick={() => this.removeScenarioFields(this.state.exercise.scenarios.count)}>Remove Field</Button>
            </Paper>

            <Paper elevation={3} className="browser">
              <h2>Let's check using a reference solution! (optional)</h2>
              <TextField fullWidth
                id="outlined-multiline-static"
                label="Reference Solution:"
                multiline
                rows={4}
                defaultValue="A(0,0,0)"
                onChange={e => this.parseSolution(e)}
              />
              {this.state.parseError === "" ? "" : <Alert severity="error">{this.state.parseError}</Alert>}
            </Paper>
          </Grid>

            {/* Unsure if we shouild reuse navigation to keep here for now. */}
          <Grid item xs={3}>
            <Paper elevation={3} className="browser">
            <List
              sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton component="a" href="#help-create">
                <ListItemIcon><HelpIcon /></ListItemIcon>
                <ListItemText primary="Help" />
              </ListItemButton>
              <ListItemButton>
                <ListItemIcon><CheckBoxIcon /></ListItemIcon>
                <ListItemText primary="Add Question" />
              </ListItemButton>
              <ListItemButton onClick={() => this.save()}>
                <ListItemIcon><SaveIcon /></ListItemIcon>
                <ListItemText primary="Save as File" />
              </ListItemButton>
              <ListItemButton component="label">
                <input type="file" hidden onChange={e => this.load(e)}/>
                <ListItemIcon><UploadFileIcon /></ListItemIcon>
                <ListItemText primary="Load from File" />
              </ListItemButton>
            </List>
            </Paper>
          </Grid>
        </Grid>
        <HelpCreator />
        <Footer />
      </div>
    );
  }
}

export default Creator;
