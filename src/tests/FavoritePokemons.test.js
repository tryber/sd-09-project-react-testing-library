import React from 'react';
import { fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('requisito 3, testa FavoritePokemons', () => {
  it('exibido No favorite pokemon found, se a pessoa não tem pokémons favoritos.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const info = getByText('No favorite pokemon found');
    expect(info).toBeInTheDocument();
  });

  it('Testa se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    expect(queryByText(/Pikachu/i)).toBeNull();
  });
});
