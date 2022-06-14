import React from 'react';
import { render, screen } from '@testing-library/react';
import DynamicModal from '../Util/DynamicModal';

describe('DynamicModal', () => {
    it('Should display message', () => {
      const testBool= true
      const testMessage = ["Hi, I am hint number 1", "Hello, I am hint number 2"]
      render(<DynamicModal text={testMessage} onRequestClose={testBool} />);
      expect(screen.getByText(testMessage[0] + testMessage[1] )).toBeInTheDocument()
    });
  });