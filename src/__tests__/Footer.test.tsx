import { render, screen } from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import Footer from '../Components/Footer';

describe("Testing footer component", () => {
    it('should display footer', ()=>{
    const text = "This is a open source learning tool for learning about DCR-graphs!";
    render( <Router><Footer/></Router>);
    expect(screen.getByText(text)).toBeInTheDocument();
    })
})