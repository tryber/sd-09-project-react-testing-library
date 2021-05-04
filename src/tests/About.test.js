import React from 'react';
import { render } from '@testing-library/react';
import About from '../components/About';

// test('Se a página contém informações sobre a Pokédex', () => {
//   const { getAllByText } = render(<About />);
//   const aboutPokedex = getAllByText(/Pokédex/i);
//   expect(aboutPokedex).toBeInTheDocument();
// });

test('Se a página contém um h2 com o texto About Pokédex', () => {
  const { getByRole } = render(<About />);
  const h2AboutPokedex = getByRole('heading', { level: 2 });
  expect(h2AboutPokedex.textContent).toBe('About Pokédex');
});

test('Se a página contém 2 parágrafos sobre a POkédex', () => {
  const { getAllByText } = render(<About />);
  const paragraphs = getAllByText(/Pokémons/i);
  expect(paragraphs.length).toBe(2);
});

test('Se a página contém a imagem de uma Pokédex', () => {
  const { getByAltText } = render(<About />);
  const pokedexImage = getByAltText(/Pokédex/i);
  expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
