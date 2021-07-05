import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Test \'NotFound.js\' Component - Requirement 04', () => {
  it('has an \'h2\' with \'Page request not found\' text',
    () => {
      const { getByRole, history } = renderWithRouter(<App />);
      history.push('/wrong-path');
      const heading = getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Page requested not found 😭');
    });
  it('has the right image', () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/wrong-path');
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(img.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
