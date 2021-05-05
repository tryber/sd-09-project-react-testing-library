import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Component <NotFound.js /> Test', () => {
  test('renders a heading with the notFound text', () => {
    const { getByText } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const heading = getByText(/Page requested not found/i);
    expect(heading).toBeInTheDocument();
  });

  test('show img src', () => {
    const { getByRole } = render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const img = getByRole('img',
      { name: 'Pikachu crying because the page requested was not found' });
    const src = img.getAttribute('src');
    expect(src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
