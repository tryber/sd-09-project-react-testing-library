import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste o componente FavoritePokemons.js', () => {
  it('Testa se é exibido "No favorite pokemon found", se  não tiver favoritos', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const details = getByText('More details');
    userEvent.click(details);
    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
    const favoriteButton = getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteButton);
    const favorites = getByText('Favorite Pokémons');
    userEvent.click(favorites);
    const pikachu = getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const noFavorite = queryByText('Average weight');
    expect(noFavorite).toBeNull();
  });
});
