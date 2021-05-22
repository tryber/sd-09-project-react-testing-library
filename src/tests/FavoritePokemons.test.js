import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../components/RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste para o componente <FavoritePokemons', () => {
  it('Verifica se a mensagem `No favorite pokemon found`', () => {
    renderWithRouter(<FavoritePokemons />);

    const favorite = screen.getByText(/No favorite pokemon found/i);

    expect(favorite).toBeInTheDocument();
  });
});
