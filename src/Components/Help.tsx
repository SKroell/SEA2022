export const HelpCreator = () => {
  return (
    <div id="help-create" className="overlay">
      <div className="popup">
        <h2>Help for creating exercise set</h2>
        <a href="#" className="close">&times;</a>
        <div className="content">
          <p>Fill out the fields in this form to create a student question, where the 
            student's answer has to allow/forbid your input scenarios in order to be correct. </p>
          <p>At the top, you should write a description  of the process to be modeled in 
            natural language, e.g. "When you get up in the morning you must eat your 
            breakfast." If you like, you can put a reference solution for the process in 
            the bottom field, using DCR representation. </p>
          <p>In the next section, you should define the symbol that you use to represent
            each activity in the exercise. So for example, you could use "A" as a 
            symbol to refer to the activity "get up in the morning". You can add more 
            symbols by clicking on "Add More". </p>
          <p>Next, you should fill out the conditions that a correct answer must
            fulfil. Select "Allowed" for scenarios that must be allowed in a correct answer. 
            Select "Forbidden" if the scenario is NOT allowed in a correct answer. 
            A single scenario may consist of one or more activities, separated by commas. For 
            example, the scenario "A,B,B" means you do activity A once then activity B twice. 
            If you want, you can add hints to show to the students if they get 
            stuck. You can add more scenarios by clicking on "Add More". </p>
          <p>Click on "Add question" from the right panel to add a new question if desired.
            Use the navigation arrows at top-left to view or edit other questions in the 
            current set. You can also load previously saved exercise sets (.json file) for
            viewing or editing using the "Load from File" button.</p>
          <p>Remember to click on "Save as file" when you are finished!</p>
        </div>
      </div>
    </div>
  );
}

export const HelpSolver = () => {
  return (
    <div id="help-solve" className="overlay">
      <div className="popup">
        <h2>Help for solving exercise set</h2>
        <a href="#" className="close">&times;</a>
        <div className="content">
        <p>Write a solution in the solution field, using DCR representation. Your answer 
            must pass all the allowed/forbidden scenarios in order to be correct. </p>
          <p>Click on "Load from File" from the top-right panel to add a new exercise set 
            (.json file).</p>
          <p>At the top, you can open and close a playground, which gives a graphical 
            representation of your solution. Here, you can e.g. test if the scenario
            "A,A" is allowed or forbidden with your solution. You can get back to the graph for
            your solution field by using the "reset" button. </p>
          <p>In the next field, you can see the process for the current exercise which you should 
            model using DCR representation. To make it easier to model, the field below shows
            the symbols that are used to represent each activity in the exercise. For example, 
            "A" could be used to refer to the activity "get up in the morning". </p>
          <p>You should fill in the solution field at the bottom. You need to use the given
            symbols and DCR representation. For example, "A(0,1,0)" means that activity "A" 
            is included, but is not executed and is not pending. If your solution allows any 
            "Allowed" scenarios, then your progress will be noted in blue on the circular progress 
            bar in the bottom-right panel. Likewise, your progress will be shown if any "Forbidden" 
            scenarios are NOT allowed in your answer. If you're stuck, you can click 
            on the "Get hint" button on the top-right panel. </p>
          <p>Click on "Next exercise" from the top-right panel to go to the next exercise. You can 
            also use the navigation arrows at top-left to move between exercises in the set.</p>
        </div>
      </div>
    </div>
  );
}