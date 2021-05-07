import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

test('there are Pokédex info', () => {
  const { getByText } = renderWithRouter(<About />);
  const pokedexInfoTop = getByText(
    'This application simulates a Pokédex'
    + ', a digital encyclopedia containing all Pokémons',
  );
  const pokedexInfoWhat = getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  expect(pokedexInfoTop).toBeDefined();
  expect(pokedexInfoWhat).toBeDefined();
});
test('there are h2 heading with About Pokédex text', () => {
  const { getByRole } = renderWithRouter(<About />);
  const aboutPokedex = getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(aboutPokedex).toBeDefined();
});
test('there are 2 paragraphs with Pokémon includes in their text', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const aboutParagraphs = getAllByText((content, element) => (
    element.tagName === 'P'
    && content.includes('Pokémons')
  ));
  expect(aboutParagraphs).toBeDefined();
  expect(aboutParagraphs.length).toBe(2);
});
test('there are image of pokedex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const pokedexImage = getByRole('img');
  expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
