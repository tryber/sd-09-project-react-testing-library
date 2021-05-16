import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import APP from '../App';

describe('testa o component pokemon', () => {
  it('testa se o nome do pokemon esta na tela', () => {
    const { getByText } = renderWithRouter(<APP />);
    const namePokemon = getByText(/pikachu/i);
    expect(namePokemon).toBeInTheDocument();
  });
  it('testa o tipo correto do pokemon', () => {
    const { getByTestId } = renderWithRouter(<APP />);
    const typePokemon = getByTestId('pokemon-type');
    expect(typePokemon).toHaveTextContent('Electric');
  });
  it('testa o peso médio do pokemon', () => {
    const { getByText } = renderWithRouter(<APP />);
    const pesoPokemon = getByText(/average weight: 6\.0 kg/i);
    expect(pesoPokemon).toBeInTheDocument();
  });
  it('testa se aparece a imagem do pokemon', () => {
    const { getByRole } = renderWithRouter(<APP />);
    const imgPokemon = getByRole('img', { name: /pikachu sprite/i });
    expect(imgPokemon.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('testa Teste se contém um link de navegação para exibir detalhes do Pokémon', () => {
    const { getByRole, history } = renderWithRouter(<APP />);
    const linkPokemon = getByRole('link', { name: /more details/i });
    expect(linkPokemon).toBeInTheDocument();
    fireEvent.click(linkPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  it('testa se tem estrela nos pokemons favoritados', () => {
    const { getByRole, history } = renderWithRouter(<APP />);
    const linkPokemon = getByRole('link', { name: /more details/i });
    expect(linkPokemon).toBeInTheDocument();
    fireEvent.click(linkPokemon);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = getByRole('checkbox');
    fireEvent.click(favorite);
    const favoritePokemon = getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favoritePokemon.src).toMatch('/star-icon.svg');
  });
});
