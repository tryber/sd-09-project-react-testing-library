import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

test('test of the correct information and card is correct', () => {
  const { getByTestId } = renderWithRouter(<App />);

  expect(getByTestId('pokemon-name').innerHTML).toBe('Pikachu');
  expect(getByTestId('pokemonType').innerHTML).toBe('Electric');
  expect(getByTestId('pokemon-weight').innerHTML).toBe('Average weight: 6.0 kg');

  const pokemonImage = document.querySelector('img');
  expect(pokemonImage.alt).toBe('Pikachu sprite');
  expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  expect(pokemonImage).toBeInTheDocument();
});

test('Test if the Pokémon card contains a navigation link details of this Poke', () => {
  const { getByRole, history } = renderWithRouter(<App />);

  const moreDetails = getByRole('link', { name: 'More details' });
  expect(moreDetails).toBeInTheDocument();
  userEvent.click(moreDetails);
  expect(history.location.pathname).toBe('/pokemons/25');
  expect(getByRole('heading', { name: 'Pikachu Details' })).toBeInTheDocument();
});

test('Test if if there is a star icon on favorite Pokémon', () => {
  const { getByRole, getByAltText } = renderWithRouter(<App />);

  const moreDetails = getByRole('link', { name: 'More details' });
  userEvent.click(moreDetails);

  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  userEvent.click(checkbox);

  const favoriteImg = getByAltText('Pikachu is marked as favorite');
  expect(favoriteImg).toBeInTheDocument();
  expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
  expect(favoriteImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
});
