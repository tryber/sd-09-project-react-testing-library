import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

test('render about', () => {
  const { getByText } = renderWithRouter(<About />);
  const about = getByText(/This application simulates a Pokédex/i);
  expect(about).toBeInTheDocument();
});

test('h2 as header', () => {
  const { getByRole } = renderWithRouter(<About />);
  const header = getByRole('heading', { ariaLevel: 2 });
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent('About Pokédex');
});

test('number of paragraphs', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const requiredNumber = 2;
  const textTags = getAllByText(/Pokémons/);
  expect(textTags).toHaveLength(requiredNumber);
});

test('pokedex image', () => {
  const { getByRole } = renderWithRouter(<About />);
  const image = getByRole('img');
  expect(image.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
