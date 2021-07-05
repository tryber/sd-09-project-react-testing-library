import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('tests the component FavoritePokemons.js', () => {
  beforeEach(() => localStorage.clear());
  it('shows a message on the screen if there is no favorited pokémons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const message = getByText(/No favorite pokemon found/i);

    expect(message).toBeInTheDocument();
  });

  it('must show all cards of favored pokémons', () => {
    const { getAllByRole, getByTestId, getByLabelText } = renderWithRouter(<App />);

    const links = getAllByRole('link');
    const buttons = getAllByRole('button');
    userEvent.click(buttons[8]);
    userEvent.click(links[3]);

    const favoriteIcon = getByLabelText(/Pokémon favoritado/);
    userEvent.click(favoriteIcon);

    userEvent.click(links[2]);

    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
  });

  it('must not show any cards of non-favored pokémons', () => {
    const { getAllByRole, queryByRole, history } = renderWithRouter(<App />);

    const links = getAllByRole('link');
    userEvent.click(links[2]);

    const { pathname } = history.location;
    const img = queryByRole('img');

    expect(pathname).toBe('/favorites');
    expect(img).toBeNull();
  });
});
