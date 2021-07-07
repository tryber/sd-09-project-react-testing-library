import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Test not found page', () => {
  it('test if page has one tag H2 with requested page', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const headingNotFound = getByText(/Page requested not found/i);

    expect(headingNotFound).toBeInTheDocument();
    expect(headingNotFound.localName).toBe('h2');
  });

  it('test page shows the image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const imageNotFound = getByAltText(/Pikachu crying/i);
    const notFoundImageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound.getAttribute('src')).toBe(notFoundImageURL);
  });
});
