import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
// Projeto realizado com ajuda da Daniela Müller e Raquel

test('renders a reading with the text `Pokédex`', () => {
  const { getByText } = renderWithRouter(<App />);
  const heading = getByText(/Pokédex/i);
  expect(heading).toBeInTheDocument();
});

test('teste se o primeiro link deve possuir o texto home', () => {
  const { getByText } = renderWithRouter(<App />);
  const home = getByText(/home/i);
  expect(home).toBeInTheDocument();
});

test('teste se o primeiro link deve possuir o texto home', () => {
  const { getByText } = renderWithRouter(<App />);
  const about = getByText(/about/i);
  expect(about).toBeInTheDocument();
});

test('teste se o primeiro link deve possuir o texto Favorite Pokémons', () => {
  const { getByText } = renderWithRouter(<App />);
  const favoritePokemons = getByText(/favorite/i);
  expect(favoritePokemons).toBeInTheDocument();
});
