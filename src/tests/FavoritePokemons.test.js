import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>), history,
  });
};

describe('testando aquivo FavoritePokémons', () => {
  it('Verifica se exibe na tela mensagem de nenhum pokemon favorito encontrado', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const notFound = getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  it('Verifica se são exibidos os cards de pokemons favoritos', () => {
    const { getByText, queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ [pokemons[0]] } />,
    );
    const pikachu = getByText(/Pikachu/i);
    const charmander = queryByText(/Charmander/i);
    expect(pikachu).toBeInTheDocument();
    expect(charmander).not.toBeInTheDocument();
  });

  it('Verifica se somente os pokemons favoritos são exibidos', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const charmander = queryByText(/Charmander/i);
    expect(charmander).not.toBeInTheDocument();
  });
});
