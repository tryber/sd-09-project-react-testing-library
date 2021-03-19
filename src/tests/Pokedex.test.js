import React from 'react';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Teste o componente Pokedex', () => {
  const isPokemonFavoriteById = {
    4: false,
    10: false,
    23: false,
    25: true,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };
  it('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se próximo Pokémon da lista aparece ao clicar no botão', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const btn = screen.getByText(/Próximo pokémon/i);
    let counter = 0;
    pokemons.forEach(() => {
      if (counter === pokemons.length) {
        counter = 0;
      }
      const name = screen.getByText(pokemons[counter].name);
      expect(name).toBeInTheDocument();
      userEvent.click(btn);
      counter += 1;
    });
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const allPokemons = screen.getAllByTestId(/pokemon-name/);
    expect(allPokemons.length).toBe(1);
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const filters = 7;
    const allBtn = screen.getAllByTestId('pokemon-type-button');
    expect(allBtn.length).toBe(filters);

    const btnType = screen.getByRole('button', {
      name: /Fire/,
    });
    expect(btnType).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);

    const next = screen.getByRole('button', {
      name: 'Próximo pokémon',
    });

    pokemons.forEach(() => {
      userEvent.click(next);
    });

    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const btnType = screen.getByRole('button', {
      name: /Fire/,
    });

    userEvent.click(btnType);
    pokemons.forEach(() => {
      userEvent.click(next);
    });
    const pikachu2 = screen.queryByText(/Pikachu/i);
    expect(pikachu2).toBeNull();

    const btnAll = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(btnAll);
    const pikachu3 = screen.getByText(/Pikachu/i);
    expect(pikachu3).toBeInTheDocument();
  });
});
