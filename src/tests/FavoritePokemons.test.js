import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

// necessário inciar de APP para renderizar "FavoritePokemons"; onde App busca a
// lista dos pokemons favoritados anteriormente sendo passado via props para "FavoritePokemons"
// Para não causar falsos positivos;

describe('Testes na pagina About', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<App />);
    userEvent.click(getByText(/Favorite Pokémons/i));
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    userEvent.click(getByText(/Home/i));
    userEvent.click(getByText(/More details/i));
    userEvent.click(getByText(/Pokémon favoritado/i));
    userEvent.click(getByText(/Home/i));
    userEvent.click(getByText(/Fire/i));
    userEvent.click(getByText(/More details/i));
    userEvent.click(getByText(/Pokémon favoritado/i));
    userEvent.click(getByText(/Favorite Pokémons/i));

    const elementWithFavPokemons = getAllByTestId('pokemon-name');
    expect(elementWithFavPokemons.length).toBe(2);
  });
});
