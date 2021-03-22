import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Test <NotFound />', () => {
  it('renders a heading lvl 2 with text "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const message = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(message).toBeInTheDocument();
  });

  it('it renders an image', () => {
    const imgSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const name = 'Pikachu crying because the page requested was not found';

    const { getByRole } = renderWithRouter(<NotFound />);
    const image = getByRole('img', { name });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe(imgSource);
  });
});
