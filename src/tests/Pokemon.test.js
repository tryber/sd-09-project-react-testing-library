import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('renders a card with Pokémons info', () => {
  renderWithRouter(<App />);

  const pokemonName = screen.getByTestId('pokemon-name');
  const pokemonType = screen.getByTestId('pokemonType');
  const pokemonWeight = screen.getByTestId('pokemon-weight');
  const pokemonImage = screen.getByAltText('Pikachu sprite');

  expect(pokemonName).toHaveTextContent('Pikachu');
  expect(pokemonType).toHaveTextContent('Electric');
  expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
  expect(pokemonImage.src).toBe(
    'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  );
});

test('has a link to show more info about a Pokémon', () => {
  renderWithRouter(<App />);
  const linkMoreDetails = screen.getByText('More details');

  expect(linkMoreDetails).toBeInTheDocument();
});

test('test if when click on the Pokémon navigation link, URL changes', () => {
  const { history } = renderWithRouter(<App />);
  const linkMoreDetails = screen.getByText('More details');

  expect(linkMoreDetails).toBeInTheDocument();

  userEvent.click(linkMoreDetails);
  const linkSumary = screen.getByText(/Summary/i);
  expect(linkSumary).toBeInTheDocument();

  const { location } = history;
  const { pathname } = location;
  expect(pathname).toBe('/pokemons/25');
});

test('shows a star icon when a Pokémon is favorited', () => {
  renderWithRouter(<App />);
  const linkMoreDetails = screen.getByText(/More details/i);

  userEvent.click(linkMoreDetails);
  userEvent.click(screen.getByLabelText(/Pokémon favoritado/i));
  const pokemonImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
  expect(pokemonImg.src).toBe('http://localhost/star-icon.svg');
});
