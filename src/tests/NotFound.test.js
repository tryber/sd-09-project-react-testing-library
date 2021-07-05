import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('tests the component NotFound.js', () => {
  it('contains a heading h2 with specif test', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('shows a specific image', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const image = getByRole('img', {
      name: /Pikachu crying because the page requested was not found/i,
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
