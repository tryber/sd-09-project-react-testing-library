import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

test('Tests if the component has a h2 and an image', () => {
  const { history } = renderWithRouter(<NotFound />);

  history.push('/not-founded');
  const { pathname } = history.location;
  expect(pathname).toBe('/not-founded');

  const cryingEmoji = screen.getByText('😭');
  const emojiText = screen.getByText('Page requested not found');
  expect(cryingEmoji).toBeInTheDocument();
  expect(emojiText).toBeInTheDocument();

  const message = 'Pikachu crying because the page requested was not found';
  const image = screen.getByAltText(message);
  expect(image).toBeInTheDocument();
  expect(image.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
