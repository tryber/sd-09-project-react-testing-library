import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

test('Should render a card with the pokémon information', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByText('Pikachu');
  expect(pokemonName).toBeInTheDocument();

  const pokemonType = screen.getByTestId('pokemonType');
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType).toHaveTextContent(/electric/i);

  const pokemonWeight = screen.getByText(/average weight/i);
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

  const pokemonImage = screen.getByAltText('Pikachu sprite');
  expect(pokemonImage).toBeInTheDocument();
  expect(pokemonImage.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
});

test('Should have a link to the pokémon details', () => {
  renderWithRouter(<App />);

  const detailLink = screen.getByRole('link', { name: /more details/i });
  expect(detailLink).toBeInTheDocument();
});

test('When the details link is click should redirect to the details page', () => {
  const { history } = renderWithRouter(<App />);

  const detailLink = screen.getByRole('link', { name: /more details/i });

  userEvent.click(detailLink);

  const { pathname } = history.location;
  expect(pathname).toBe('/pokemons/25');
});

test('Should appear a star if the pokémon is favorite', () => {
  renderWithRouter(<App />);

  const detailLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailLink);

  const favoriteCheck = screen.getByRole('checkbox', { name: /favoritado/i });
  userEvent.click(favoriteCheck);

  const favoriteImg = screen.getByAltText(/pikachu is marked as favorite/i);
  expect(favoriteImg).toBeInTheDocument();
  expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
});
