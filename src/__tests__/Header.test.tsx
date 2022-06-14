import { render, screen } from '@testing-library/react';
import Header from '../Components/Header'
import {BrowserRouter as Router} from 'react-router-dom';

describe("Testing header component", () => {
    it('should display header with given title', ()=>{
    const testText = "Test title";
    render( <Router><Header title={testText} /></Router>);
    expect(screen.getByText(testText)).toBeInTheDocument();
    })
})