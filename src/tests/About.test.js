import React from 'react';
import renderWithRouter from '../helpers/renderWithRouter';
import About from '../components/About';

test('teste se a aplicação possui informações sobre a pokedex', () => {
  const { getByText } = renderWithRouter(<About />);
  expect(getByText(/this application simulates a Pokédex/i)).toBeInTheDocument();
  expect(getByText(/one can filter Pokémons by type/i)).toBeInTheDocument();
});

test('A pagina contém um h2 com o texto About Pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  expect(getByRole('heading', {
    level: 2,
    name: /about pokédex/i,
  })).toBeInTheDocument();
});

test('teste se a aplicação possui dois parágrafos', () => {
  const { getAllByText } = renderWithRouter(<About />);
  expect(getAllByText(/pokémons/i)).toHaveLength(2);
});

test('Teste se a página contém uma imagem de pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const img = getByRole('img');
  expect(img.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
