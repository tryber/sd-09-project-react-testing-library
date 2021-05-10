import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Teste do componente Pokémon', () => {
  it('Teste se é renderizado o card do pokemon com suas informações', () => {
    renderWithRouter(<App />);
    const imgPokemon = screen.getByAltText('Pikachu sprite');

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');

    expect(screen.getByTestId('pokemonType')).toBeInTheDocument();
    expect(screen.getByTestId('pokemonType')).toHaveTextContent('Electric');

    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');

    expect(imgPokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imgPokemon.alt).toBe('Pikachu sprite');
  });

  it('Teste se o card tem um link de navegação correto', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByText('More details');
    userEvent.click(link);

    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Teste se há um ícone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<App />);
    const link = screen.getByText('More details');
    // const regex = new RegExp('star-icon.svg', 'i');
    userEvent.click(link);
    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    userEvent.click(screen.getAllByRole('link')[0]);
    const imgStar = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgStar).toBeInTheDocument();
    expect(imgStar.src).toContain('star-icon.svg');
  });
});
