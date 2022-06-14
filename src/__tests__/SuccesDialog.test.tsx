import { render, screen } from '@testing-library/react';
import SuccessDialog from '../Components/SuccessDialog';


describe("Testing succesDialog component", () => {
    it('should display option to go to next question', () => {

        const text = "Lets go to the next question!"

        render(<SuccessDialog
            open={true}
            onClose={() => "done"}
            last={false}
        />);

        expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
    })
    it('should display that it was last exercise', () => {

        const text = "Congratulations you have successfully completed the exercises set!"

        render(<SuccessDialog
            open={true}
            onClose={() => "done"}
            last={true}
        />);

        expect(screen.getByText(text, { exact: false })).toBeInTheDocument();
    })
})

