import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Z_UNKNOWN } from 'zlib';
import SuccessDialog, { SuccessDialogProps } from '../Components/SuccessDialog';
import SuccesDialogProps from '../Components/SuccessDialog';

describe("Testing succesDialog component", () => {
    it('should display succesDialog', () => {

        const text = "Congratulations you have successfully completed the task! Lets go to the next question!"

        render(<SuccessDialog 
                    open = {true}
                    onClose = {()=> 2+3} 
                    last = {false}   />);


        expect(screen.getByText(text)).toBeInTheDocument();
    })
})

