import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Test the FavoritePokemons.js component', () => {
  test('no favorite pokemon found message is displayed', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  test('all favorite Pokémon cards are displayed', () => {
    const { getAllByRole, getByRole } = renderWithRouter(<App />);
    const linkMoreDetails = getByRole('link', { name: /More details/i });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const checkFav = getByRole('checkbox');
    expect(checkFav).toBeInTheDocument();
    userEvent.click(checkFav);
    const homeLink = getByRole('link', { name: /Home/i });
    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    const nextPokemon = getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemon).toBeInTheDocument();
    userEvent.click(nextPokemon);
    userEvent.click(linkMoreDetails);
    userEvent.click(checkFav);
    const favLink = getByRole('link', { name: /Favorite Pokémons/i });
    userEvent.click(favLink);
    const qntFav = getAllByRole('img');
    expect(qntFav.length).toEqual(2);
  });
});
