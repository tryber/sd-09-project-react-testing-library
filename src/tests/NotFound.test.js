import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

it('Exibir h2 com texto Page requested not found', () => {
  const { getByRole } = render(<NotFound />);
  const heading = getByRole('heading', { name: /Page requested not found/ });

  expect(heading).toBeInTheDocument();
});

test('Exibir imagem a seguir', () => {
  const { getAllByRole } = render(<NotFound />);
  const img = getAllByRole('img')[1];
  const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

  expect(img.src).toBe(src);
});
