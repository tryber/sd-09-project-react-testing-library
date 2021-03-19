import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Requirement 2: Test the component <FavoritePokemons.js />', () => {
  test('Tests "no favorite Pokémons" situation', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavPoke = getByText(/No favorite pokemon found/i);
    expect(noFavPoke).toBeInTheDocument();
  });

  test('Tests if favorite Pokémons are shown', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const moreDetLink = getByText(/more details/i);
    userEvent.click(moreDetLink);

    const favCheck = getByLabelText(/favoritado/i);
    userEvent.click(favCheck);

    const favLink = getByText(/favorite pok/i);
    userEvent.click(favLink);

    const star = getByAltText(/is marked as favorite/i);
    expect(star).toBeInTheDocument();
  });

  test('Tests if no Pokémons are shown if none are favorite', () => {
    const { getByText, getByLabelText, queryByAltText } = renderWithRouter(<App />);

    const moreDetLinkAgain = getByText(/more details/i);
    userEvent.click(moreDetLinkAgain);

    const favCheckAgain = getByLabelText(/favoritado/i);
    userEvent.click(favCheckAgain);

    const favLinkAgain = getByText(/favorite pok/i);
    userEvent.click(favLinkAgain);

    const star = queryByAltText(/is marked as favorite/i);
    expect(star).not.toBeInTheDocument();
  });
});
