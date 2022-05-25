export interface Symbol {
  symbol: string;
  activity: string;
}

export interface Scenario {
  scenario: string;
  allowed: boolean;
  hint: string;
}

export class Exercise {
  question: string;
  symbols: Symbol[];
  scenarios: Scenario[];
  solution: string;
  constructor() {
    this.question = "";
    this.symbols = [{ symbol: "", activity: "" }];
    this.scenarios = [{ scenario: "", allowed: true, hint: "" }];
    this.solution = "";
  }
}