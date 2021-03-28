import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../renderWithRouter';

describe('Testando componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const menssage = getByText('No favorite pokemon found');
    expect(menssage).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText(/Pikachu/i)).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    expect(queryByText(/Pikachu/i)).toBe(null);
  });
});
