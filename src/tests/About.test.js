import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('if page contains info about pokedex', () => {
  const { getByText, getByRole } = renderWithRouter(<About />);

  const header = getByRole('heading', { level: 2, name: 'About Pokédex' });
  const firstParagraph = getByText(['This application simulates a Pokédex',
    ' a digital encyclopedia containing all Pokémons']);
  const secondParagraph = getByText(['One can filter Pokémons by type',
    ' and see more details for each one of them']);
  const image = getByRole('img');

  expect(header).toBeInTheDocument();
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
