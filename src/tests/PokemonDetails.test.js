import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const getPokemon = (pokemonName) => pokemons.find(
  (pokemon) => (pokemonName === pokemon.name),
);

describe('Tests for PokemonDetails Component', () => {
  const MOREDETAILS = 'More details';
  test('if the detailed informations were renderized', () => {
    const { getAllByRole, getByText, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemon = getPokemon(pokemonName.textContent);
    expect(pokemon).toBeTruthy();
    userEvent.click(getByText(MOREDETAILS));
    const headings = getAllByRole('heading', { level: 2 });
    const summary = getByText(pokemon.summary);
    for (let index = 0; index < headings.length; index += 1) {
      expect(headings[index]).toBeInTheDocument();
    }
    expect(headings[0]).toHaveTextContent(`${pokemon.name} Details`);
    expect(headings[1]).toHaveTextContent('Summary');
    expect(headings[2]).toHaveTextContent(`Game Locations of ${pokemon.name}`);
    expect(summary).toBeInTheDocument();
    expect(summary).toHaveTextContent(pokemon.summary);
  });
  test('if there is a section with map in the page', () => {
    const { getByTestId, getByText, getAllByAltText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemon = getPokemon(pokemonName.textContent);
    userEvent.click(getByText(MOREDETAILS));
    const locationMaps = getAllByAltText(`${pokemon.name} location`);
    for (let index = 0; index < locationMaps.length; index += 1) {
      expect(locationMaps[index]).toHaveAttribute('alt', `${pokemon.name} location`);
      const location = pokemon.foundAt.find(
        (local) => local.map === locationMaps[index].src,
      );
      expect(location).toBeTruthy();
      const localName = getByText(location.location);
      expect(localName).toBeInTheDocument();
      expect(localName).toHaveTextContent(location.location);
      expect(locationMaps[index]).toHaveAttribute('src', location.map);
    }
  });
  test('if the user can favorite a pokemon from details page', () => {
    const { getByText, getByLabelText, getAllByRole } = renderWithRouter(<App />);
    const FAVORITE = 'Pokémon favoritado?';
    userEvent.click(getByText(MOREDETAILS));
    const favCheckBox = getByLabelText(FAVORITE);
    const labelFavCheckBox = getByText(FAVORITE);
    expect(favCheckBox).toBeInTheDocument();
    expect(labelFavCheckBox).toHaveTextContent(FAVORITE);
    const images = getAllByRole('img');
    userEvent.click(favCheckBox);
    expect(getAllByRole('img').length).toEqual(images.length + 1);
    userEvent.click(favCheckBox);
    expect(getAllByRole('img').length).toEqual(images.length);
  });
});
