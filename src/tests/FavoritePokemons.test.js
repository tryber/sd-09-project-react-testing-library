import React from 'react';
import { fireEvent } from '@testing-library/dom';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from '../services/RenderWithRouter';
import App from '../App';

const pokemon = null;

beforeEach(() => {
  localStorage.clear();
});

describe('Testes do módulo FavoritePokemon', () => {
  it('Testa se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons pokemon={ pokemon } />);
    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  it('Testa se mostra os pokemons favoritos', () => {
    const { getByText, getByRole } = RenderWithRouter(<App />);
    const btnDetails = getByText(/More Details/i);
    fireEvent.click(btnDetails);
    const btnFavorite = getByRole('checkbox');
    fireEvent.click(btnFavorite);
    const btnFavoritePokemons = getByText(/Favorite Pokémons/i);
    fireEvent.click(btnFavoritePokemons);
    const pokemonName = getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Testa se nenhum favorito é mostrado', () => {
    const { getByText } = RenderWithRouter(<App />);
    const btnFavoritePokemons = getByText(/Favorite Pokémons/i);
    fireEvent.click(btnFavoritePokemons);
    const phrase = getByText(/No favorite pokemon found/i);
    expect(phrase).toBeInTheDocument();
  });
});
