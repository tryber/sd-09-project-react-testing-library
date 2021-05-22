import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o component Pokemon', () => {
  it('card com info de pokemon', () => {
    renderWithRouter(<App />);
    const pokName = screen.getByTestId('pokemon-name');
    expect(pokName).toHaveTextContent(/pikachu/i);
    const pokType = screen.getByTestId('pokemonType');
    expect(pokType).toHaveTextContent(/electric/i);
    const pokWeight = screen.getByTestId('pokemon-weight');
    expect(pokWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokImg = screen.getByRole('img');
    expect(pokImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokImg.alt).toBe('Pikachu sprite');
  });

  it('URL correto do pokemon', () => {
    const { history } = renderWithRouter(<App />);
    const mrDetails = screen.queryByText('More details');
    userEvent.click(mrDetails);
    const pathName = history.location.pathname;
    expect(pathName).toBe('/pokemons/25');
    const pokName = screen.getByTestId('pokemon-name');
    expect(pokName).toHaveTextContent(/pikachu/i);
    const pokType = screen.getByTestId('pokemonType');
    expect(pokType).toHaveTextContent(/electric/i);
    const pokWeight = screen.getByTestId('pokemon-weight');
    expect(pokWeight).toHaveTextContent('Average weight: 6.0 kg');
  });

  it('Icone de estrela no pok favoritado', () => {
    renderWithRouter(<App />);
    const mrDetails = screen.queryByText('More details');
    userEvent.click(mrDetails);
    const pokFav = screen.getByText('Pokémon favoritado?');
    userEvent.click(pokFav);
    const favoriteImg = screen.getAllByRole('img');
    expect(favoriteImg[1].src).toContain('/star-icon.svg');
    expect(favoriteImg[1].alt).toBe('Pikachu is marked as favorite');
  });
});
