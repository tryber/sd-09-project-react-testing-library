import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

test('test if the page contain the text About Pokedex', () => {
  const { getByText } = renderWithRouter(<About />);

  const h2 = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(h2).toBeInTheDocument();

  const paragOne = getByText(/This application simulates a Pokédex,/i);
  expect(paragOne).toHaveTextContent(/This application simulates a Pokédex,/,
    / a digital encyclopedia containing all Pokémons/i);

  const paragTwo = getByText(/One can filter Pokémons by type,/i);
  expect(paragTwo).toHaveTextContent(/One can filter Pokémons by type,/,
    /and see more details for each one of them/i);
});

test('Verify if the img has the correct url', () => {
  const { getByRole } = renderWithRouter(<About />);
  const img = getByRole('img');
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
