import { render, screen } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';

describe('testing Favorite Pokemons', () => {
  it('should apears No favorite pokemon found', () => {
    render(<FavoritePokemons />);

    const noFavorite = screen.getByText('No favorite pokemon found');

    expect(noFavorite.innerHTML).toBe('No favorite pokemon found');
  });

  it('shoud have one favorite pokémon', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const moreDetailsButton = screen.getByText('More details');
    userEvent.click(moreDetailsButton);
    const favoritePokemon = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoritePokemon);

    expect(favoritePokemon.checked).toBe(true);
  });
});
