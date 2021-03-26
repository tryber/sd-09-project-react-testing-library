import React from 'react';
import userEvent from '@testing-library/user-event';
import { cleanup, render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

afterEach(cleanup);

// arquivo App.test.js pode servir de exemplo
describe('Teste o COmpomente FavoritePokemons', () => {
  it('Se aparece No favorite pokemon found, se não tiver pokémons favoritos', () => {
    const { getByText } = render(<FavoritePokemons />);
    const textFavorite = getByText(/No favorite pokemon found/i);
    expect(textFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, getByLabelText } = renderWithRouter(<App />);
    const linkMDetails = getByText(/More Details/i);
    userEvent.click(linkMDetails);
    const linkFavoriteCheck = getByLabelText(/Pokémon favoritado?/i);
    userEvent.click(linkFavoriteCheck);
    const linkFavorite = getByText(/Favorite Pokémon/i);
    userEvent.click(linkFavorite);
    const Pikachu = getByText(/Pikachu/i);
    expect(Pikachu).toBeInTheDocument();
  });
});
