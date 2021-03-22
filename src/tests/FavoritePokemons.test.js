import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

test('Mensagem `No favorite pokemon found` se não houver pokemons favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText(/no favorite pokemon found/i)).toBeInTheDocument();
});

test('Teste se nenhum card de pokémon é exibido, se ele não estiver favoritado.',
  () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const linkDetails = getByText(/more details/i);
    fireEvent.click(linkDetails);
    const favoriteLabel = getByLabelText('Pokémon favoritado?');
    fireEvent.click(favoriteLabel);
    fireEvent.click(getByText('Home'));
    fireEvent.click(getByText('More details'));
    fireEvent.click(getByLabelText('Pokémon favoritado?'));
    fireEvent.click(getByText('Favorite Pokémons'));
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

test('Verifica se exibe os cards de pokemons favoritos', () => {
  const { getByText, getByLabelText, getByTestId } = renderWithRouter(<App />);
  const linkDetails = getByText('More details');
  fireEvent.click(linkDetails);
  const favoriteLabel = getByLabelText(/pokémon favoritado/i);
  fireEvent.click(favoriteLabel);
  fireEvent.click(getByText(/favorite pokémons/i));
  const pokemonName = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  expect(pokemonName).toBeInTheDocument();
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonWeight).toBeInTheDocument();
});
