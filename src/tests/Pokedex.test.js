import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokedex.js', () => {
  test('Testando se a página possui um h2', () => {
    const { getByRole } = renderWithRouter(<App />);
    const heading = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Teste se aparece outro pokémon quando o botão Próximo pokémon é clicado', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const nextPokemon = getByTestId('next-pokemon');
    fireEvent.click(nextPokemon);
    const pokemon = getByTestId('pokemon-name');
    expect(pokemon).not.toHaveValue(pokemon);
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getAllByText } = renderWithRouter(<App />);
    const pokemon = getAllByText('More details');
    expect(pokemon.length).toBe(1);
  });

  test('Teste se a pokedex tem o botão de filtro', () => {
    const filterButtons = 7;
    const { getAllByTestId } = renderWithRouter(<App />);
    const filterPokemon = getAllByTestId('pokemon-type-button');
    expect(filterPokemon.length).toBe(filterButtons);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonAll = getByText('All');
    fireEvent.click(buttonAll);
    const onePokemon = pokemons[0].type;
    const secondPokemon = pokemons[1].type;
    expect(onePokemon).not.toBe(secondPokemon);
    expect(buttonAll).toBeInTheDocument();
  });

  test('Teste se é criado um botão de filtro para cada tipo de Pokémon.', () => {
    const { getByRole } = renderWithRouter(<App />);

    const eletricBtn = getByRole('button', { name: pokemons[0].type });
    expect(eletricBtn).toBeInTheDocument();

    const fireBtn = getByRole('button', { name: pokemons[1].type });
    expect(fireBtn).toBeInTheDocument();

    const bugBtn = getByRole('button', { name: pokemons[2].type });
    expect(bugBtn).toBeInTheDocument();

    const poisonBtn = getByRole('button', { name: pokemons[3].type });
    expect(poisonBtn).toBeInTheDocument();

    const psychicBtn = getByRole('button', { name: pokemons[4].type });
    expect(psychicBtn).toBeInTheDocument();

    const normalBtn = getByRole('button', { name: pokemons[7].type });
    expect(normalBtn).toBeInTheDocument();

    const dragonBtn = getByRole('button', { name: pokemons[8].type });
    expect(dragonBtn).toBeInTheDocument();

    const allBtn = getByRole('button', { name: 'All' });
    expect(allBtn).toBeInTheDocument();

    const nextPokemon = getByRole('button', { name: 'Próximo pokémon' });

    fireEvent.click(eletricBtn);
    expect(nextPokemon).toHaveAttribute('disabled');

    fireEvent.click(bugBtn);
    expect(nextPokemon).toHaveAttribute('disabled');

    fireEvent.click(poisonBtn);
    expect(nextPokemon).toHaveAttribute('disabled');

    fireEvent.click(normalBtn);
    expect(nextPokemon).toHaveAttribute('disabled');

    fireEvent.click(dragonBtn);
    expect(nextPokemon).toHaveAttribute('disabled');
  });
});
