import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Requisito 05 - Pokedex.js', () => {
  it('Testa se há um heading <h2> "Encountered pokémons".', () => {
    const { getByRole } = renderWithRouter(<App />);

    const h2Text = getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });

    expect(h2Text).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon quando clicado "Próximo pokémon".', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const btnNextPokemon = getByRole('button', {
      name: /Próximo Pokémon/i,
    });
    expect(btnNextPokemon).toBeInTheDocument();

    userEvent.click(btnNextPokemon);
    const nextPokemon = getByText(/Charmander/i);
    expect(nextPokemon).toBeInTheDocument();
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const { getAllByRole, getByRole, getByTestId } = renderWithRouter(<App />);

    const btnFilters = getAllByRole('button', {
      'data-testid': /pokemon-type-button/i,
    });

    btnFilters.forEach((filter) => {
      expect(filter).toBeInTheDocument();
    });

    const btnBug = getByRole('button', {
      name: /Bug/i,
    });
    expect(btnBug).toBeInTheDocument();

    userEvent.click(btnBug);
    const filterPokemon = getByTestId(/pokemonType/i, {
      name: /Bug/i,
    });
    expect(filterPokemon).toBeInTheDocument();

    const btnAll = getByRole('button', {
      name: /All/i,
      disabled: /false/i,
    });
    expect(btnAll).toBeInTheDocument();
  });

  it('Testa se contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(<App />);

    const btnAll = getByRole('button', {
      name: /All/i,
    });
    expect(btnAll).toBeInTheDocument();

    userEvent.click(btnAll);
    const pokemon = getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

  it('Testa se é criado dinamicamente botões de filtro p/ cada tipo de Pokémon.', () => {
    const { getAllByTestId } = renderWithRouter(<App />);

    const btnFilters = getAllByTestId(/pokemon-type-button/i);

    const qtde = 7;
    expect(btnFilters.length).toEqual(qtde);
  });
});
