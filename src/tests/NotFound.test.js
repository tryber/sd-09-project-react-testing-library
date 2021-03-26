import React from 'react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import NotFound from '../components/NotFound';

describe('Requirement 04', () => {
  it('should render page not found when the path is inexistent', () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/pagina-que-nao-existe/');
    const noMatch = getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });

  it('should render the specified content', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const title = getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(title).toBeInTheDocument();

    const gif = getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    const path = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(gif.src).toBe(path);
  });
});
