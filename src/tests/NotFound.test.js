import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('testing the <NotFound.js /> component', () => {
  test('checking if the page contains an h2 heading', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    const emojiSpan = screen.getByRole('img', {
      name: /Crying emoji/,
    });

    expect(heading).toBeInTheDocument();
    expect(emojiSpan).toBeInTheDocument();
  });

  test('checking if the page shows the image', () => {
    renderWithRouter(<NotFound />);
    const imageNotFound = screen.getByAltText(
      /Pikachu crying because the page requested was not found/,
    );

    expect(imageNotFound).toBeInTheDocument();
    expect(imageNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
