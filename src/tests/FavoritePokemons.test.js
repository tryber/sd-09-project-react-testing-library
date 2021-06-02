import React from 'react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../services/RenderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testa o componente <FavoritePokemons.js /', () => {
  test('Testa se é exibido na tela a mensagem No favorite pokemon found', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    const p = getByText(/No favorite pokemon found/i);
    expect(p).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByAltText } = RenderWithRouter(<App />);
    const btnAll = getByText(/All/i);
    userEvent.click(btnAll);
    const moreDetails = getByText(/More details/i);
    userEvent.click(moreDetails);
    const checkFavorite = getByText(/Pokémon favoritado?/i);
    userEvent.click(checkFavorite);
    const marked = getByAltText(/Pikachu is marked as favorite/i);
    expect(marked).toBeInTheDocument();
    const btnHome = getByText(/Home/i);
    userEvent.click(btnHome);
    const btnDragon = getByText(/Dragon/i);
    userEvent.click(btnDragon);
    const moreDetails2 = getByText(/More details/i);
    userEvent.click(moreDetails2);
    const checkFavorite2 = getByText(/Pokémon favoritado?/i);
    userEvent.click(checkFavorite2);
    const marked2 = getByAltText(/Dragonair is marked as favorite/i);
    expect(marked2).toBeInTheDocument();
    const btnfavoritePokemons = getByText(/Favorite Pokémons/i);
    userEvent.click(btnfavoritePokemons);
    const pikachu = getByText(/Pikachu/i);
    const dragon = getByText(/Dragonair/i);
    [pikachu, dragon].forEach((pokemon) => expect(pokemon).toBeInTheDocument());
  });

  test('Testa se nenhum card é exibido, caso não tenha nenhum favoritado.', () => {
    const { getByText } = RenderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
