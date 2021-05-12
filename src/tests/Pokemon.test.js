import React from 'react';
import { fireEvent } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testing Pokemon.js', () => {
  test('tests whether a card with pokemon information is rendered', () => {
    const { getByTestId, getByRole } = renderWithRouter(<App />);
    expect(getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(getByTestId('pokemonType')).toHaveTextContent('Electric');
    expect(getByTestId('pokemon-weight')).toHaveTextContent('Average weight: 6.0 kg');
    expect(getByRole('img')).toBeInTheDocument();
    expect(getByRole('img').alt).toBe(`${pokemons[0].name} sprite`);
    expect(getByRole('img').src).toBe(`${pokemons[0].image}`);
  });

  test('tests whether the navigation card has a link to details', () => {
    const { getByText, history } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('tests if the favorite icon appears in the favorite pokemon', () => {
    const { getByText, getByAltText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/More details/));
    fireEvent.click(getByText(/Pokémon favoritado/));
    const image = getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(image).toBeInTheDocument();
    const link = 'http://localhost';
    expect(image.src).toBe(`${link}/star-icon.svg`);
  });
});
