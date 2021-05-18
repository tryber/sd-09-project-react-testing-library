import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o comportamento do componente Pokemon', () => {
  const pokeInfo = pokemons[0];

  test('Se apresenta o nome correto do Pokémon na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite={ false }
    />);

    const pokeName = screen.getByTestId('pokemon-name');

    expect(pokeName.textContent).toBe('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });

  test('Se apresenta o tipo do Pokémon na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite={ false }
    />);

    const pokeType = screen.getByTestId('pokemonType');

    expect(pokeType.textContent).toBe('Electric');
    expect(pokeType).toBeInTheDocument();
  });

  test('Se apresenta o peso por Kg do Pokémon na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite={ false }
    />);
    const { value, measurementUnit } = pokeInfo.averageWeight;

    const pokeWeight = screen.getByTestId('pokemon-weight', {
      name: `Average weight: ${value} ${measurementUnit}`,
    });

    expect(pokeWeight).toBeInTheDocument();
    expect(pokeWeight.textContent).toEqual('Average weight: 6.0 kg');
  });

  test('Se apresenta a imagem e a info da imagem do Pokémon na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite={ false }
    />);

    const pokeImg = screen.getByRole('img');

    expect(pokeImg.src).toBe('https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokeImg.alt).toBe(`${pokeInfo.name} sprite`);
  });

  test('Se possui na tela um Link de navegação para exibir detalhes do pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite={ false }
    />);

    const pokeLink = screen.getByRole('link', {
      to: `pokemons/${pokeInfo.id}`,
    });

    expect(pokeLink).toBeInTheDocument();
  });

  test('Se ao clicar no Link de detalhes, redireciona para PokemonDetails', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite
    />);

    const pokeLink = screen.getByRole('link', {
      to: `pokemons/${pokeInfo.id}`,
    });

    userEvent.click(pokeLink);
    const pokeUrl = history.location.pathname;
    expect(pokeUrl).toBe('/pokemons/25');
  });

  test('Se existe um icone de estrela nos pokémons favoritados', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokeInfo }
      isFavorite
    />);

    const favoritePoke = screen.getAllByRole('img')
      .find((img) => img.alt === 'Pikachu is marked as favorite');

    expect(favoritePoke).toBeInTheDocument();
    expect(favoritePoke.src).toBe('http://localhost/star-icon.svg');
  });
});
