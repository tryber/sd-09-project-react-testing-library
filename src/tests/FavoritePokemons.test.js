import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

describe('testes para requito 3', () => {
  test('Verificar se contem `No favorite pokemon found`', () => {
    const { getByText } = render(<FavoritePokemons />);
    const mensagem = getByText(/^No favorite pokemon found$/);
    expect(mensagem).toBeInTheDocument();
  });

  test('Verificar se renderiza favoritos', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    fireEvent.click(getByText(/^More details$/));
    expect(getByText(/^Pikachu$/)).toBeInTheDocument(null);
    fireEvent.click(getByLabelText(/Pokémon favoritado/i));
    fireEvent.click(getByText(/^Favorite Pokémons$/));
    expect(getByText(/^Pikachu$/)).toBeInTheDocument();
    fireEvent.click(getByText(/^Home$/));
    fireEvent.click(getByText(/^Próximo pokémon$/));
    fireEvent.click(getByText(/^More details$/));
    userEvent.click(getByLabelText(/Pokémon favoritado/i));
    fireEvent.click(getByText(/^Favorite Pokémons$/));
    expect(getByText(/^Pikachu$/)).toBeInTheDocument();
    expect(getByText(/^Charmander$/)).toBeInTheDocument();
  });
});
