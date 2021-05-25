import React from 'react';
import { cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('Testando o componente <FavoritePokemons.js />', () => {
  it('Verifica se a página mostra a mensagem "No favorite pokemon found"', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const text = getByText(/found/i);

    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent('No favorite pokemon found');
  });

  it('Verifica se a página mostra todos os Pokémons favoritados', () => {
    const { getAllByRole, getByText } = renderWithRouter(<App />);

    // Verificando links da Home e selecionando o 'More Detail'
    const homeLinks = getAllByRole('link');
    userEvent.click(homeLinks[3]);

    // Clicando na opção "Pokémon favoritado?"
    const pokemonFavorite = getByText('Pokémon favoritado?');
    userEvent.click(pokemonFavorite);

    // Clicando no link "/favorites"
    const pokemonLinks = getAllByRole('link');
    userEvent.click(pokemonLinks[2]);

    // Listando links da "Favorite Pokémons"
    const favoriteLinks = getAllByRole('link');

    expect(favoriteLinks[3]).toBeInTheDocument();
    expect(favoriteLinks[3]).toHaveTextContent('More details');
  });

  it('Verifica se nenhum card de pokémon é exibido, '
  + 'se ele não estiver favoritado', () => {
    const { getAllByRole, getByRole, queryByTestId, history } = renderWithRouter(<App />);

    const homeLinks = getAllByRole('link');
    userEvent.click(homeLinks[3]);

    // Tirando a opção de Favorito
    const pokemonFavorite = getByRole('checkbox', { checked: true });
    if (pokemonFavorite) {
      userEvent.click(pokemonFavorite);
    }

    // Redirecionando para a Página de Pokemons Favoritos
    history.push('/favorites');

    const namePokemon = queryByTestId('pokemon-name');
    expect(namePokemon).not.toBeInTheDocument();
  });
});
