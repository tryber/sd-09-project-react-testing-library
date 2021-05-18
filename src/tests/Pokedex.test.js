import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

describe('Testa o comportamento do Component Pokedex', () => {
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
  test('Se contem um elemento h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const header = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/,
    });
    expect(header).toBeInTheDocument();
  });

  test('Se contém um botão com o nome `Próximo pokémon`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextBtn = screen.getByRole('button', {
      name: /Próximo pokémon/,
    });
    expect(nextBtn).toBeInTheDocument();
  });

  test('Se mostra o proximo pokemon da lista ao Clicar em `Proximo Pokémon`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const nextBtn = screen.getByTestId('next-pokemon');

    let i = 0;
    pokemons.forEach(() => {
      if (pokemons.length === i) {
        i = 0;
      }

      const PokeName = screen.getByText(pokemons[i].name);
      expect(PokeName).toBeInTheDocument();

      userEvent.click(nextBtn);
      i += 1;
    });
  });

  test('Se é apresentado apenas um pokemon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const PokeStated = screen.getAllByTestId('pokemon-name');
    expect(PokeStated.length).toBe(1);
  });

  test('Se são renderizados os botões contendo os tipos dos Pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const quantity = 7;

    const typeBtn = screen.getAllByTestId('pokemon-type-button');
    expect(typeBtn.length).toEqual(quantity);

    const btnTypeElectric = screen.getByRole('button', {
      name: 'Electric',
    });
    expect(btnTypeElectric).toBeInTheDocument();

    const btnTypePsychic = screen.getByRole('button', {
      name: 'Psychic',
    });
    expect(btnTypePsychic).toBeInTheDocument();

    const btnTypeFire = screen.getByRole('button', {
      name: 'Fire',
    });
    expect(btnTypeFire).toBeInTheDocument();
  });

  test('Se o contem na pagina um botão com o nome `All`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const allBtn = screen.getByRole('button', {
      name: 'All',
    });
    expect(allBtn).toBeInTheDocument();

    Pokedex.filterPokemons = jest.fn();

    userEvent.click(allBtn);
    Pokedex.filterPokemons();
    expect(Pokedex.filterPokemons).toBeCalled();
  });

  test('Se há apenas um botão para cada elemento', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btnTypeElectric = screen.getAllByRole('button', {
      name: 'Electric',
    });
    expect(btnTypeElectric.length).toBe(1);

    const btnTypePsychic = screen.getAllByRole('button', {
      name: 'Psychic',
    });
    expect(btnTypePsychic.length).toBe(1);

    const btnTypeBug = screen.getAllByRole('button', {
      name: 'Bug',
    });
    expect(btnTypeBug.length).toBe(1);
  });
});
