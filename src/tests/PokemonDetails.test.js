import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

test('The pokémon details should appear', () => {
  renderWithRouter(<App />);

  const detailLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailLink);

  const pokemonDetailsText = screen.getByRole('heading', {
    level: 2, name: /pikachu details/i,
  });
  expect(pokemonDetailsText).toBeInTheDocument();
  expect(detailLink).not.toBeInTheDocument();

  const summaryHeading = screen.getByRole('heading', {
    level: 2, name: /summary/i,
  });
  expect(summaryHeading).toBeInTheDocument();

  const summaryText = screen.getByText(/this intelligent pokémon/i);
  expect(summaryText).toBeInTheDocument();
});

test('Should display a section with maps of the pokémon location', () => {
  renderWithRouter(<App />);

  const detailLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailLink);

  const locationHeading = screen.getByRole('heading', {
    level: 2, name: /game locations of pikachu/i,
  });
  expect(locationHeading).toBeInTheDocument();

  const locationImg = screen.getAllByAltText(/pikachu location/i);
  locationImg.forEach((img) => {
    expect(img).toBeInTheDocument();
  });
  expect(locationImg[0].src).toBe('https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(locationImg[1].src).toBe('https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Should be possible to favorite a pokémon from the details page', () => {
  renderWithRouter(<App />);

  const detailLink = screen.getByRole('link', { name: /more details/i });
  userEvent.click(detailLink);

  const favoriteCheck = screen.getByRole('checkbox', { name: /favoritado/i });
  expect(favoriteCheck).toBeInTheDocument();

  userEvent.click(favoriteCheck);
  const favoriteImg = screen.getByAltText(/pikachu is marked as favorite/i);
  expect(favoriteImg).toBeInTheDocument();

  userEvent.click(favoriteCheck);
  expect(favoriteImg).not.toBeInTheDocument();
});
