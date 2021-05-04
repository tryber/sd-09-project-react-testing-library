import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Se a página contém um h2 com o texto Page Not Found', () => {
  const { getByRole } = render(<NotFound />);
  const h2NotFound = getByRole('heading', { level: 2 });
  expect(h2NotFound.textContent).toBe('Page requested not found 😭');
});

test('Se a página mostra o gif do Pikachu chorando', () => {
  const { getByAltText } = render(<NotFound />);
  const altText = 'Pikachu crying because the page requested was not found';
  const gifNotFound = getByAltText(altText);
  expect(gifNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
