import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Test no found compoment', () => {
  test('Test heading text to be a specific text', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/asd');
    const headingText = getByRole('heading', { name: /Page requested not found/ });
    expect(headingText).toBeInTheDocument();
  });

  test('Test heading text to be a specific text', () => {
    const { getByRole, history } = renderWithRouter(<App />);
    history.push('/asd');
    const image = getByRole('img', { name: /Pikachu crying/ });
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
