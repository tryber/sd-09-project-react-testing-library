import { fireEvent } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('testa o component FavoritePokemons.js', () => {
  test('testa se uma determinada mensagem é exibida na tela', () => {
    const { getByText, getByRole, history } = renderWithRouter(<App />);
    const favPokemons = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favPokemons);
    expect(history.location.pathname).toBe('/favorites');
    const message = getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('testa se todos os cards são exibidos', () => {
    const { getByRole, getByText, history } = renderWithRouter(<App />);
    const moreDetails = getByRole('link', { name: 'More details' });
    fireEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
    const pokeSelection = getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(pokeSelection).not.toBeChecked();
    fireEvent.click(pokeSelection);
    expect(pokeSelection).toBeChecked();
    const favoritePoke = getByRole('link', { name: 'Favorite Pokémons' });
    fireEvent.click(favoritePoke);
    expect(history.location.pathname).toBe('/favorites');
    const pokeName = getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });
});
