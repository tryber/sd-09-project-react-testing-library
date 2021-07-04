import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);

  const pokeInfo = /This application simulates a Pokédex*/i;
  expect(getByText(pokeInfo)).toBeDefined();
});

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const aboutHeading = /About Pokédex/i;

  expect(getByText(aboutHeading)).toBeDefined();
});

test('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { getByText } = renderWithRouter(<About />);

  const pokeInfoP1 = /This application simulates a Pokédex*/i;
  const pokeInfoP2 = /One can filter Pokémons by type*/i;

  expect(getByText(pokeInfoP1 && pokeInfoP2)).toBeDefined();
});

test('Testa se a página contém a imagem de uma Pokédex:', () => {
  const { getByRole } = renderWithRouter(<About />);

  const pokedexImgSrc = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const getImgTag = getByRole('img');
  expect(getImgTag.src).toBe(pokedexImgSrc);
});
