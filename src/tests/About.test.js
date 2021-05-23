import React from 'react';
import renderWithRouter from './History';
import About from '../components/About';

it('About Pokedex in heading', () => {
  const { getByRole } = renderWithRouter(<About />);
  const head = getByRole('heading', { level: 2 });

  expect(head.textContent).toBe('About Pokédex');
});

it('', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const paragraphs = getAllByText(/Pokémons/i);

  expect(paragraphs.length).toBe(2);
});

it('Exist and match the image of pokedex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const image = getByAltText('Pokédex');

  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
