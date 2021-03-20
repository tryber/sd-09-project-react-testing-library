import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Testando o componente <FavoritePokemons.js />', () => {
  test(`Testa se é exibido na tela a mensagem No favorite pokemon found,
  se a pessoa não tiver pokémons favoritos.`, () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const favoriteFoundCheck = getByText(/No favorite pokemon found/i);
    expect(favoriteFoundCheck).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByLabelText, getByAltText } = renderWithRouter(<App />);

    const detailsLink = getByText(/more details/i);
    userEvent.click(detailsLink);

    const favoritePokemonCheck = getByLabelText(/favoritado/i);
    userEvent.click(favoritePokemonCheck);

    const favoritePokemonLink = getByText(/favorite pok/i);
    userEvent.click(favoritePokemonLink);

    const favoriteMark = getByAltText(/is marked as favorite/i);
    expect(favoriteMark).toBeInTheDocument();
  });

  test('Testa se nenhum card de pokémon é exibido, se ele não estiver favoritado', () => {
    const { getByText, getByLabelText, queryByAltText } = renderWithRouter(<App />);

    const moreDetLinkAgain = getByText(/more details/i);
    userEvent.click(moreDetLinkAgain);

    const favoritePokemonCheck = getByLabelText(/favoritado/i);
    userEvent.click(favoritePokemonCheck);

    const favoritePokemonLink = getByText(/favorite pok/i);
    userEvent.click(favoritePokemonLink);

    const favoriteMark = queryByAltText(/is marked as favorite/i);
    expect(favoriteMark).not.toBeInTheDocument();
  });
});
