export const HelpCreator = () => {
  return (
    <div id="help-create" className="overlay">
      <div className="popup">
        <h2>Help for creating exercise set</h2>
        <a href="#" className="close">&times;</a>
        <div className="content">
          <p>Fill out the fields in this form to create a question and the 
            conditions that the student's answer must fulfil to be correct. </p>
          <p>At the top, you should write a question in natural language and the
            corresponding DCR representation, e.g. "When you get up in the morning 
            you must eat your breakfast." and "A--&gt;*B". </p>
          <p>In the middle, you should define the symbol that you are using to represent
            each activity in the current exercise. So for example, you could use "A" as a 
            symbol to refer to the activity "get up in the morning". You can add more 
            symbols by clicking on "Add More". </p>
          <p>At the bottom, you should fill out the conditions that a correct answer must
            fulfil. Select "Allowed" for scenarios that must be allowed in a correct answer. 
            Select "Forbidden" if the scenario is NOT allowed in a correct answer. 
            A single scenario may consist of one or more activities, separated by commas. For 
            example, the scenario "A,B,B" means you do activity A once then activity B twice. 
            If you want, you can add hints to show to the students if they get 
            stuck. You can add more scenarios by clicking on "Add More". </p>
          <p>Click on "Add question" from the right panel to add a new question if desired.
            You can also navigate through your questions by clicking on "Previous" and "Next".
            To delete a question, just delete all text in the question field. </p>
          <p>Remember to click on "Save as file" when you are finished!</p>
        </div>
      </div>
    </div>
  );
}