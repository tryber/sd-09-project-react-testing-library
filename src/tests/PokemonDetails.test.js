import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './History';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const linkDetails = 'More details';

it('render info about selected pokemon', () => {
  const { getByText, getByRole, queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByText(linkDetails));
  expect(getByText(`${pokemon.name} Details`)).toBeInTheDocument();
  expect(getByText(`${pokemon.summary}`)).toBeInTheDocument();
  expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
  expect(queryByText(linkDetails)).not.toBeInTheDocument();
});

it('find a section of maps with pokemons location', () => {
  const { queryByText, getByRole, getAllByAltText } = renderWithRouter(<App />);
  fireEvent.click(queryByText(linkDetails));
  expect(
    getByRole('heading', { level: 2, name: `Game Locations of ${pokemon.name}` }),
  ).toBeInTheDocument();
  pokemon.foundAt.forEach(({ location, map }, index) => {
    expect(queryByText(location)).toBeInTheDocument();
    expect(getAllByAltText(`${pokemon.name} location`)[index].src).toBe(map);
  });
});

it('can mark pokemon as favorite', () => {
  const { queryByText, getByLabelText } = renderWithRouter(<App />);
  fireEvent.click(queryByText(linkDetails));
  expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
});
