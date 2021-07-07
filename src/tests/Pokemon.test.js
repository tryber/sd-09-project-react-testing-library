import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Test component Pokemon', () => {
  const pokemonNameTestId = 'pokemon-name';

  it('test if is rendered one card with the informations.', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);
    // const secondPokemon = Pokemons[1];
    const firstPokemon = Pokemons[0];
    const { averageWeight } = firstPokemon;
    const { value, measurementUnit } = averageWeight;
    const averageWeightText = `Average weight: ${value} ${measurementUnit}`;
    const pokemonImg = getByRole('img');

    expect(getByTestId(pokemonNameTestId)).toBeInTheDocument();
    expect(getByTestId(pokemonNameTestId).innerHTML).toBe(firstPokemon.name);

    // expect(getByTestId(/pokemonType/)).toBeInTheDocument();
    // expect(getByTestId(/pokemonType/).innerHTML).toBe(secondPokemon.type);
    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemonType').innerHTML).toBe(firstPokemon.type);

    expect(getByText(averageWeightText)).toBeInTheDocument();

    expect(pokemonImg.getAttribute('src')).toBe(firstPokemon.image);
    expect(pokemonImg.getAttribute('alt')).toBe(`${firstPokemon.name} sprite`);
  });

  it('Test the redirect to /pokemons/$_id', () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    // const linkToPokemonDetails = getByText(/More details/);
    const linkToPokemonDetails = getByText('More details');
    const currentPokemonName = getByTestId(pokemonNameTestId).innerHTML;
    const currentPokemonObject = Pokemons.find((pokemon) => (
      pokemon.name === currentPokemonName
    ));

    fireEvent.click(linkToPokemonDetails);

    const { location } = history;

    expect(location.pathname).toBe(`/pokemons/${currentPokemonObject.id}`);
  });

  it('Test if exist one star in fav pokemno.', () => {
    const { getByText, getByAltText, getByTestId, history } = renderWithRouter(<App />);
    const firstPokemon = Pokemons[0];

    history.push(`/pokemons/${firstPokemon.id}`);
    // const toFavoriteButton = getByText(/Pokémon favoritado/);

    // fireEvent.click(toFavoriteButton);
    const toFavoriteButton = getByText('Pokémon favoritado?');

    fireEvent.click(toFavoriteButton);

    // history.push('/');
    // history.push('/');
    history.push('/favorites');

    const pokemonName = getByTestId(pokemonNameTestId);
    const starIconExpectedAlt = `${pokemonName.innerHTML} is marked as favorite`;
    const starIcon = getByAltText(starIconExpectedAlt);

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.getAttribute('src')).toBe('/star-icon.svg');
  });
});
