import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

test('renders a card with pokémon info', () => {
  const { getByTestId, getByRole } = renderWithRouter(<App />);
  const name = getByTestId('pokemon-name');
  expect(name).toHaveTextContent(/Pikachu/);
  const type = getByTestId('pokemon-type');
  expect(type).toHaveTextContent(/Electric/);
  const weight = getByTestId('pokemon-weight');
  const { value } = pokemons[0].averageWeight;
  const { measurementUnit } = pokemons[0].averageWeight;
  expect(weight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
  const img = getByRole('img');
  expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  expect(img.src).toBe(`${pokemons[0].image}`);
});

test('tests if card contains a link for more info', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText(/More details/);
  expect(link).toBeInTheDocument();
  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
});

test('renders a star icon in favorited pokemon', () => {
  const { getByText, getByAltText } = renderWithRouter(<App />);
  const moreDetails = getByText(/More details/);
  fireEvent.click(moreDetails);
  const favorite = getByText(/Pokémon favoritado?/);
  fireEvent.click(favorite);
  const starIcon = getByAltText(`${pokemons[0].name} is marked as favorite`);
  expect(starIcon).toBeInTheDocument();
  expect(starIcon.src).toBe('http://localhost/star-icon.svg');
});
