import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

describe('Requisito 02 - Testes do About.js', () => {
  it('A página contém as informações sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const pokedexInfo = getByText(/This application simulates a Pokédex*/i);

    expect(pokedexInfo).toBeDefined();
  });

  it('A página contém um heading h2 com o texto About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const heading = getByText(/About Pokédex/i);

    expect(heading).toBeDefined();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);

    const paragraph1 = getByText(/This application simulates a Pokédex*/i);
    const paragraph2 = getByText(/One can filter Pokémons by type*/i);

    expect(paragraph1 && paragraph2).toBeDefined();
  });

  it('A página contém uma imagem específica de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);

    const pokedexImage = getByRole('img');
    const pokedexImageLink = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(pokedexImage.src).toBe(pokedexImageLink);
  });
});
