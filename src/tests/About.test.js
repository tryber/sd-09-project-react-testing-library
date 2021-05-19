import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Requisito 2', () => {
  test('Se a página contém informações sobre a Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);

    const aboutInfs = getByText('About Pokédex');
    expect(aboutInfs).toBeInTheDocument();
  });

  test('Se a página tem um H2 com o texto: "About Pokédex"', () => {
    const { getByRole } = renderWithRouter(<About />);

    const aboutText = getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutText).toBeInTheDocument();
  });

  test('Se a página contém dois paragrafos sobre a Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);

    const firstParagraphAbout = getByText(/This application simulates a Pokédex/i);
    expect(firstParagraphAbout).toBeInTheDocument();

    const secondParagraphAbout = getByText(/One can filter Pokémons by type/i);
    expect(secondParagraphAbout).toBeInTheDocument();
  });

  test('Se a página contém a imagem de uma Pokedex', () => {
    const { getByAltText } = renderWithRouter(<About />);

    const imgURL = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImage = getByAltText(/Pokédex/i);

    expect(pokedexImage).toHaveAttribute('src', imgURL);
    expect(pokedexImage).toBeInTheDocument();
  });
});
