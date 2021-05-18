import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('renders pokémon detailed info', () => {
  const { getByText, getByRole } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const name = getByText(`${pokemons[0].name} Details`);
  expect(name).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();
  const h2 = getByRole('heading', { level: 2, name: 'Summary' });
  expect(h2).toBeInTheDocument();
  const text = getByText(/This intelligent Pokémon roasts hard berries with/);
  expect(text).toBeInTheDocument();
});

test('renders a map with locations of selected pokemon', () => {
  const { getByRole, getAllByAltText, getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const title = getByRole('heading', {
    level: 2,
    name: `Game Locations of ${pokemons[0].name}`,
  });
  expect(title).toBeInTheDocument();
  const img = getAllByAltText(`${pokemons[0].name} location`);
  expect(img[0]).toBeInTheDocument();
  expect(img[1]).toBeInTheDocument();
  const url = pokemons[0].foundAt[0].map;
  expect(img[0].src).toBe(url);
});

test('renders a checkbox to select as favorite', () => {
  const { getByText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const favorite = getByText(/Pokémon favoritado?/);
  expect(favorite).toBeInTheDocument();
});
