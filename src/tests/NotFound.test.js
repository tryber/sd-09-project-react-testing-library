import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Test the <NotFound.js /> component', () => {
  test('Test if contains an h2 heading with the text Page requested not found', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const heading = getByRole('heading', {
      level: 2,
    });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('Page requested not found 😭');
  });

  test('Test if the page shows the image', () => {
    const { getAllByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getAllByRole('img');
    expect(img[1].src).toBe(src);
  });
});
