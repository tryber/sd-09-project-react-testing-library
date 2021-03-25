import React from 'react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Testa componente Pokemons.js', () => {
  const isTrue = true;
  it('Testa se é renderizado um card do pokemon', () => {
    const pikachu = pokemons[0];
    const { getByTestId, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ isTrue } />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.textContent).toBe('Pikachu');
    const pokeType = getByTestId('pokemonType');
    expect(pokeType.textContent).toBe('Electric');
    const pokeWeight = getByTestId('pokemon-weight');
    expect(pokeWeight.textContent).toBe('Average weight: 6.0 kg');
    const pokeImg = getByAltText('Pikachu sprite');
    expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe('Pikachu sprite');
  });
  it('Testa se o link de navegação para os detalhes está correto', () => {
    const pikachu = pokemons[0];
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ isTrue } />,
    );
    const linkToDetails = getByText('More details');
    expect(linkToDetails).toBeInTheDocument();
    expect(linkToDetails.href).toBe(`http://localhost/pokemons/${pikachu.id}`);
  });
  it('Testa se existe um ícone de estrela no Pokemon favoritado', () => {
    const pikachu = pokemons[0];
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pikachu } isFavorite={ isTrue } />,
    );
    const favorited = getByAltText('Pikachu is marked as favorite');
    expect(favorited).toBeInTheDocument();
    expect(favorited.src).toBe('http://localhost/star-icon.svg');
  });
});
