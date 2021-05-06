import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const detailsLinkName = 'More details';

test('renders a card with Pokémon\'s info', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const { averageWeight: { value, measurementUnit } } = pokemon;
  expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
  expect(getByTestId('pokemonType').textContent).toBe(pokemon.type);
  expect(getByTestId('pokemon-weight').textContent)
    .toBe(`Average weight: ${value} ${measurementUnit}`);
  expect(getByAltText(`${pokemon.name} sprite`).src).toBe(pokemon.image);
});

test('has a link to show more info about a Pokémon', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText(detailsLinkName)).toBeInTheDocument();
});

test('when clicked on `More detais` it redirects to PokemonDetails page', () => {
  const { getByText } = renderWithRouter(<App />);
  fireEvent.click(getByText(detailsLinkName));
  expect(getByText('Summary')).toBeInTheDocument();
});

test('changes URL to `/pokemon/<id>`', () => {
  const { getByText, history } = renderWithRouter(<App />);
  fireEvent.click(getByText(detailsLinkName));
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemon.id}`);
});

test('shows a star icon when a Pokémon is favorited', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  fireEvent.click(getByText(detailsLinkName));
  fireEvent.click(getByText('Pokémon favoritado?'));
  const image = getByAltText(`${pokemon.name} is marked as favorite`);
  expect(image.src).toContain('/star-icon.svg');
});
