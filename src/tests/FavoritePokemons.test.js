import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Teste do componente FavoritePokemons', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found", inicial', () => {
    renderWithRouter(<FavoritePokemons />);
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText('More details');
    userEvent.click(linkDetails);
    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxFavorite);
    userEvent.click(screen.getByText('Favorite Pokémons'));
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });

  it('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText('More details');
    userEvent.click(linkDetails);
    const checkboxFavorite = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxFavorite);
    userEvent.click(screen.getByText('Favorite Pokémons'));
    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
