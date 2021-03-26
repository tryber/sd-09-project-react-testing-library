import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

test('se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByText, getByTestId, getByAltText } = renderWithRouter(<App />);
  const pokemonName = getByText('Pikachu');
  expect(pokemonName).toBeInTheDocument();
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType).toHaveTextContent('Electric');
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  const pokemonImg = getByAltText('Pikachu sprite');
  expect(pokemonImg).toBeInTheDocument();
  expect(pokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('se há o link para detalhes do pokémon', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const likeDetails = getByText('More details');
  userEvent.click(likeDetails);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
  const { getByText, getByAltText, getByLabelText } = renderWithRouter(<App />);
  const likeDetails = getByText('More details');
  userEvent.click(likeDetails);
  const btnFavorite = getByLabelText('Pokémon favoritado?');
  userEvent.click(btnFavorite);
  expect(getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  const imgFavorite = getByAltText('Pikachu is marked as favorite');
  expect(imgFavorite.src).toBe('http://localhost/star-icon.svg');
});
