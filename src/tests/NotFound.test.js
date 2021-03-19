import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('tests Not Found page', () => {
  it('tests if correct h2 is displayed', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const notFoundText = getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFoundText).toBeInTheDocument();
  });
  it('tests if correct image is shown', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const imageNotFound = getByRole('img', { name: /Pikachu/ });
    expect(imageNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
