import React from 'react';
import renderWithRouter from './renderWithRouter';
import { NotFound } from '../components';

describe('4. Teste o componente <NotFound.js />', () => {
  it('Test if a contains an h2 heading with the text Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const title = getByRole('heading', {
      level: 2,
    });

    expect(title.textContent).toBe('Page requested not found 😭');
  });

  it('Test if the page shows the image', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const image = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(getAllByRole('img')[1].src).toBe(image);
  });
});
