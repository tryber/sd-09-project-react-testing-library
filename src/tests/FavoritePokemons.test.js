import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Componente FavoritePokemons.js', () => {
  it('Verifica se é exibido o texto quando não tiver pokemon favorito',
    () => {
    // acessa o elemento
      renderWithRouter(<FavoritePokemons />);
      const textNotFav = screen.getByText('No favorite pokemon found');
      // faça o teste
      expect(textNotFav).toBeInTheDocument();
    });

  it('Verifica se é exibido todos os cards de pokémons favoritados',
    () => {
      // acessa o elemento
      const pokemonData = {
        pokemName: 'Pikachu',
        pokemType: 'Electric',
        pokeWeight: 'Average weight: 6.0 kg',
      };
      const { getByText, getByLabelText } = renderWithRouter(<App />);
      const moreDetailsLink = getByText('More details');
      expect(moreDetailsLink).toBeInTheDocument();
      fireEvent.click(moreDetailsLink);
      const pokekonfav = getByLabelText('Pokémon favoritado?');
      fireEvent.click(pokekonfav);
      expect(pokekonfav).toBeChecked(); // O que espera ao clicar
      fireEvent.click(getByText(/Favorite Pokémons/));
      expect(screen.getByTestId('pokemon-name').textContent).toBe(pokemonData.pokemName);
      // O que espera ao clicar
    });
  // Consultei o repositório da colega Pamela Sales para conseguir fazer e abstrair este teste
  it('Verifica se nenhum card de pokémon é exibido, se ele não estiver favoritado',
    () => {
      // acessa o elemento
      renderWithRouter(<FavoritePokemons />);
      const notFavoriPoke = screen.queryByText('Average weight');
      expect(notFavoriPoke).toBeNull();

      // faça o teste
    });
});
