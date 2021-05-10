import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requirement 4', () => {
  test('if the page has an h2 with the text "Page requested not found 😭"', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);

    history.push('/whatever/');

    const notFound = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });

  test('if the page shows the image "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(img).toHaveAttribute('src', imgURL);
    expect(img).toBeInTheDocument();
  });
});
