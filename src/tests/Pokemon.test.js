import React from 'react';
import { fireEvent } from '@testing-library/react';

import renderWithRouter from './helpers';
import Pokemon from '../components/Pokemon';
import App from '../App';
import pokemons from '../data';

test('should render pokemon informations', () => {
  const { getByTestId, getAllByRole } = renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
  );
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent(pokemons[0].name);

  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType).toHaveTextContent(pokemons[0].type);

  const { value, measurementUnit } = pokemons[0].averageWeight;
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

  const image = getAllByRole('img')[0];
  expect(image).toHaveAttribute('src', pokemons[0].image);
  expect(image).toHaveAttribute('alt', `${pokemons[0].name} sprite`);
});

test('should render a link to pokemon details', () => {
  const { getByText } = renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
  );
  const link = getByText('More details');
  expect(link).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
});

test('should redirect to pokemon details when click in `More details`', () => {
  const { getByText, container, history } = renderWithRouter(
    // <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    <App />,
  );
  const link = getByText('More details');
  fireEvent.click(link);
  const path = history.location.pathname;
  expect(path).toBe(`/pokemons/${pokemons[0].id}`);

  const pokemonDetailsSection = container.getElementsByClassName('pokemon-details')[0];
  expect(pokemonDetailsSection).toBeInTheDocument();
});

test('should render a start when the pokemon is favorited', () => {
  const { getAllByRole } = renderWithRouter(
    <Pokemon pokemon={ pokemons[0] } isFavorite />,
  );

  const startImage = getAllByRole('img')[1];
  expect(startImage).toHaveAttribute('src', '/star-icon.svg');
  expect(startImage).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
});
