import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Testa o componente <NotFound.js />', () => {
  it(`Testa se página contém um heading h2
      com o texto Page requested not found 😭`, () => {
    const { getByText, history } = renderWithRouter(<App />);
    history.push('/notFound');
    const { pathname } = history.location;
    expect(pathname).toBe('/notFound');

    const pageNotFound = getByText(/Page requested not found/i);
    expect(pageNotFound).toBeInTheDocument();
  });

  it(`Teste se página mostra a imagem
      https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.`, () => {
    const { getByAltText, history } = renderWithRouter(<App />);
    history.push('/notFound');
    const { pathname } = history.location;
    expect(pathname).toBe('/notFound');

    const imgAlt = getByAltText(/Pikachu crying because the page requested/i);
    expect(imgAlt).toBeInTheDocument();
    expect(imgAlt.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
