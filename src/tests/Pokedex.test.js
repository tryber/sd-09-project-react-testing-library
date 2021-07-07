import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('test of component Pokedex', () => {
  test('should have one h2 tag with text Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<App />);
    // const h2 = getByRole('H2', {
    //   level: 4,
    //   name: /Encountered pokémons/,
    // });
    // expect(h2).toBeInTheDocument();
    const h2 = getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });

  test('should list all the pokemons', () => {
    const { getByRole, getByTestId } = renderWithRouter(<App />);
    // const idPokemon = getByTestId(/pokemon-name/);
    const idPokemon = getByTestId('pokemon-name');
    const button = getByRole('button', { name: 'Próximo pokémon' });
    fireEvent.click(button);
    expect(idPokemon.innerHTML).toBe('Charmander');
    fireEvent.click(button);
    expect(idPokemon.innerHTML).toBe('Caterpie');
  });

  test('should list one pokemon per time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('should have filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const buttonPokemon = getAllByTestId('pokemon-type-button');
    const PokemonsElements = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    buttonPokemon.forEach(
      (types, index) => expect(types.innerHTML).toBe(PokemonsElements[index]),
    );
  });

  test('should have button to reset filter', () => {
    const { getByRole } = renderWithRouter(<App />);
    const btn = getByRole('button', { name: 'All' });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(btn.innerHTML).toBe('All');
  });

  test('should create dinamically a button.',
    () => {
      const { getByRole } = renderWithRouter(<App />);
      pokemons.forEach(({ type }) => {
        expect(getByRole('button', { name: type })).toBeInTheDocument();
      });
    });

  test('disability button when have just one', () => {
    const { getByRole } = renderWithRouter(<App />);
    const button = getByRole('button', { name: 'Próximo pokémon' });
    // for(const pokemon of pokemons){

    // }
    pokemons.forEach(({ type }) => {
      if (type.type === pokemons.type) {
        expect(button).not.toBeDisabled();
      } else expect(button).toBeDisabled();
    });
  });
});
