import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('Test NotFound component', () => {
  test('Render a level 2 heading with "Page requested not found" text', () => {
    renderWithRouter(<NotFound />);

    const heading2 = screen.getByRole('heading', { level: 2 });

    expect(heading2).toBeInTheDocument();
    expect(heading2).toHaveTextContent(/Page requested not found/);
  });

  test('Render a image from a crying Pikachu', () => {
    renderWithRouter(<NotFound />);

    const cryingPikachuImg = screen.getByAltText(/Pikachu crying/i);

    expect(cryingPikachuImg).toBeInTheDocument();
    expect(cryingPikachuImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
