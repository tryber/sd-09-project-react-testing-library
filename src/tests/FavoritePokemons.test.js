import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Bloco de testes para o componente FavoritePokemons.js', () => {
  it('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    const { getByText } = render(<FavoritePokemons />);
    const noFavoriteMensage = getByText('No favorite pokemon found');

    expect(noFavoriteMensage.textContent).toBe('No favorite pokemon found');
  });

  it('Testa se é exibido todos os cards de Pókemons favoritados', () => {
    const { getByText, getByRole, getByAltText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );
    const homeLink = getByText('Home');
    fireEvent.click(homeLink);
    const moreDetails = getByText('More details');
    fireEvent.click(moreDetails);
    const favoriteCheckBox = getByRole('checkbox');
    fireEvent.click(favoriteCheckBox);
    const favoritePokemonsLink = getByText('Favorite Pokémons');
    fireEvent.click(favoritePokemonsLink);
    const favoritePokemons = getByAltText('Pikachu sprite');
    expect(favoritePokemons).toBeInTheDocument();
  });
});
