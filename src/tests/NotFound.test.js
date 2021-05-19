import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('teste da pagina not found', () => {
  it('texto - Page requested not found', () => {
    // access
    const { getByText } = renderWithRouter(<NotFound />);
    const notFound = getByText('Page requested not found');

    // test
    expect(notFound).toBeInTheDocument();
  });

  it('img - https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    // access
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');

    // test
    expect(image.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
