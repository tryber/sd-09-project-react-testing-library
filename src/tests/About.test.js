import React from 'react';
import About from '../components/About';
import renderWithRouter from '../helper/renderWithRouter';

describe('2- Test the component <About />', () => {
  it('Should have info about Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const titleAbout = getByText(/About/);
    expect(titleAbout).toBeInTheDocument();
  });

  it('Should have a title: About Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const titleAboutPokedex = getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(titleAboutPokedex).toBeInTheDocument();
  });

  it('Should have two tags <p> with info about pokedex.', () => {
    const { getByText } = renderWithRouter(<About />);
    const firstTagP = getByText(/This application simulates/);
    const secondTagP = getByText(/One can filter/);
    expect(firstTagP && secondTagP).toBeInTheDocument();
  });

  it('Should render img with src:bulbagarden.', () => {
    const { getByRole } = renderWithRouter(<About />);
    const corretSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const tagImagem = getByRole('img');
    const srcOfImg = tagImagem.src;

    expect(srcOfImg).toBe(corretSrc);
  });
});
