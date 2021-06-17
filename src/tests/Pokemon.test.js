import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import Pokemons from '../data';

describe('Testando o componente Pokemon.js', () => {
  const pokemonNameTestId = 'pokemon-name';

  it('Teste se é renderizado um card com as informações do pokémon.', () => {
    const { getByTestId, getByText, getByRole } = renderWithRouter(<App />);
    const firstPokemon = Pokemons[0];
    const { averageWeight } = firstPokemon;
    const { value, measurementUnit } = averageWeight;
    const averageWeightText = `Average weight: ${value} ${measurementUnit}`;
    const pokemonImage = getByRole('img');

    expect(getByTestId(pokemonNameTestId)).toBeInTheDocument();
    expect(getByTestId(pokemonNameTestId).innerHTML).toBe(firstPokemon.name);

    expect(getByTestId('pokemonType')).toBeInTheDocument();
    expect(getByTestId('pokemonType').innerHTML).toBe(firstPokemon.type);

    expect(getByText(averageWeightText)).toBeInTheDocument();

    expect(pokemonImage.getAttribute('src')).toBe(firstPokemon.image);
    expect(pokemonImage.getAttribute('alt')).toBe(`${firstPokemon.name} sprite`);
  });

  it('Teste se o card apresenta um link que redireciona para /pokemons/$_id', () => {
    const { getByText, getByTestId, history } = renderWithRouter(<App />);
    const linkToPokemonDetails = getByText('More details');
    const currentPokemonName = getByTestId(pokemonNameTestId).innerHTML;
    const currentPokemonObject = Pokemons.find((pokemon) => (
      pokemon.name === currentPokemonName
    ));

    fireEvent.click(linkToPokemonDetails);

    const { location } = history;

    expect(location.pathname).toBe(`/pokemons/${currentPokemonObject.id}`);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByText, getByAltText, getByTestId, history } = renderWithRouter(<App />);
    const firstPokemon = Pokemons[0];

    history.push(`/pokemons/${firstPokemon.id}`);

    const toFavoriteButton = getByText('Pokémon favoritado?');

    fireEvent.click(toFavoriteButton);

    history.push('/favorites');

    const pokemonName = getByTestId(pokemonNameTestId);
    const starIconExpectedAlt = `${pokemonName.innerHTML} is marked as favorite`;
    const starIcon = getByAltText(starIconExpectedAlt);

    expect(starIcon).toBeInTheDocument();
    expect(starIcon.getAttribute('src')).toBe('/star-icon.svg');
  });
});
