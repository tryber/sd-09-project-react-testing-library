import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('test NotFound component', () => {
  it('test if there is a `h2` saying not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole(
      'heading',
      { name: 'Page requested not found Crying emoji', level: 2 },
    );

    expect(notFound).toBeInTheDocument();
  });

  it('test if there is an image', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(notFoundImg).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
