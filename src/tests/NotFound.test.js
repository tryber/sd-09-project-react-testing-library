import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

test('Renders a heading `h2` with the text `Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const heading = screen.getByRole('heading');
  expect(heading.tagName).toEqual('H2');
  const headingText = screen.getByText('Page requested not found');
  expect(headingText).toBeInTheDocument();
});

test('Renders an image with url https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const noMatchImg = screen.getByRole('img', {
    name: /pikachu crying because the page requested was not found/i,
  });
  expect(noMatchImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});

// test('Renders an image with url https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
//   renderWithRouter(<NotFound />);
//   const image = screen.getByRole('img');
//   // console.log(image);
//   expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
// });

// npx stryker run ./stryker/NotFound.conf.json
