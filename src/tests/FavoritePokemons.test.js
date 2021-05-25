import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWhithRouter from '../components/RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Teste se exibe a mensagem `No favorite pokemon found`, sem pokémons favoritos.',
  () => {
    renderWhithRouter(<FavoritePokemons />);
    const renderTexto = screen.getByText('No favorite pokemon found');
    expect(renderTexto).toBeInTheDocument();
  });

test('Teste se é exibido todos os cards de pokémons favoritados.',
  () => {
    renderWhithRouter(<App />);
    const detailsPokemon = screen.getByText('More details');
    expect(detailsPokemon).toBeInTheDocument();
    fireEvent.click(detailsPokemon);
    const labelForm = screen.getByLabelText('Pokémon favoritado?');
    fireEvent.click(labelForm);
    const linkFavorite = screen.getByText('Favorite Pokémons');
    fireEvent.click(linkFavorite);
    const headingTitulo = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(headingTitulo).toBeInTheDocument();
    const nomePokemon = screen.getByText('Pikachu');
    expect(nomePokemon).toBeInTheDocument();
  });

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.',
  () => {
    const { history } = renderWhithRouter(<FavoritePokemons />);
    history.push('/favorites');
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

    const semPokemonFavorito = screen.getByText('No favorite pokemon found');
    expect(semPokemonFavorito).toBeInTheDocument();
  });
