import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisto 4', () => {
  test('Se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole, history } = renderWithRouter(<NotFound />);
    history.push('/whatever/');

    const notFoundText = getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });

  test('Se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const imgURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(img).toHaveAttribute('src', imgURL);
    expect(img).toBeInTheDocument();
  });
});
