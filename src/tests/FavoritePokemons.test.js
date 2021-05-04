import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testando o componente <FavoritePokemons.js />', () => {
  it('Testando a mensagem No favorite pokemon found', () => {
    const { getByText, history } = renderWithRouter(<App />);

    // Clicou no link e verificar se a mensagem existe
    fireEvent.click(getByText(/Favorite Pokémons/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe('/favorites');

    const notFoundMessage = getByText('No favorite pokemon found');
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { getByText, history } = renderWithRouter(<App />);

    // selecionar o pokemon
    const pokemonName = getByText('Pikachu');
    expect(pokemonName).toBeInTheDocument();

    // clicar no link more details
    fireEvent.click(getByText(/More details/i));

    const { location } = history;

    const { pathname } = location;

    expect(pathname).toBe('/pokemons/25');

    // favoritar o pokemon
    const checkboxInput = screen.getByRole('checkbox', {
      name: /Pokémon favoritado?/i,
    });

    userEvent.click(checkboxInput);

    // clicar no link favorite pokemon
    const favoritePokemonLink = getByText('Favorite Pokémons');

    fireEvent.click(favoritePokemonLink);

    // verificar se o pokemon favoritado está na tela
    const favoritePokemon = getByText('Pikachu');
    expect(favoritePokemon).toBeInTheDocument();
  });
});
