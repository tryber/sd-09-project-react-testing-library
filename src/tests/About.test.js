import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('Testes página sobre', () => {
  it('Testa se a página sobre contém informações sobre a Pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexInfo = getByText(/This application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Verifica se o title About Pokédex é renderizada', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexTitle = getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(pokedexTitle).toBeInTheDocument('About Pokédex');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexParagrafOne = getByText(/This application simulates a Pokédex/i);
    const pokedexParagrafTwo = getByText(/One can filter Pokémons by type/i);
    expect(pokedexParagrafOne).toBeInTheDocument();
    expect(pokedexParagrafTwo).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByRole } = renderWithRouter(<About />);
    const pokedexImg = getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
