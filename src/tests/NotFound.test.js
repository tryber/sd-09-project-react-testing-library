import React from 'react';
import { render } from '@testing-library/react';

import NotFound from '../components/NotFound';

test('should haver a heading and a image', () => {
  const { getByRole, getAllByRole } = render(<NotFound />);
  const heading = getByRole('heading', { level: 2 });
  expect(heading).toHaveTextContent('Page requested not found 😭');

  const image = getAllByRole('img')[1];
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
