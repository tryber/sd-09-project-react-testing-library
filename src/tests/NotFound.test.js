import React from 'react';
import renderWithRouter from './History';
import NotFound from '../components/NotFound';

it('h2 is heading with content `Page requested not found Emoji Crying`', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const heading = getByRole('heading', { level: 2 });

  expect(heading.textContent).toBe('Page requested not found 😭');
});

it('show picture https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
