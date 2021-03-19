import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import data from '../data';

describe('Testa o component Pokedex', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  const listLength = data.length;
  const nameId = 'pokemon-name';

  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const text = getByText(/Encountered pokémons/i);
    expect(text).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon quando o botão é clicado', () => {
    const { queryByText, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextButton = queryByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    const firstPokemon = getByTestId(nameId).innerHTML;

    for (let index = 0; index < listLength; index += 1) {
      const prevPokemon = getByTestId(nameId).innerHTML;
      fireEvent.click(nextButton);
      const currentPokemon = getByTestId(nameId).innerHTML;
      expect(prevPokemon).not.toBe(currentPokemon);
    }
    expect(getByTestId(nameId).innerHTML).toBe(firstPokemon);
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    const { queryAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const renderedPokemon = queryAllByTestId(nameId);
    expect(renderedPokemon.length).toBe(1);
  });

  test('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const dragonButton = getByRole('button', {
      name: (/Dragon/i),
    });
    fireEvent.click(dragonButton);
    console.log(dragonButton.innerHTML);
    const renderedPokemonType = getByTestId('pokemonType');
    expect(renderedPokemonType).toHaveTextContent(dragonButton.innerHTML);
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const { queryByText, getByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextButton = queryByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    const allButton = queryByText('All');
    expect(allButton).toBeInTheDocument();

    fireEvent.click(allButton);

    for (let index = 0; index < listLength; index += 1) {
      fireEvent.click(nextButton);
    }

    expect(getByTestId(nameId).innerHTML).toBe('Pikachu');
  });

  test('Testa se é criado, dinamicamente, um botão de filtro para cada tipo', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const types = data
      .reduce((acc, { type }) => (acc.includes(type) ? acc : [...acc, type]), []);

    const typesButtons = getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(typesButtons.length);
  });

  test('O botão de Próximo deve ser desabilitado quando tiver um só pokémon.', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextButton = getByRole('button', {
      name: (/Próximo pokémon/i),
    });
    expect(nextButton).toBeInTheDocument();
    const dragonButton = getByRole('button', {
      name: (/Dragon/i),
    });
    expect(dragonButton).toBeInTheDocument();

    fireEvent.click(dragonButton);

    expect(nextButton).toBeDisabled();
  });
});
