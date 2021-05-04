import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('Se é renderizado um card com as informações de determinado pokémon', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  const pokemonImage = getByAltText('Pikachu sprite');
  expect(pokemonName.textContent).toBe('Pikachu');
  expect(pokemonType.textContent).toBe('Electric');
  expect(pokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Se o card do Pokémon na Pokédex contém um link para exibir detalhes', () => {
  const { getByText } = renderWithRouter(<App />);
  const linkPokeDetails = getByText('More details');
  expect(linkPokeDetails).toHaveAttribute('href', '/pokemons/25');
});

test('Se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getByAltText, history } = renderWithRouter(<App />);
  const linkPokeDetails = getByText('More details');
  userEvent.click(linkPokeDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
  const markAsFavorite = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
  userEvent.click(markAsFavorite);
  const homeBtn = screen.getByText('Home');
  userEvent.click(homeBtn);
  const favoriteStar = getByAltText(/marked as favorite/);
  expect(favoriteStar).toHaveAttribute('src', '/star-icon.svg');
  expect(favoriteStar).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
