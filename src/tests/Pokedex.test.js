import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testes do componente Pokedex.js', () => {
  test('A página deve conter um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    const h2 = getByRole('heading', {
      level: 2, name: 'Encountered pokémons' });
    expect(h2).toBeInTheDocument();
  });

  test('Deve ser exibido o próximo Pokémon da lista onClick Próximo pokémon', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    const id = getByTestId('pokemon-name');
    const btn = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(btn);
    expect(id.innerHTML).toBe('Charmander');
    fireEvent.click(btn);
    expect(id.innerHTML).toBe('Caterpie');
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const btn = getAllByTestId('pokemon-type-button');
    const PokemonsElements = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon',
    ];
    // href rafaReis => usar 2 param para fazer verificação de index x elemento correto
    btn.forEach((types, index) => expect(types.innerHTML).toBe(PokemonsElements[index]));
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btn = getByRole('button', { name: 'All' });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(btn.innerHTML).toBe('All');
  });

  test(
    'Teste se é criado, dinamicamente, um botão de filtro para cada tipo de Pokémon.',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      pokemons.forEach(({ type }) => {
        expect(getByRole('button', { name: type })).toBeInTheDocument();
      });
    },
  );

  test(
    'O botão de Próximo pokémon deve ser desabilitado quando tiver um só pokémon',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      const btn = getByRole('button', { name: 'Próximo pokémon' });
      pokemons.forEach(({ type }) => {
        if (type.type === pokemons.type) {
          expect(btn).not.toBeDisabled();
        } else expect(btn).toBeDisabled();
      });
    },
  );
});
