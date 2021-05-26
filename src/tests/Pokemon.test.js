import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import { readFavoritePokemonIds } from '../services/pokedexService';
import App from '../App';

const setIsPokemonFavoriteById = () => {
  const favoritePokemonIds = readFavoritePokemonIds();
  const isPokemonFavorite = pokemons.reduce((acc, pokemon) => {
    acc[pokemon.id] = favoritePokemonIds.includes(pokemon.id);
    return acc;
  }, {});

  return isPokemonFavorite;
};
const isFavorite = setIsPokemonFavoriteById();

describe('Test "Pokemon" functionality', () => {
  test('Render Pokémon card', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isPokemonFavoriteById={ isFavorite[25] }
      />,
    );
    const namePokemon = screen.getByTestId('pokemon-name');
    const typePokemon = screen.getByTestId('pokemonType');
    const weightPokemon = screen.getByTestId('pokemon-weight');
    const imagePokemon = screen.getByAltText('Pikachu sprite');

    expect(namePokemon.textContent).toBe('Pikachu');
    expect(typePokemon).toHaveTextContent('Electric');
    expect(weightPokemon).toHaveTextContent('Average weight: 6.0 kg');
    expect(imagePokemon).toBeInTheDocument();
    expect(imagePokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Navigation link "More details": redirecting to pokemon details', () => {
    const { history } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isPokemonFavoriteById={ isFavorite[25] }
      />,
    );
    expect(history.location.pathname).toBe('/');
    const detailsLink = screen.getByText('More details');
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    expect(history.location.pathname).toBe('/pokemons/25');
  });
  test('Render favorite', () => {
    renderWithRouter(
      <App />,
    );
    fireEvent.click(screen.getByText('More details'));
    fireEvent.click(screen.getByText('Pokémon favoritado?'));
    const favImage = screen.getByAltText('Pikachu is marked as favorite');
    expect(favImage).toBeInTheDocument();
    expect(favImage.src).toBe('http://localhost/star-icon.svg');
  });
});
