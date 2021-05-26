import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import data from '../data';

test('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
  const { getByTestId, getByAltText } = renderWithRouter(<App />);
  const { name, image } = data[0];
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
  const pokemonType = getByTestId('pokemonType');
  expect(pokemonType).toHaveTextContent('Electric');
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  const img = getByAltText(`${name} sprite`);
  expect(img.src).toBe(image);
});

test('Teste se o card do Pokémon indicado na Pokédex contém um link', () => {
  const { getByText } = renderWithRouter(<App />);
  const link = getByText(/details/i);
  expect(link).toHaveAttribute('href', '/pokemons/25');
});

test('Teste se ao clicar no link é redirecionado', () => {
  const { getByText, history } = renderWithRouter(<App />);
  const link = getByText('More details');
  fireEvent.click(link);
  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
  const { getByText, getByRole, getAllByRole } = renderWithRouter(<App />);
  fireEvent.click(getByText('More details'));
  fireEvent.click(getByRole('checkbox'));
  const star = getAllByRole('img');
  expect(star[1].src).toBe('http://localhost/star-icon.svg');
  expect(star[1]).toHaveAttribute('alt', `${data[0].name} is marked as favorite`);
});
