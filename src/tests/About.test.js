import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('contais information about pokédex', () => {
  const { getByText } = renderWithRouter(<About />);
  const information = getByText(/This application simulates a Pokédex/);
  expect(information).toBeInTheDocument();
});

test('contais h2 about pokédex', () => {
  const { getByRole } = renderWithRouter(<About />);
  const h2 = getByRole('heading', { level: 2, name: /About Pokédex/ });
  expect(h2).toBeInTheDocument();
});

test('contais two p about pokédex', () => {
  const { getAllByText } = renderWithRouter(<About />);
  const p = getAllByText(/Pokémons/);
  expect(p.length).toBe(2);
});

test('contais img about pokédex', () => {
  const { getByAltText } = renderWithRouter(<About />);
  const img = getByAltText('Pokédex');
  expect(img.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
