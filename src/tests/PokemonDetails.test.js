import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

const pokemon = pokemons[0];
const detailsLinkName = 'More details';

test('renders info about selected Pokémon', () => {
  const { getByText, getByRole, queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByText(detailsLinkName));
  expect(getByText(`${pokemon.name} Details`)).toBeInTheDocument();
  expect(queryByText(detailsLinkName)).not.toBeInTheDocument();
  expect(getByRole('heading', { level: 2, name: 'Summary' })).toBeInTheDocument();
  expect(getByText(`${pokemon.summary}`)).toBeInTheDocument();
});

test('has a section of maps with Pokémon\'s location', () => {
  const { getByRole, getAllByAltText, queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByText(detailsLinkName));
  expect(getByRole('heading', { level: 2, name: `Game Locations of ${pokemon.name}` }))
    .toBeInTheDocument();
  pokemon.foundAt.forEach(({ location, map }, index) => {
    expect(queryByText(location)).toBeInTheDocument();
    expect(getAllByAltText(`${pokemon.name} location`)[index].src).toBe(map);
  });
});

test('user can mark a Pokémon as favorite', () => {
  const { getByLabelText, queryByText } = renderWithRouter(<App />);
  fireEvent.click(queryByText(detailsLinkName));
  expect(getByLabelText('Pokémon favoritado?')).toBeInTheDocument();
});
