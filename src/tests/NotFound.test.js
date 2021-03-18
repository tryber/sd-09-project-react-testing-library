import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Tests Not Found', () => {
  const { getByRole } = render(<NotFound />);

  const heading = getByRole('heading', {
    level: 2,
    name: 'Page requested not found Crying emoji',
  });

  const pokeImg = getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });

  expect(heading).toBeInTheDocument();
  expect(pokeImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
