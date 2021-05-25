import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o componente <NotFound.js />', () => {
  it('Verifica se a página contém o parágrafo "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const textHeading = getByRole('heading', { level: 2 });

    expect(textHeading).toBeInTheDocument();
    expect(textHeading).toHaveTextContent('Page requested not found 😭');
  });

  it('Verifica se a página contém uma imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const image = getAllByRole('img');

    expect(image[1]).toBeInTheDocument();
    expect(image[1].src).toBe(imageURL);
  });
});
