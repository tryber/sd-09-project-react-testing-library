import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderpag from '../services/renderpag';
import pokemons from '../data';

describe('Testes requisito Pokedex', () => {
  test('testa os tipos de pokemon',
    () => {
      const tipos = [
        'Electric',
        'Fire',
        'Bug',
        'Poison',
        'Psychic',
        'Normal',
        'Dragon',
      ];
      const { queryAllByTestId } = renderpag(<App />);
      const botaoTipos = queryAllByTestId('pokemon-type-button');
      expect(botaoTipos.length).toBe(tipos.length);
      expect(botaoTipos[0].textContent).toBe(tipos[0]);
    });
  test('header', () => {
    const { getByRole } = renderpag(<App />);
    const header = getByRole('heading', { level: 2, name: /encountered pokémons/i });
    expect(header).toBeInTheDocument();
  });
  test('testando botão que traz o próximo pokemon', () => {
    const { getByRole, getByText } = renderpag(<App />);
    const botao = getByRole('button', { name: /próximo pokémon/i });

    expect(getByText(pokemons[0].name)).toBeInTheDocument();

    pokemons.forEach((element) => {
      const nome = getByText(element.name);
      expect(nome).toBeInTheDocument();
      userEvent.click(botao);
    });
  });
  test('testa quantidade de pokemons', () => {
    const { container } = renderpag(<App />);
    const componente = container.getElementsByClassName('pokemon').length;
    expect(componente).toBe(1);
  });
  test('busca por tipo', () => {
    const { getByRole } = renderpag(<App />);
    const fogo = pokemons.filter((pokemon) => pokemon.type === /fire/i);
    const botaoDeFogo = getByRole('button', { name: /fire/i });
    fogo.forEach((pokemon) => {
      expect(pokemon.name).toBeInTheDocument();
      userEvent.click(botaoDeFogo);
    });
  });
  test('testando botao de filtrar pokemons', () => {
    const { getByRole, getByText, history } = renderpag(<App />);
    history.push('/');
    const filtra = getByRole('button', { name: /all/i });
    expect(filtra).toBeInTheDocument();
    expect(filtra).toHaveTextContent('All');

    userEvent.click(filtra);
    const pikachu = getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();

    const botao = getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(botao);
    const segundo = pokemons[1];
    const segundoPokemon = getByText(segundo.name);
    expect(segundoPokemon).toBeInTheDocument();
  });
});

// Partes do código inspiradas no do Humberto, turma 8
