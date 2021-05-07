import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import onlyPikachuMock from './__mocks__/onlyPikachu';

test('display No favorite pokemon found, when there are no favorite pokemons', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const messageNotFound = getByText('No favorite pokemon found');
  expect(messageNotFound.textContent).toBe('No favorite pokemon found');
});
test('show all favorite pokemons', () => {
  const { getByTestId, getByAltText } = renderWithRouter(
    <FavoritePokemons
      pokemons={ onlyPikachuMock }
    />,
  );
  const favoritePokemonName = getByTestId('pokemon-name');
  const favoritePokemonType = getByTestId('pokemonType');
  const favoritePokemonWeight = getByTestId('pokemon-weight');
  const favoritePokemonImg = getByAltText('Pikachu sprite');

  expect(favoritePokemonName.textContent).toBe('Pikachu');
  expect(favoritePokemonType.textContent).toBe('Electric');
  expect(favoritePokemonWeight.textContent).toBe('Average weight: 6.0 kg');
  expect(favoritePokemonImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});
test('there are no pokemons card when favorites is empty', () => {
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const pokemonCard = queryByText((_, { className }) => className === 'favorite-pokemon');
  expect(pokemonCard).toBeFalsy();
});
