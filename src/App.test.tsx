import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { HelpSolver } from './Components/Help';
import DynamicModal from './Util/DynamicModal';


describe('DynamicModal', () => {
  it('Should display message', () => {

    const booolean = true
    const testMessage = ["Hello"]
    render(<DynamicModal text={testMessage} onRequestClose={booolean} />);
    expect(screen.getByText(testMessage[0])).toBeInTheDocument()
  });
});