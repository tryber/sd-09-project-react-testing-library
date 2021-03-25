import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const getPokemon = (pokemonName) => pokemons.find(
  (pokemon) => (pokemonName === pokemon.name),
);

describe('Tests the pokemon page', () => {
  test('The pokemon card is renderized', () => {
    const { getByTestId, getByAltText } = renderWithRouter(<App />);
    const expectedWeightDataLength = 4;
    const pokemonName = getByTestId('pokemon-name');
    const pokemon = getPokemon(pokemonName.textContent);
    const weight = pokemon.averageWeight;
    expect(pokemon).toBeTruthy();
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const weightData = pokemonWeight.textContent.split(' ');
    const pokemonImg = getByAltText(`${pokemon.name} sprite`);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(pokemon.name);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('src', pokemon.image);
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(pokemon.type);
    expect(pokemonWeight).toBeInTheDocument();
    expect(weightData).toBeTruthy();
    expect(weightData).toHaveLength(expectedWeightDataLength);
    expect(weight.value).toBe(weightData[2]);
    expect(weight.measurementUnit).toBe(weightData[3]);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${weight.value} ${weight.measurementUnit}`,
    );
  });
  test('the more details link should renderize with correct information', () => {
    const {
      history,
      getByText,
      getByTestId,
      getAllByRole,
      getByRole,
      getByAltText,
    } = renderWithRouter(<App />);
    const moreDetails = getByText('More details');
    const pokemonName = getByTestId('pokemon-name');
    const pokemon = getPokemon(pokemonName.textContent);
    expect(pokemon).toBeTruthy();
    expect(moreDetails).toBeInTheDocument();
    expect(moreDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
    userEvent.click(moreDetails);
    const detailsTitles = getAllByRole('heading', { level: 2 });
    expect(detailsTitles[0]).toHaveTextContent(`${pokemon.name} Details`);
    expect(detailsTitles[1]).toHaveTextContent('Summary');
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemon.id}`);
    const favoriteCheck = getByRole('checkbox');
    userEvent.click(favoriteCheck);
    const favImage = getByAltText(`${pokemon.name} is marked as favorite`);
    if (favoriteCheck.checked) {
      expect(favImage).toBeInTheDocument();
      expect(favImage).toHaveAttribute('src', '/star-icon.svg');
      expect(favImage).toHaveAttribute('alt', `${pokemon.name} is marked as favorite`);
    } else {
      expect(favoriteCheck).toBeFalsy();
    }
  });
});
