import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Test the `<NotFound.js />` component', () => {
  it('contains an heading h2 with the text `Page requested not found 😭`', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const pageNotFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });

  it('the page show the image `giphy.gif`', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const pikachuImage = getByAltText(/Pikachu crying/i);
    expect(pikachuImage.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
