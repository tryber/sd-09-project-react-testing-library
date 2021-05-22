import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Teste component FavoritePokemons', () => {
  it('mensagem é exibida na tela', () => {
    renderWithRouter(<FavoritePokemons />);
    const noFav = screen.getByText('No favorite pokemon found');
    expect(noFav).toBeInTheDocument();
  });

  it('todos os favoritos são exibidos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    pokemons.forEach((poke) => {
      const nome = screen.getByText(poke.name);
      expect(nome).toBeInTheDocument();
    });
  });

  it('Apenas os favoritos são exibidos', () => {
    const poke = [...pokemons];
    const pokeRemovido = poke.pop();
    renderWithRouter(<FavoritePokemons pokemons={ poke } />);
    const removido = screen.queryByText(pokeRemovido.name);
    expect(removido).toBeNull();
  });
});
