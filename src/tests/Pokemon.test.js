import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testando o componente Pokemon.js', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByText, getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );
    const pokemonName = getByText(pokemons[0].name);
    expect(pokemonName).toBeInTheDocument();

    const pokemonType = getByText(pokemons[0].type);
    expect(pokemonType).toBeInTheDocument();

    const pokemonWeight = getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();

    const pokemonImage = getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImage).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Teste o card do Pokémon tem um link de navegação para exibir detalhes.', () => {
    const { history, getByText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite={ false } />,
    );

    const moreDetailsPoke = getByText('More details');
    fireEvent.click(moreDetailsPoke);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={ pokemons[0] } isFavorite />,

    );
    const btnIcon = getByAltText('Pikachu is marked as favorite');
    expect(btnIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(btnIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
