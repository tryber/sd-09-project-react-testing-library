import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Tests for the NotFound component', () => {
  it('should show a h2 with the text "Page requested not Found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const heading2 = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(heading2).toBeInTheDocument();
  });

  it('should show a gif in the page with a specific url', () => {
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { getAllByRole } = renderWithRouter(<NotFound />);

    // Tem que ser getAllByRole porque tem mais de uma imagem na tela...
    expect(getAllByRole('img')[1].src).toBe(url);
  });
});
